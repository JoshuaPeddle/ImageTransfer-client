import dynamic from 'next/dynamic';
import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { nextVariant, Model } from '../lib/models';
import _predict from '../lib/predict';
import styles from './TFView.module.css';
import modelButtonStyle from './StyleButton.module.css';
import { compressImage } from '../lib/compress';
import { generateUUID } from '@/lib/uuid';
const LocalImageLoader = dynamic(() => import('./LocalImageLoader'));
const ImageView = dynamic(() => import('./imageView'));
const ExportPopup = dynamic(() => import('./exportPopup'));
const StyleSelector = dynamic(() => import('./StyleSelector'), { loading: () =>
  <div className={modelButtonStyle.modelButtonsContainer}>
    Loading...
  </div> }
);
export default function TFView({ updateLocalTokens }: { updateLocalTokens: () => void}) {
  const [ image, setImage ] = useState(null as null | string);
  const [ result, setResult ] = useState(null);
  const [ error, setError ] = useState(false);
  const [ models, setModels ] = useState({} as { [key: string]: Model });
  const [ loading, setLoading ] = useState(false);
  const [ uuid, setUuid ] = useState(null as null | string);
  const [ compressed, setCompressed ] = useState(null as null | Blob);
  const [ exportPopup, setExportPopup ] = useState(false);
  const [ sourceImageSize, setSourceImageSize ] = useState([ 384, 256 ] as [number, number]);
  const { data: session, update } = useSession();
  useEffect(() => {
    if (!image) return;
    generateUUID().then(setUuid);
    compressImage(image, setCompressed);
  }, [ image ]);
  const predict = async (model: string) => {
    if ((session && session?.user.num_tokens <= 0) || (!session && window.localStorage.getItem('num_tokens') === '0') ) {
      if (session) {
        return alert('Out of tokens? Don\'t worry! Registered users receive 300 free tokens daily, up to a 1000-token cap. Check back in 24 hours!');
      }
      return alert(`Your token balance caps at ${parseInt(process.env.NEXT_PUBLIC_FREE_USER_TOKENS || '25')}, replenishing daily. Want more? Consider creating a free account!`);
    }
    if (!compressed) return;
    if (loading) return;
    setResult(null);
    setLoading(true);
    setError(false);
    // Determine variant
    const variant = nextVariant(models[model]);
    if (!uuid) return setLoading(false);
    const pred = _predict(model, compressed, setResult, setError, setLoading, variant, uuid);
    if (!session) {
      chargeLocalstorage();  // Charge localstorage
      await pred;
      updateLocalTokens();
      return setLoading(false);
    }
    const res = await fetch(`/api/charge/${session.user.uuid}`, { method: 'POST' });
    const data = await res.json();
    await pred;
    await update({num_tokens: data.num_tokens});
    setLoading(false);
  };
  const resultToImage = () => {
    if (!result) return;
    _setImage(result);
    setResult(null);
  };
  const chargeLocalstorage = async () => {
    if (session) return;
    const num_tokens = window.localStorage.getItem('num_tokens');
    if (!num_tokens) return;
    window.localStorage.setItem('num_tokens', (parseInt(num_tokens) - 1).toString());
  };
  const fetchRandomImage = useCallback(async () => {
    // This function sends send a GET request to the generator server to get a url for a random image
    const prefetchImage = async (url: string) => {
      const img = new Image();
      img.src = url;
    };
    _setImage(null);
    const res = await fetch('/api/randomImage', { method: 'GET' });
    const data = await res.json();
    // Prefetch the image
    prefetchImage(data.url);
    setSourceImageSize([ 384, 256 ]);
    _setImage(data.url);
  }, []);
  const _open_export_popup = () => {
    setExportPopup(true);
  };
  const fetchModels = useCallback(async () => {
    // Make a call to /api/models to get the models
    const res = await fetch('/api/models', { method: 'GET' });
    const data = await res.json();
    setModels(data);
  }, []);
  useEffect(() => {
    fetchModels();
    fetchRandomImage();
  }, [ fetchModels, fetchRandomImage ]);
  const _setImage = (img: string | null) => {
    setImage(img);
    setResult(null);
    setCompressed(null);
  };
  return (
    <>
      {image && result && exportPopup ? <ExportPopup image={image} result={result} setExportPopup={setExportPopup} /> : null}
      <div className={styles.topContainer}>
        <div className='font-extrabold text-lg'>
            Instructions: 
          <ol className='list-decimal list-inside pb-2 font-semibold'>
            <li>Upload an image</li>
            <li>Choose a style from the Style Selector</li>
            <li>Export as a GIF or MP4</li>
          </ol>
        </div>
        <div className='flex flex-row flex-wrap justify-center'>
          <div className='flex flex-wrap justify-center' >
            <LocalImageLoader setImage={_setImage} setSize={setSourceImageSize} />
            <button id='random_image_btn' className={styles.button} onClick={fetchRandomImage} >Random Image</button>
          </div>
          <div className='flex flex-wrap justify-center' >
            <button className={styles.button} onClick={resultToImage} >Result to Source</button>
            <button id="export_popup_btn" className={styles.button} onClick={_open_export_popup} >Export</button>
          </div>
          <ImageView image={image} result={result} loading={loading} size={sourceImageSize} />
        </div>
        <StyleSelector models={models} predict={predict} loading={loading} />
      </div>

    </>
  );
}