
import { useState } from 'react';
import LocalImageLoader from './LocalImageLoader';
import _Image from 'next/image';

const API_URL = 'http://'+process.env.NEXT_PUBLIC_IMAGE_SERVER+':5000/';
export default function TFView() {
  const [ image, setImage ] = useState(null);
  const [ result, setResult ] = useState(null);
  const [ error, setError ] = useState(false);
  const predict = async (model, img) => {
    console.log(API_URL);
    console.log(process.env.NEXT_PUBLIC_IMAGE_SERVER);
    fetch(img)
      .then((res) => res.blob())
      .then(async (blob) => {
        const fd = new FormData();
        const file = new File([ blob ], 'filename.jpeg');
        fd.append('image', file);
        fetch(API_URL+model, {method: 'POST', body: fd})
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
  return (
    <div>
      <h1>TFView</h1>
      <LocalImageLoader setImage={setImage} />
      {image ? <_Image src={image} width="256" height="256" alt="" /> : ''}
      {result ? <_Image src={result} width="256" height="256" alt="" /> : ''}
      <button onClick={() => predict('monet', image)} >Monet</button>
      <br/>
      <button onClick={() => predict('gogh', image)} >Gogh</button>
      <br/>
      <button onClick={() => predict('upscale', image)} >Upscale</button>
      <br/>
      <button onClick={resultToImage} >Result to Image</button>
    </div>
  );
}