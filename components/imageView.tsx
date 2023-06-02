import Image from 'next/image';
import ImagePlaceholder from './ImagePlaceholder';
import styles from './imageView.module.css';

export default function ImageView({image, result, loading, size} : {image: string, result: string, loading: boolean, size: [number, number]}) {
  return (
    <div className={styles.imageContainer}>
      <div className={styles.images}>
        {image ? <Image  placeholder="blur" blurDataURL={'/blank-dark.png'}  priority={true}  id='src_img' src={image}  width={size[0]} height={size[1]} quality={85} alt="" loader={({ src }) => {
          return src; 
        }} unoptimized /> : <ImagePlaceholder loading={true} size={size}/>}
        {result ? <Image  placeholder="blur" blurDataURL={'/blank-dark.png'} id='res_img' src={result}  width={size[0]} height={size[1]} alt="" quality={85} /> : <ImagePlaceholder loading={loading} size={size}/>}
      </div>
    </div>
  );
}  