
import { useEffect, useState, useCallback } from 'react';
import LocalImageLoader from './LocalImageLoader';
import _Image from 'next/image';
import StyleButton from './StyleButton';
import {nextVariant, Model} from '../lib/models';
import _predict from '../lib/predict';
import styles from './TFView.module.css';
import ImageView from './imageView';
import {compressImage} from '../lib/compress';
import ExportPopup from './exportPopup';

export default function TFView() {
  const [ image, setImage ] = useState(null as null| string);
  const [ result, setResult ] = useState(null);
  const [ error, setError ] = useState(false);
  const [ models, setModels ] = useState({} as {[key: string]: Model});
  const [ loading, setLoading ] = useState(false);
  const [ message, setMessage ] = useState(null);
  const [ uuid, setUuid ] = useState(null as null| string);
  const [ compressed, setCompressed ] = useState(null as null| Blob);
  const [ exportPopup, setExportPopup ] = useState(false);
  const [ sourceImageSize, setSourceImageSize ] = useState([ 384, 256 ] as [number, number]);
  useEffect(() => {
    const generateUUID = () => {
      let uuid = self.crypto.randomUUID();
      setUuid(uuid);
    };
    generateUUID();
    if (!image) return;
    compressImage(image, setCompressed);
  }, [ image ]);
  const predict =async (model: string) => {
    if (!compressed) return;
    if (loading) return;
    setResult(null);
    setLoading(true);
    setError(false);
    // Determine variant
    const variant = nextVariant(models[model]);
    if (!variant || !uuid) return;
    _predict(model, compressed, setResult, setError, setLoading, variant, uuid);
  };
  const resultToImage = () => {
    if (!result) return;
    _setImage(result);
    setResult(null);
  };
  // This function sends send a GET request to the generator server to get a url for a random image
  const prefetchImage = async (url: string) => {
    const img = new Image();
    img.src = url;
  };
  const fetchRandomImage = async () => {
    _setImage(null);
    const res = await fetch('/api/randomImage', {method: 'GET'});
    const data = await res.json();
    // Prefetch the image
    prefetchImage(data.url);
    setSourceImageSize([ 384, 256 ]);
    _setImage(data.url);
  };
  const _open_export_popup = () => {
    setExportPopup(true);
  };
  const fetchModels = useCallback(async () => {
    // Make a call to /api/models to get the models
    const res = await fetch('/api/models', {method: 'GET'});
    const data = await res.json();
    setModels(data);
  }, []);
  useEffect(() => {
    fetchModels().then(() => {
      fetchRandomImage();
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const _setImage = (img: string | null) => {
    setImage(img);
    setResult(null);
    setCompressed(null);
  };
  return (
    <>
      { image && result &&exportPopup ? <ExportPopup image={image} result={result} setExportPopup={setExportPopup}/> : null}
      <div className={styles.topButtonContainer}>    
        <div>
          <LocalImageLoader setImage={_setImage} setSize={setSourceImageSize}/>
          <button id='random_image_btn' className={styles.button} onClick={fetchRandomImage} >Random Image</button>
        </div>
        <ImageView image={image} result={result} loading={loading} size={sourceImageSize}/>
        <div className={styles.modelButtonsContainer}>
          {Object.values(models).map((model : {style: string, label: string, background_url: string}) => {
            return <StyleButton  key={model.style} style={model.style} label={model.label} bg={model.background_url} predict={predict}/>;
          })}
        </div>
        <div className={styles.modelButtonsContainer}>
          <button className={styles.button} onClick={resultToImage} >Result to Source</button>
          <button id="export_popup_btn" className={styles.button}  onClick={_open_export_popup} >Export</button>
        </div>
 
      </div>

    </>
  );
}