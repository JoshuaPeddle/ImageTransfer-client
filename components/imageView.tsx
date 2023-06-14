import dynamic from 'next/dynamic';
import styles from './imageView.module.css';
import { useCallback, useEffect, useRef, useState} from 'react';
import { Box } from '@mui/material';
const Image = dynamic(() => import('next/image'));
export default function ImageView({ image, result, loading, size }: { image: string | null, result: string | null, loading: boolean, size: [number, number] }) {
  const imageStyle = {
    height:'auto',
    flexGrow: '2', 
    minWidth:'min(384px,100vw)',
    'padding': '0 0px 0 0px',
  };
  const src_ref = useRef<HTMLDivElement>(null);
  const [ height, setHeight ] = useState(256);
  const calcHeight = useCallback( () => {
    const img = src_ref.current;
    if (!img) return;
    setHeight( img.clientHeight);
  }, []);
  useEffect(() => {
    window.addEventListener('resize', calcHeight);
    return () => {
      window.removeEventListener('resize', calcHeight);
    };
  }, [ calcHeight ]);

  return (

    <Box sx={{display:'flex', justifyContent:'center', flexDirection: 'row', flexWrap:'wrap'}}>
 
      <Box ref={src_ref} sx={{display:'flex', minWidth:'min(384px,100vw)', maxWidth:'min(384px,100vw)'}}> 
        <Image onLoadingComplete={calcHeight} style={imageStyle} placeholder="blur"  blurDataURL={'/blank-dark.png'} priority={true} id='src_img' src={image? image :'/loader-dark.gif'}    width={size[0]} height={size[1]}  quality={85} alt="" loader={({ src }) => {
          return src;
        }} unoptimized />
      </Box>
      <Box style={{ display:'flex',  minWidth:'min(384px,100vw)', maxWidth:'min(384px,100vw)', height:height}}>
        <Image style={imageStyle} placeholder="blur" blurDataURL={'/blank-dark.png'} id='res_img' src={loading? '/loader-dark.gif' : result? result :'/blank-dark.png'} width={size[0]} height={size[1]} alt="" quality={85} />
      </Box> 
    </Box>
 
  );
}  