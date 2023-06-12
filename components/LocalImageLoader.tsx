// Desc: Let the user load a local image
import styles from './TFView.module.css';
import { useCallback } from 'react';

function cropImage(img:  HTMLImageElement, cropX: number, cropY: number, cropWidth: number, cropHeight: number, targetWidth: number, targetHeight: number, setSize: Function) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { willReadFrequently: true });
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  if (!context) return;
  context.drawImage(
    img,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    targetWidth,
    targetHeight
  );
  //console.log('Final Size', canvas.width, canvas.height);
  setSize([ targetWidth, targetHeight ]);
  return canvas.toDataURL();
}

function centerCropByAspectRatio(img: HTMLImageElement, aspectRatio=1.4, setSize: Function) {
  // If the image is wider than it is tall or taller than it is wide by more than aspectRatio, crop the image
  const imgAspectRatio = img.width / img.height;
  const upperBound = aspectRatio;
  const lowerBound = 1 / aspectRatio;
  const originalWidth = img.width;
  const originalHeight = img.height;
  const targetWidth = 384;
  const targetHeight = 384;
  //console.log('here', imgAspectRatio, upperBound, lowerBound);
  if (imgAspectRatio > upperBound) {
    // Crop the image horizontally
    //console.log('Cropping horizontally');
    const cropWidth = img.height * aspectRatio;
    const cropX = (img.width - cropWidth) / 2;
    const cropY = 0;
    const cropHeight = img.height;
    const resizingFactor = Math.min(
      targetWidth / cropWidth,
      targetHeight / cropHeight
    );
    const canvasWidth = cropWidth * resizingFactor;
    const canvasHeight = cropHeight * resizingFactor;
    //console.log(cropX, cropY, cropWidth, cropHeight, canvasWidth, canvasHeight);
    return cropImage(img, cropX, cropY, cropWidth, cropHeight, canvasWidth, canvasHeight, setSize);
  } else if (imgAspectRatio < lowerBound) {
    // Crop the image vertically
    //console.log('Cropping vertically');
    // Should drop the image height to 1.5 times the width
    const cropHeight = img.width * aspectRatio;
    const cropY = (img.height - cropHeight) / 2;
    const cropX = 0;
    const cropWidth = img.width;
    const resizingFactor = Math.min(
      targetWidth / cropWidth,
      targetHeight / cropHeight
    );
    const canvasWidth = cropWidth * resizingFactor;
    const canvasHeight = cropHeight * resizingFactor;
    //console.log(cropX, cropY, cropWidth, cropHeight, canvasWidth, canvasHeight);
    return cropImage(img, cropX, cropY, cropWidth, cropHeight, canvasWidth, canvasHeight, setSize);
  } else {
    if (img.width > targetWidth || img.height > targetHeight) {
      //console.log('Resizing');
      return resizeImage(img, setSize);
    }
    if (img.width < targetWidth || img.height < targetHeight) {
      //console.log('Upscaling');
      return resizeImage(img, setSize);
    }
    //console.log('No cropping or resizing');
    setSize([ img.width, img.height ]);
    return img.src;
  }
}

// https://img.ly/blog/how-to-resize-an-image-with-javascript/
function resizeImage(imgToResize: HTMLImageElement, setSize: Function) {
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
  if (!context) return;
  context.drawImage(
    imgToResize,
    0,
    0,
    canvasWidth,
    canvas.height
  );
  setSize([ canvasWidth, canvasHeight ]);
  //console.log('Final Size', canvas.width, canvas.height);
  return canvas.toDataURL();
}

import { Button } from '@mui/material';
import { useRef } from 'react';

export default function LocalImageLoader({ setImage, setSize, loading }: { setImage: Function; setSize: Function, loading: boolean }) {
  const update = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target?.result) return;
        const img = new Image();
        img.src = e.target.result as string;
        img.onload = () => {
          const result_img = centerCropByAspectRatio(img, 1.5, setSize);
          setImage(result_img);
        };
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    [ setImage, setSize ]
  );
  const inputFile = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    // `current` points to the mounted file input element

    inputFile?.current?.click();
  };
  return (
    <>
      <Button disabled={loading? true :false} onClick={onButtonClick}>Upload Image</Button>
      <input
        ref={inputFile}
        accept="image/*"
        style={{ display: 'none' }}
        type="file"
        onChange={update}
      />
    </>
  );
}