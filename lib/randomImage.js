// This method should fetch and cache N random images to be retreived by the client

const N = 100;
const API_URL = process.env.NEXT_PUBLIC_IMAGE_SERVER;
const cachedImages = [];
export  async function getRandomImage( ) {
  if (cachedImages.length < N*0.2) {
    prefetchRandomImages();
  }
  if (cachedImages.length === 0) {
    await prefetchRandomImages();
  }
  return cachedImages.pop();
}

export async function prefetchRandomImages( ) {
  const res = await fetch(API_URL+'random/'+N, {method: 'GET'});
  const data = await res.json();
  cachedImages.push(...data['urls']);
}
