import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
const Image = dynamic(() => import('next/image'));
export default function ImageView({ image, result, loading, size }: { image: string | null, result: string | null, loading: boolean, size: [number, number] }) {
  const imageStyle = {
    height: 'auto',
    flexGrow: '2',
    minWidth: 'min(384px,100vw)',
    'padding': '0 0px 0 0px',
  };
  const src_ref = useRef<HTMLImageElement>(null);
  const [ height, setHeight ] = useState(341);
  const calcHeight = useCallback(() => {
    const img = src_ref.current;
    if (!img) return;
    setHeight(img.clientHeight);
  }, [  ]);
  useEffect(() => {
    window.addEventListener('resize', calcHeight);
    return () => {
      window.removeEventListener('resize', calcHeight);
    };
  }, [ calcHeight ]);

  return (
    <Box
      className='image-view'
      sx={{ 
        display: 'flex',
   
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-around',

      }}>

      <Box ref={src_ref} sx={{ display: 'flex', minWidth: 'min(384px,100vw)', maxWidth: 'min(512x,100vw)', width:'min(512px,100vw)' }}>
        <Image onLoadingComplete={calcHeight} style={imageStyle} placeholder="blur" blurDataURL={'/blank-dark.webp'} priority={true} id='src_img' src={image ? image : '/loader-dark-min.gif'} width={size[0]} height={size[1]} quality={85} alt="" loader={({ src }) => {
          return src;
        }} unoptimized />
      </Box>
      <Box style={{ display: 'flex', minWidth: 'min(384px,100vw)', maxWidth: 'min(512px,100vw)', width:'min(512px,100vw)', height: height }}>
        <Image style={imageStyle} placeholder="blur" blurDataURL={'/blank-dark.webp'} id='res_img' src={loading ? '/loader-dark-min.gif' : result ? result : '/blank-dark.webp'} width={size[0]} height={size[1]} alt="" quality={85} />
      </Box>
    </Box>

  );
}  