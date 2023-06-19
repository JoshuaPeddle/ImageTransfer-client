import dynamic from 'next/dynamic';
import { useEffect, useState, useCallback, useRef } from 'react';

import { nextVariant, Model } from '../lib/models';
import _predict from '../lib/predict';
import { compressImage } from '../lib/compress';
import { generateUUID } from '@/lib/uuid';
import { Box } from '@mui/material';
import styleButtonStyle from './StyleButton.module.css';

const StyleCarousel = dynamic(() => import('./StyleCarousel'), { ssr: false, loading: () =>  
  <Box className='modelButtonsContainer'
    sx={{
      maxWidth: '100%',
      backgroundColor: 'rgb(255,255,255,0.02)',
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
      width: '100%',
      minWidth: '100%',
      pt: '30px',
      pb: '30px',
      px: '30px',
      borderRadius: '10px',
      height: 'fit-content'
    }}>
    <button style={{ background: 'transparent'}} className={styleButtonStyle.imageButton}/>
  </Box> 
} );
const ImageView = dynamic(() => import('./imageView'));
const ExportPopup = dynamic(() => import('./exportPopup'));
const EditorButtons = dynamic(() => import('./EditorButtons'));
const Instructions = dynamic(() => import('./Instructions'));
export default function TFView() {
  const [ image, setImage ] = useState(null as null | string);
  const [ result, setResult ] = useState(null);
  const [ error, setError ] = useState(false);
  const [ models, setModels ] = useState({} as { [key: string]: Model });
  const [ loading, setLoading ] = useState(false);
  const [ uuid, setUuid ] = useState(null as null | string);
  const [ compressed, setCompressed ] = useState(null as null | Blob);
  const [ exportPopup, setExportPopup ] = useState(false);
  const [ sourceImageSize, setSourceImageSize ] = useState([ 384, 256 ] as [number, number]);
  const fetchingRandomImage = useRef(false);
  const predict = async (model: string) => {
    if (!compressed) return;
    if (loading) return;
    setResult(null);
    setLoading(true);
    setError(false);
    // Determine variant
    const variant = nextVariant(models[model]);
    if (!uuid) return setLoading(false);
    const pred = _predict(model, compressed, setResult, setError, setLoading, variant, uuid);
    await pred;
    return setLoading(false);
  };
  const resultToImage = () => {
    if (!result) return;
    _setImage(result);
    setResult(null);
  };
  const fetchRandomImage = useCallback(async () => {
    if (fetchingRandomImage.current == true) return;
    fetchingRandomImage.current = true;
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
    setSourceImageSize([ 512, 341 ]);
    _setImage(data.url);
    fetchingRandomImage.current = false;
  }, [  ]);
  const _open_export_popup = () => {
    setExportPopup(true);
  };
  useEffect(() => {
    const fetchModels = async () => {
      // Make a call to /api/models to get the models
      const res = await fetch('/api/models', { method: 'GET' });
      const data = await res.json();
      setModels(data);
    };
    fetchModels();
    fetchRandomImage();
  }, [ fetchRandomImage ]);
  const _setImage = (img: string | null) => {
    setResult(null);
    setCompressed(null);
    if (!img) return;
    setImage(img);
    generateUUID().then(setUuid);
    compressImage(img, setCompressed);
  };
  return (
    <>
      {image && result && exportPopup ? <ExportPopup image={image} result={result} setExportPopup={setExportPopup} /> : <></>}

      <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Instructions/>
        </Box>
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: 'fit-content', mx: 'auto' }} color='transparent'>
          <EditorButtons _setImage={_setImage} fetchRandomImage={fetchRandomImage} resultToImage={resultToImage} result={result} loading={loading} _open_export_popup={_open_export_popup} setSourceImageSize={setSourceImageSize} fetchingRandomImage={fetchingRandomImage.current} />
          <ImageView image={image} result={result} loading={loading} size={sourceImageSize} />
        </Box >
        <Box sx={{ width: 'min(86vw, 1200px)', maxWidth: '1200px', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <StyleCarousel models={models} predict={predict} loading={loading} />
        </Box>
      </Box>

    </>
  );
}