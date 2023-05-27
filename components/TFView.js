
import { useEffect, useState, useCallback } from 'react';
import LocalImageLoader from './LocalImageLoader';
import _Image from 'next/image';
import StyleButton from './StyleButton';
import {nextVariant} from '../lib/models.js';
import _predict from '../lib/predict.js';
import {exportImages, exportVideo, exportGIF, exportMP4} from '../lib/ImageExporter.js';
import styles from './TFView.module.css';
import ImagePlaceholder from './ImagePlaceholder';
import {compressImage} from '../lib/compress';

export default function TFView() {
  const [ image, setImage ] = useState(null);
  const [ result, setResult ] = useState(null);
  const [ error, setError ] = useState(false);
  const [ models, setModels ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ uuid, setUuid ] = useState(null);
  const [ compressed, setCompressed ] = useState(false);
  useEffect(() => {
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
    setImage(result);
  };
  // This function sends send a GET request to the generator server to get a url for a random image
  const prefetchImage = async (url) => {
    const img = new Image();
    img.src = url;
  };
  const fetchRandomImage = async () => {
    const res = await fetch('/api/randomImage', {method: 'GET'});
    setImage(null);
    const data = await res.json();
    // Prefetch the image
    prefetchImage(data.url);
    _setImage(data.url);
  };
  const _export_image = () => {
    exportImages(image, result);
  };
  const _export_video = () => {
    setLoading(true);
    exportVideo(image, result, setLoading, setError);
  };
  const _export_GIF = () => {
    setLoading(true);
    exportGIF(image, result, setLoading, setError);
  };
  const _export_MP4 = () => {
    setLoading(true);
    exportMP4(image, result, setLoading, setError);
  };
  const generateUUID = () => {
    let uuid = self.crypto.randomUUID();
    setUuid(uuid);
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
  };
  return (
    <>
      <LocalImageLoader setImage={_setImage} />
      <button id='random_image_btn' className={styles.button} onClick={fetchRandomImage} >Random image</button>

      <div className={styles.images}>
        {image ? <_Image priority={true}  id='src_img' src={image} width="256" height="256" alt="" loader={({ src }) => {
          return src; 
        }} unoptimized /> : <ImagePlaceholder loading='True'/>}
        {result ? <_Image id='res_img' src={result} width="256" height="256" alt="" /> : <ImagePlaceholder loading={loading}/>}
      </div>
      <br/>
      <div className={styles.modelButtonsContainer}>
        {Object.values(models).map((model) => {
          return <StyleButton  key={model.style} style={model.style} label={model.label} bg={model.background_url} predict={predict}/>;
        })}
      </div>
      <button className={styles.button} onClick={resultToImage} >Result to Image</button>
      <button className={styles.button}  onClick={_export_image} >Export Images</button>
      <button className={styles.button}  onClick={_export_video} >Export webp Video (smaller)</button>
      <button className={styles.button}  onClick={_export_GIF} >Export GIF (better compatibility)</button>
      <button className={styles.button}  onClick={_export_MP4} >Export MP4 (Great compatibility)</button>
      <br/>
      {error ? <p>There was an error {error}</p>  : ''}
      {loading ? <p>Loading...</p> : ''}
    </>
  );
}