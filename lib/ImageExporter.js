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
      const context = canvas.getContext('2d', { willReadFrequently: true });
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

async function imgToCanvas(image, data_url=true) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = image;
  return new Promise((resolve) => {
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d', { willReadFrequently: true }).drawImage(img, 0, 0, );
      if (data_url) {
        return resolve(canvas.toDataURL('image/webp')); 
      }
      return resolve(canvas);
    };
  });
}

async function blendImages(image1, image2, bias=0.5, data_url=true) {
  return new Promise((resolve) => {
    var myImg1 = new Image();
    myImg1.crossOrigin = 'anonymous';
    myImg1.src = image1;
    myImg1.onload = () => {
      var myImg2 = new Image();
      myImg2.crossOrigin = 'anonymous';
      myImg2.src = image2;
      myImg2.onload = () => {
        const canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d', { willReadFrequently: true });
        // width and height
        var w = myImg1.width;
        var h = myImg1.height;
        canvas.width = w;
        canvas.height = h;

        var pixels = 4 * w * h;
        ctx.drawImage(myImg1, 0, 0);

        var image1 = ctx.getImageData(0, 0, w, h);
        var imageData1 = image1.data;
        ctx.drawImage(myImg2, 0, 0);

        var image2 = ctx.getImageData(0, 0, w, h);
        var imageData2 = image2.data;
        while (pixels--) {
          imageData1[pixels] = (imageData1[pixels] * (1.0 - bias)) + (imageData2[pixels] * (bias));
        }
        ctx.putImageData(image1, 0, 0);
        if (data_url) {
          return resolve(canvas.toDataURL('image/webp')); 
        }
        return resolve(canvas);
      };
    };
  });
}

export async function exportVideo(image, result, setLoading, setError, num_blend=50, save=true) {
  let images = [];
  for (let i = 0; i < num_blend; i++) {
    images.push(await blendImages(image, result, i / num_blend));
  }
  images = [ image, ...images, result ];
  const URLS = await Promise.all(images.map(async (image) => {
    return await imgToCanvas(image, true); 
  }));
  const blob2 = tsWhammy.fromImageArray(URLS, 17);
  if (save) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob2);
    link.download = 'video.webm';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); 
  }
  setLoading(false);
  return blob2;
}

export async function exportGIF(image, result, setLoading, setError, num_blend=50) {
  var gif = new GIF({
    workers: 2,
    quality: 10,
    workerScript: '/js/gif.worker.js'
  });
  const canvas = await imgToCanvas(image, false);
  const canvas2 = await imgToCanvas(result, false);
  gif.addFrame(canvas, {delay: 1000});
  for (let i = 0; i < num_blend; i++) {
    const canvas3 = await blendImages(image, result, i / num_blend, false);
    gif.addFrame(canvas3, {delay: 50});
  }
  gif.addFrame(canvas2, {delay: 2000});
  gif.render();
  gif.on('finished', function(blob) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'video.gif';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setLoading(false);
  });
}

export async function exportMP4(image, result, setLoading, setError, num_blend=50) {
  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const images = [  ];
  const c = await imgToCanvas(image, false);
  const c2 = await imgToCanvas(result, false);
  images.push(c);
  for (let i = 0; i < num_blend; i++) {
    const canvas3 = await blendImages(image, result, i / num_blend, false);
    images.push(canvas3);
  }
  images.push(c2);
  let canvas = document.createElement('canvas');
  canvas.width = 512;  // resolution of video
  canvas.height = 512;
  let context = canvas.getContext('2d');
  let stream = canvas.captureStream(30);  // 30 FPS
  let recorder = new MediaRecorder(stream, {mimeType: 'video/webm'}); // you might use 'video/mp4' here if the browser supports it
  let chunks = [];
  recorder.ondataavailable = function(e) {
    chunks.push(e.data);
  };
  recorder.onstop = async function(e) {
    let blob = new Blob(chunks, { 'type' : 'video/webm' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'video.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setLoading(false);
  };
  recorder.start();
  for (let i = 0; i < images.length; i++) {
    context.drawImage(images[i], 0, 0, canvas.width, canvas.height);
    recorder.requestData();
    await sleep(100);
  }
  recorder.stop();
}

