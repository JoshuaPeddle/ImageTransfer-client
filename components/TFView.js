
import { useEffect, useState, useCallback } from 'react';
import LocalImageLoader from './LocalImageLoader';
import _Image from 'next/image';
import StyleButton from './StyleButton';
import {getModels} from '../lib/models.js';
import _predict from '../lib/predict.js';

import {exportImages} from '../lib/ImageExporter.js';

import styles from './TFView.module.css';

import ImagePlaceholder from './ImagePlaceholder';

const API_URL = process.env.NEXT_PUBLIC_IMAGE_SERVER;
export default function TFView() {
  const [ image, setImage ] = useState(null);
  const [ result, setResult ] = useState(null);
  const [ error, setError ] = useState(false);
  const [ models, setModels ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const predict = useCallback(async (model) => {
    if (!image) return;
    if (loading) return;
    setLoading(true);
    fetch(image)
      .then((res) => res.blob())
      .then(async (blob) => {
        setResult(null);
        // Determine variant
        const variant = models[model].nextVariant();
        _predict(model, blob, setResult, setError, setLoading, variant);
      });
  }, [ image, loading, models ]);
  const resultToImage = () => {
    if (!result) return;
    setImage(result);
  };
  // This function sends send a GET request to the generator server to get a url for a random image
  const prefetchImage = async (url) => {
    console.log('Prefetching image', url);
    const img = new Image();
    img.src = url;
  };
  const fetchRandomImage = async () => {
    setImage(null);
    const res = await fetch(API_URL+'random', {method: 'GET'});
    const data = await res.json();
    // Prefetch the image
    prefetchImage(data.url);
    
    setImage(data.url);
  };
  const _export = () => {
    exportImages(image, result);
    // Download the image
  };
  useEffect(() => {
    getModels().then((models) => {
      setModels(models);
      fetchRandomImage();
    });
  }, [ ]);
  return (
    <>

      <LocalImageLoader setImage={setImage} />
      <button className={styles.button} onClick={fetchRandomImage} >Random image</button>

      <div className={styles.images}>
        {image ? <_Image src={image} width="256" height="256" alt="" loader={({ src }) => {
          return src; 
        }} unoptimized /> : <ImagePlaceholder loading='True'/>}
        {result ? <_Image src={result} width="256" height="256" alt="" /> : <ImagePlaceholder loading={loading}/>}
      </div>
      <br/>
      <div className={styles.modelButtonsContainer}>
        {Object.values(models).map((model) => {
          return <StyleButton key={model.style} style={model.style} label={model.label} bg={model.background_url} predict={predict}/>;
        })}
      </div>
      <button className={styles.button} onClick={resultToImage} >Result to Image</button>
      <button className={styles.button}  onClick={_export} >Export</button>
      <br/>
      {error ? <p>There was an error {error}</p>  : ''}
    </>
  );
}