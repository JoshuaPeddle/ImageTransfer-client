// Desc: Let the user load a local image

import { useCallback } from 'react';

export default function StyleButton({style, predict, label}) {
 
  return (
    <><button onClick={()=> predict(style)}> {label}</button><br/></>
  );
}