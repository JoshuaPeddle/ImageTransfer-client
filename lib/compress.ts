import Compressor from 'compressorjs';
export function compressImage(image: string, setImage: Function, p=0.9,) {
  if (!image) return;
  fetch(image)
    .then((res) => res.blob())
    .then(async (blob) => {
      const options = {
        quality: p,
        convert_type: [ 'image/png', 'image/webp' ],
        convertSize: 5000,
        success(result: Blob) {
          setImage(result);
        }
      };
      new Compressor(blob, options);
    });
}