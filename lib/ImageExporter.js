import tsWhammy from 'ts-whammy';

// This function should take the source image and stack it with the result image according to stack
export function exportImages(source, result, stack='horizontal') {
  const source_img = new Image();
  source_img.crossOrigin = 'anonymous';
  source_img.src = source;
  source_img.onload = () => {
    const result_img = new Image();
    result_img.src = result;
    result_img.crossOrigin = 'anonymous';
    result_img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const originalWidth = source_img.width;
      const originalHeight = source_img.height;
      const targetWidth = originalWidth;
      const targetHeight = originalHeight * 2;
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      context.drawImage(
        source_img,
        0,
        0,
        targetWidth,
        targetHeight / 2
      );
      context.drawImage(
        result_img,
        0,
        targetHeight / 2,
        targetWidth,
        targetHeight / 2
      );

      const image = canvas.toDataURL();
      const link = document.createElement('a');
      link.href = image;
      link.download = 'image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };
}

export function exportVideo(image, result) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = image;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext('2d').drawImage(img, 0, 0);
    canvas.toBlob((blob) => {
      // Now we have a `blob` containing webp data

      // Use the file rename trick to turn it back into a file
      const myImage = new File([ blob ], 'source.webp', { type: blob.type });
      // Convert image to dataURL
      // Input must be formatted properly as a base64 encoded DataURI of type image/webp
      const img2 = new Image();
      img2.crossOrigin = 'anonymous';
      img2.src = result;
      img2.onload = () => {
        const canvas2 = document.createElement('canvas');
        canvas2.width = img2.naturalWidth;
        canvas2.height = img2.naturalHeight;
        canvas2.getContext('2d').drawImage(img2, 0, 0);
        canvas2.toBlob((blob) => {
          // Now we have a `blob` containing webp data
  
          // Use the file rename trick to turn it back into a file
          const myImage = new File([ blob ], 'source2.webp', { type: blob.type });
          const images = [ canvas.toDataURL('image/webp'), canvas2.toDataURL('image/webp') ];
          const blob2 = tsWhammy.fromImageArray(images, 0.5);
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob2);
          link.download = 'video.webm';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 'image/webp');
      };
    }, 'image2/webp');
  };
}