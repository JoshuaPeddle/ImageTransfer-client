const N = 25;
const API_URL = process.env.NEXT_PUBLIC_IMAGE_SERVER;
const cachedImages: string[] = [];
let prefetching = false; // lock to prevent concurrent prefetches
export async function getRandomImage() {
  if (cachedImages.length < N * 0.2 && !prefetching) {
    await prefetchRandomImages();
  }
  if (cachedImages.length === 0 && !prefetching) {
    await prefetchRandomImages();
  }
  return cachedImages.pop();
}

export async function prefetchRandomImages() {
  prefetching = true;
  try {
    const res = await fetch(API_URL + 'random/' + N, { method: 'GET' });
    if (!res.ok) throw new Error(`An error occurred: ${res.statusText}`);
    const data = await res.json();
    cachedImages.push(...data['urls']);
  } catch (error) {
    console.error('Error prefetching images: ', error);
  } finally {
    prefetching = false; // unlock prefetching
  }
}