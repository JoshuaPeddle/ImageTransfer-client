
import { useState, useEffect } from 'react';
import LocalImageLoader from './LocalImageLoader';
import _Image from 'next/image';

export default function TFView() {
  const [ model, setModel ] = useState(null);
  const [ image, setImage ] = useState(null);
  const [ prediction, setPrediction ] = useState(null);
  useEffect(() => {
    async function loadModel() {
      const model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/iris_v1/model.json');
      setModel(model);
    }

    loadModel();
  }, []);

  const predict = async () => {
    // image is currently a string, but we need a tensor
    // convert to tensor
    const  img = new Image();
    img.src = image;
    img.width = 224;
    img.height = 224;
    
    const t = tf.browser.fromPixels(img);
    // Drop last dimension
    const prediction = await model.predict(t);
    setPrediction(prediction);
  };
  return (
    <div>

      <h1>TFView</h1>

      <LocalImageLoader setImage={setImage}/>
      {image?
        <_Image src={image} width="224" height="224" alt=""/>
        :
        ''}
      {prediction?
        <_Image src={prediction} width="224" height="224" alt=""/>
        :
        ''}
      <button onClick={predict} >Predict</button>
    </div>
  );
}