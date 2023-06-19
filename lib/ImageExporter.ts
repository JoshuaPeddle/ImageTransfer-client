
// This function should take the source image and stack it with the result image according to stack
export function exportImages(source: string, result: string, stack = 'horizontal') {
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
      if (!context) return;
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

async function imgToCanvas(image: string, data_url = true): Promise<HTMLCanvasElement | string> {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = image;
  return new Promise((resolve) => {
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      if (!canvas) return;
      canvas.getContext('2d', { willReadFrequently: true })?.drawImage(img, 0, 0,);
      if (data_url) {
        return resolve(canvas.toDataURL('image/webp'));
      }
      return resolve(canvas);
    };
  });
}

async function blendImages(image1:string, image2:string, bias = 0.5, data_url = true) {
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      let img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
      img.onload = () => resolve(img);
    });
  };
  const [ myImg1, myImg2 ] = await Promise.all([ loadImage(image1), loadImage(image2) ]);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const w = myImg1?.width;
  const h = myImg1?.height;
  canvas.width = w;
  canvas.height = h;
  if (!ctx) return;
  let pixels = 4 * w * h;
  ctx.drawImage(myImg1, 0, 0);

  let image1Data = ctx.getImageData(0, 0, w, h).data;
  ctx.drawImage(myImg2, 0, 0);

  let image2Data = ctx.getImageData(0, 0, w, h).data;
  while (pixels--) {
    image1Data[pixels] = (image1Data[pixels] * (1.0 - bias)) + (image2Data[pixels] * (bias));
  }
  ctx.putImageData(new ImageData(image1Data, w, h), 0, 0);

  return data_url ? canvas.toDataURL('image/webp') : canvas;
}

export async function exportGIF(image: string, result: string, setLoading: Function, setError: Function, setMessage: Function, num_blend = 50) {
  setMessage('Loading web worker...');
  // @ts-ignore
  var gif = new GIF({
    workers: 2,
    quality: 10,
    workerScript: '/js/gif.worker.js'
  });
  const [ canvas, canvas2 ] = await Promise.all([ imgToCanvas(image, false), imgToCanvas(result, false) ]);
  setMessage('Adding frame 1');
  gif.addFrame(canvas, { delay: 1000 });
  
  const blendPromises = Array.from({ length: num_blend }, (_, i) => blendImages(image, result, i / num_blend, false));
  const blendFrames = await Promise.all(blendPromises);
  for (const frame of blendFrames) {
    setMessage(`Adding frame ${gif.frames.length + 1}`);
    gif.addFrame(frame, { delay: 50 });
  }
  setMessage(`Adding frame ${gif.frames.length + 1}`);
  gif.addFrame(canvas2, { delay: 2000 });
  setMessage('Rendering GIF...');
  gif.render();
  gif.on('finished', function (blob: Blob) {
    setMessage('Downloading GIF...');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'video.gif';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMessage('Done!');
    setLoading(false);
  });
}

const writeCanvasToFile = (canvas: HTMLCanvasElement, filename: string, ffmpeg: any) => {
  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      let arrayBuffer = await new Response(blob).arrayBuffer();
      let uint8Array = new Uint8Array(arrayBuffer);
      ffmpeg.FS('writeFile', filename, uint8Array);
      resolve(true);
    }, 'image/png');
  });
};
const aspectRatio = (canvas: HTMLCanvasElement) => (canvas.width / canvas.height);
export async function exportMP4(image:string, result:string, setLoading: Function, setError: Function, setMessage: Function, num_blend = 50) {
  let head_frames = num_blend * 0.2;
  let tail_frames = num_blend * 0.5;
  const aspect = aspectRatio(await imgToCanvas(image, false) as HTMLCanvasElement);
  const {
    createFFmpeg,
    // @ts-ignore
  } = FFmpeg;
  const ffmpeg = createFFmpeg({
    mainName: 'main',
    corePath: 'https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js',
    log: false,
  });
  setMessage('Loading ffmpeg...');
  await ffmpeg.load();
  const headPromises = Array.from({ length: head_frames }, (_, i) =>
    imgToCanvas(image, false)
      .then(async (img) => await writeCanvasToFile(img as HTMLCanvasElement, `${i + 1}.png`, ffmpeg))
  );
  const blendPromises = Array.from({ length: num_blend }, (_, i) =>
    blendImages(image, result, i / num_blend, false)
      .then(async (blendedImg) => await writeCanvasToFile(blendedImg  as HTMLCanvasElement, `${head_frames + i + 1}.png`, ffmpeg))
  );
  setMessage('Rendering video...');
  const tailFramesPromises = Array.from({ length: tail_frames }, (_, i) =>
    imgToCanvas(result, false)
      .then(async (img) => await writeCanvasToFile(img  as HTMLCanvasElement, `${head_frames + num_blend + i + 1}.png`, ffmpeg))
  );
  await Promise.all([ ...headPromises, ...blendPromises, ...tailFramesPromises ]);
  if (aspect > 1) {
  // Horizontal Video
    await ffmpeg.run('-framerate', '15', '-i', '%d.png', '-vf', 'scale=768:512', '-c:v', 'libx264', '-r', '30', '-pix_fmt', 'yuv420p', 'out.mp4');
  } else {
  // Vertical Video 
    await ffmpeg.run('-framerate', '15', '-i', '%d.png', '-vf', 'scale=512:768', '-c:v', 'libx264', '-r', '30', '-pix_fmt', 'yuv420p', 'out.mp4');
  }
  const data = ffmpeg.FS('readFile', 'out.mp4');
  const src = URL.createObjectURL(new Blob([ data.buffer ], { type: 'video/mp4' }));
  // Download
  const link = document.createElement('a');
  link.href = src;
  link.download = 'video.mp4';
  link.click();
  setMessage('Done!');
  setLoading(false);
}

// export async function exportVideo(image, result, setLoading, setError, num_blend=50, save=true) {
//   const tail_frames = 10;
//   async function sleep(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }

//   const imagePromises = [
//     imgToCanvas(image, false),
//     ...Array.from({ length: num_blend }, (_, i) => blendImages(image, result, i / num_blend, false)),
//     ...Array.from({ length: tail_frames }, () => imgToCanvas(result, false))
//   ];
//   const images = await Promise.all(imagePromises);
//   let canvas = document.createElement('canvas');
//   canvas.width = 386;  // resolution of video
//   canvas.height = 386;
//   let context = canvas.getContext('2d', { willReadFrequently: true });
//   let stream = canvas.captureStream(30);  // 30 FPS
//   let recorder = new MediaRecorder(stream, {mimeType: 'video/webm'}); // you might use 'video/mp4' here if the browser supports it
//   let chunks = [];
//   recorder.ondataavailable = function(e) {
//     chunks.push(e.data);
//   };
//   recorder.onstop = async function(e) {
//     let blob = new Blob(chunks, { 'type' : 'video/webm' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'video.webm';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     setLoading(false);
//   };
//   recorder.start();
//   for (let i = 0; i < images.length; i++) {
//     context.drawImage(images[i], 0, 0, canvas.width, canvas.height);
//     recorder.requestData();
//     await sleep(100);
//   }
//   recorder.stop();
// }