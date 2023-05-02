// Desc: Let the user load a local image

import { useCallback } from 'react';

export default function LocalImageLoader({setImage}) {
  const update = useCallback((e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target.result);
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }, [ setImage ]);
  return (
    <input type="file" accept="image/*" onChange={update} />
  );
}