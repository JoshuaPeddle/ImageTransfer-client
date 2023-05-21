const API_URL = process.env.NEXT_PUBLIC_IMAGE_SERVER;
export default function predict(model, blob, setResult, setError ) {
  const fd = new FormData();
  const file = new File([ blob ], 'filename.jpeg');
  fd.append('image', file);
  console.log(model, blob);
  fetch(API_URL+'generate/'+model, {method: 'POST', body: fd})
    .then(async (res) => {
      res.blob().then((blob) => {
        try {
          const reader = new FileReader() ;
          reader.onload = function() {
            setResult(this.result);
          } ;
          reader.readAsDataURL(blob) ;
        } catch (e) {
          setError(true);
        }
      });
    }) 
    .catch((err) => {
      console.log(err);setError(true); 
    });
}

