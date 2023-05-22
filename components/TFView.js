
import { useEffect, useState } from 'react';
import LocalImageLoader from './LocalImageLoader';
import _Image from 'next/image';
import StyleButton from './StyleButton';
import {getModels} from '../lib/models.js';
import _predict from '../lib/predict.js';

import styles from './TFView.module.css';

import ImagePlaceholder from './ImagePlaceholder';

const API_URL = process.env.NEXT_PUBLIC_IMAGE_SERVER;
export default function TFView() {
  const [ image, setImage ] = useState(null);
  const [ result, setResult ] = useState(null);
  const [ error, setError ] = useState(false);
  const [ models, setModels ] = useState([]);
  const predict = async (model) => {
    fetch(image)
      .then((res) => res.blob())
      .then(async (blob) => {
        _predict(model, blob, setResult, setError);
      });
  };
  const resultToImage = () => {
    if (!result) return;
    setImage(result);
  };
  // This function sends send a GET request to the generator server to get a url for a random image
  const fetchRandomImage = async () => {
    const res = await fetch(API_URL+'random', {method: 'GET'});
    const data = await res.json();
    console.log(data.url);
    setImage(data.url);
  };
  useEffect(() => {
    fetchRandomImage();
    setModels(getModels());
  }, []);

  return (
    <>

      <LocalImageLoader setImage={setImage} />
      <button onClick={fetchRandomImage} >Random image</button>

      <div className={styles.images}>
        {image ? <_Image src={image} width="256" height="256" alt="" loader={({ src }) => {
          return src; 
        }} unoptimized /> : <ImagePlaceholder/>}
        {result ? <_Image src={result} width="256" height="256" alt="" /> : <ImagePlaceholder/>}
      </div>
      <br/>
      <div className={styles.modelButtonsContainer}>
        {models.map((model) => {
          return <StyleButton key={model.style} style={model.style} label={model.label} bg={model.background_url} predict={predict}/>;
        })}
      </div>
      <button  onClick={resultToImage} >Result to Image</button>
      <br/>
      {error ? <p>There was an error {error}</p>  : ''}
    </>
  );
}