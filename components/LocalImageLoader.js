// Desc: Let the user load a local image
import styles from './TFView.module.css';
import { useCallback } from 'react';

function cropImage(img, cropX, cropY, cropWidth, cropHeight) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { willReadFrequently: true });
  canvas.width = cropWidth;
  canvas.height = cropHeight;
  context.drawImage(
    img,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );
  console.log('Cropped image', canvas.width, canvas.height);
  return canvas;
}

function centerCropByAspectRatio(img, aspectRatio=1.4) {
  // If the image is wider than it is tall or taller than it is wide by more than aspectRatio, crop the image
  const imgAspectRatio = img.width / img.height;
  const upperBound = aspectRatio;
  const lowerBound = 1 / aspectRatio;
  if (imgAspectRatio > upperBound) {
    // Crop the image horizontally
    console.log('Cropping horizontally');
    const cropWidth = img.height * aspectRatio;
    const cropX = (img.width - cropWidth) / 2;
    const cropY = 0;
    const cropHeight = img.height;
    return cropImage(img, cropX, cropY, cropWidth, cropHeight);
  } else if (imgAspectRatio < lowerBound) {
    // Crop the image vertically
    console.log('Cropping vertically');
    // Should drop the image height to 1.5 times the width
    const cropHeight = img.width * aspectRatio;
    const cropY = (img.height - cropHeight) / 2;
    const cropX = 0;
    const cropWidth = img.width;
    return cropImage(img, cropX, cropY, cropWidth, cropHeight);
  } else {
    return img;
  }
}

// https://img.ly/blog/how-to-resize-an-image-with-javascript/
function resizeImage(imgToResize, setSize) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { willReadFrequently: true });
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
  setSize([ canvasWidth, canvasHeight ]);
  console.log('Final Size', canvas.width, canvas.height);
  return canvas.toDataURL();
}

export default function LocalImageLoader({setImage, setSize}) {
  const update = useCallback((e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const result_img = resizeImage(centerCropByAspectRatio(img), setSize);
        setImage(result_img);
      };
    };
    if (file) {
      reader.readAsDataURL(file); 
    }
  }, [ setImage, setSize ]);
  return (
    <>
      <input type="file" id='files'  accept="image/*" onChange={update} className="hidden"/>
      <label className={styles.button} style={{cursor: 'pointer'}} htmlFor="files">Select Image</label>
    </>
  );
}