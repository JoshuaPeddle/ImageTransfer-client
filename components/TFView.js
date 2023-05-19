
import { useState } from 'react';
import LocalImageLoader from './LocalImageLoader';
import _Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_IMAGE_SERVER;
export default function TFView() {
  const [ image, setImage ] = useState(null);
  const [ result, setResult ] = useState(null);
  const [ error, setError ] = useState(false);
  const predict = async (model, img) => {
    fetch(img)
      .then((res) => res.blob())
      .then(async (blob) => {
        const fd = new FormData();
        const file = new File([ blob ], 'filename.jpeg');
        fd.append('image', file);
        fetch(API_URL+'/generate/'+model, {method: 'POST', body: fd})
          .then(async (res) => {
            res.blob().then((blob) => {
              try {
                const reader = new FileReader() ;
                reader.onload = function() {
                  setResult(this.result);
                } ;
                reader.readAsDataURL(blob) ;
              } catch (e) {
                setError(true);
              }
            }
            );
          }) 
          .then((res) => console.log(res))
          .catch((err) => console.error(err));
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
      <button onClick={() => predict('monet', image)} >Monet</button>
      <br/>
      <button onClick={() => predict('gogh', image)} >Van Gogh</button>
      <br/>
      <button onClick={() => predict('picasso', image)} >Picasso</button>
      <br/>
      <button onClick={() => predict('dali', image)} >Dali</button>
      <br/>
      <button onClick={() => predict('upscale', image)} >Upscale</button>
      <br/>
      <button onClick={resultToImage} >Result to Image</button>

    </div>
  );
}