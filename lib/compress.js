import Compressor from 'compressorjs';
export function compressImage(image, setImage, p=0.8,) {
  if (!image) return;
  fetch(image)
    .then((res) => res.blob())
    .then(async (blob) => {
      const options = {
        quality: p,
        convert_type: [ 'image/png', 'image/webp' ],
        convertSize: 5000,
        success(result) {
          setImage(result);
        }
      };
      new Compressor(blob, options);
    });
}