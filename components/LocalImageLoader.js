// Desc: Let the user load a local image
import styles from './TFView.module.css';
import { useCallback } from 'react';

// https://img.ly/blog/how-to-resize-an-image-with-javascript/
function resizeImage(imgToResize) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const originalWidth = imgToResize.width;
  const originalHeight = imgToResize.height;
  const targetWidth = 384;
  const targetHeight = 384;
  const resizingFactor = Math.min(
    targetWidth / originalWidth,
    targetHeight / originalHeight
  );
  const canvasWidth = originalWidth * resizingFactor;
  const canvasHeight = originalHeight * resizingFactor;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  context.drawImage(
    imgToResize,
    0,
    0,
    canvasWidth,
    canvas.height
  );

  return canvas.toDataURL();
}

export default function LocalImageLoader({setImage}) {
  const update = useCallback((e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        setImage(resizeImage(img));
      };
    };
    if (file) {
      reader.readAsDataURL(file); 
    }
  }, [ setImage ]);
  return (
    <>
      <input type="file" id='files'  accept="image/*" onChange={update} className="hidden"/>
      <label className={styles.button} style={{cursor: 'pointer'}} htmlFor="files">Select file</label>
    </>
  );
}