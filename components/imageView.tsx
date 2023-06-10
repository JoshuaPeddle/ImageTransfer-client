import dynamic from 'next/dynamic';
import styles from './imageView.module.css';
import { useEffect, useRef, useState} from 'react';
const Image = dynamic(() => import('next/image'));
export default function ImageView({ image, result, loading, size }: { image: string | null, result: string | null, loading: boolean, size: [number, number] }) {
  const imageStyle = {
    height:'auto',
    flexGrow: '2', 
    minWidth:'min(384px,100vw)'
  };
  const src_ref = useRef(null);
  const [ height, setHeight ] = useState(384);
  useEffect(() => {
    const aspectRatio = size[0] / size[1];
    setHeight(384*(1.0/aspectRatio));
    // Crop the image horizontally
  }, [ size ]);
  
  return (
    <div className={styles.imageContainer}>
      <div className={styles.images}>
        <div style={{display:'flex', minWidth:'min(384px,100vw)', maxWidth:'min(384px,100vw)'}}> 
          <Image style={imageStyle} placeholder="blur" ref={src_ref} blurDataURL={'/blank-dark.png'} priority={true} id='src_img' src={image? image :'/loader-dark.gif'}    width={size[0]} height={size[1]}  quality={85} alt="" loader={({ src }) => {
            return src;
          }} unoptimized />
        </div>
        {<div style={{ display:'flex',  minWidth:'min(384px,100vw)', maxWidth:'min(384px,100vw)', height:height}}>
          <Image style={imageStyle} placeholder="blur" blurDataURL={'/blank-dark.png'} id='res_img' src={loading? '/loader-dark.gif' : result? result :'/blank-dark.png'} width={size[0]} height={size[1]} alt="" quality={85} />
        </div> }
      </div>
    </div>
  );
}  