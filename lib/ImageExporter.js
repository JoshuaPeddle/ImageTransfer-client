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
  var encoder = new Whammy.Video(15); 
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = image;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext('2d').drawImage(img, 0, 0);
    encoder.add(canvas.toDataURL('image/webp'));
    const img2 = new Image();
    img2.crossOrigin = 'anonymous';
    img2.src = result;
    img2.onload = () => {
      const canvas2 = document.createElement('canvas');
      canvas2.width = img2.naturalWidth;
      canvas2.height = img2.naturalHeight;
      canvas2.getContext('2d').drawImage(img2, 0, 0);
      encoder.add(canvas2.toDataURL('image/webp'));
      encoder.compile(false, function(output) {
        var url = (window.webkitURL || window.URL).createObjectURL(output); 
        console.log(url);
        var a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'output.webm';
        document.body.appendChild(a);
        a.click();
      });
    };
  };
};
