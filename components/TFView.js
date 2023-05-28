
import { useEffect, useState, useCallback } from 'react';
import LocalImageLoader from './LocalImageLoader';
import _Image from 'next/image';
import StyleButton from './StyleButton';
import {nextVariant} from '../lib/models.js';
import _predict from '../lib/predict.js';
import {exportImages, exportGIF, exportMP4} from '../lib/ImageExporter.js';
import styles from './TFView.module.css';
import ImageView from './imageView';
import {compressImage} from '../lib/compress';
import ExportPopup from './exportPopup';

export default function TFView() {
  const [ image, setImage ] = useState(null);
  const [ result, setResult ] = useState(null);
  const [ error, setError ] = useState(false);
  const [ models, setModels ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ message, setMessage ] = useState(null);
  const [ uuid, setUuid ] = useState(null);
  const [ compressed, setCompressed ] = useState(false);
  const [ exportPopup, setExportPopup ] = useState(false);
  useEffect(() => {
    const generateUUID = () => {
      let uuid = self.crypto.randomUUID();
      setUuid(uuid);
    };
    generateUUID();
    compressImage(image, setCompressed);
  }, [ image ]);
  const predict =async (model) => {
    if (!compressed) return;
    if (loading) return;
    setResult(null);
    setLoading(true);
    setError(false);
    // Determine variant
    const variant = nextVariant(models[model]);
    _predict(model, compressed, setResult, setError, setLoading, variant, uuid);
  };
  const resultToImage = () => {
    if (!result) return;
    _setImage(result);
    setResult(null);
  };
  // This function sends send a GET request to the generator server to get a url for a random image
  const prefetchImage = async (url) => {
    const img = new Image();
    img.src = url;
  };
  const fetchRandomImage = async () => {
    _setImage(null);
    const res = await fetch('/api/randomImage', {method: 'GET'});
    const data = await res.json();
    // Prefetch the image
    prefetchImage(data.url);
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
  const _setImage = (img) => {
    setImage(img);
    setResult(null);
    setCompressed(null);
  };
  return (
    <>
      {exportPopup ? <ExportPopup image={image} result={result} loading={loading} exportPopup={exportPopup} setExportPopup={setExportPopup}/> : null}
      <div className={styles.topButtonContainer}>    
        <LocalImageLoader setImage={_setImage} />
        <button id='random_image_btn' className={styles.button} onClick={fetchRandomImage} >Random image</button>
        <ImageView image={image} result={result} loading={loading}/>
        <div className={styles.modelButtonsContainer}>
          {Object.values(models).map((model) => {
            return <StyleButton  key={model.style} style={model.style} label={model.label} bg={model.background_url} predict={predict}/>;
          })}
        </div>
     
      </div>
      <div className={styles.modelButtonsContainer}>
        <button className={styles.button} onClick={resultToImage} >Result to Source</button>
        <button className={styles.button}  onClick={_open_export_popup} >Export</button>
      </div>

    </>
  );
}