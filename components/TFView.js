
import { useState } from 'react';
import LocalImageLoader from './LocalImageLoader';
import _Image from 'next/image';
import StyleButton from './StyleButton';
import {models} from '../lib/models.js';
import _predict from '../lib/predict.js';

const API_URL = process.env.NEXT_PUBLIC_IMAGE_SERVER;
export default function TFView() {
  const [ image, setImage ] = useState(null);
  const [ result, setResult ] = useState(null);
  const [ error, setError ] = useState(false);
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
  // THis function should send a GET request to the generator server to get a url for a random image
  const fetchRandomImage = async () => {
    const res = await fetch(API_URL+'random', {method: 'GET'});
    const data = await res.json();
    console.log(data.url);
    setImage(data.url);
  };
  const loaderProp =({ src }) => {
    return src;
  };
  return (
    <div>
      <h1>TFView</h1>
      <LocalImageLoader setImage={setImage} />
      {image ? <_Image src={image} width="256" height="256" alt="" loader={loaderProp} unoptimized /> : ''}
      {result ? <_Image src={result} width="256" height="256" alt="" /> : ''}
      <button onClick={fetchRandomImage} >Random</button>
      <br/>
      {models.map((model) => {
        return <StyleButton key={model.style} style={model.style} label={model.label} predict={predict}/>;
      })}
      <button  onClick={resultToImage} >Result to Image</button>
      <br/>
      {error ? <p>There was an error {error}</p>  : ''}
    </div>
  );
}