import Image from 'next/image';
import ImagePlaceholder from './ImagePlaceholder';
import styles from './imageView.module.css';

export default function ImageView({image, result, loading, size}) {
  return (
    <div className={styles.imageContainer}>
      <div className={styles.images}>
        {image ? <Image priority={true}  id='src_img' src={image}  width={size[0]} height={size[1]} quality={95} alt="" loader={({ src }) => {
          return src; 
        }} unoptimized /> : <ImagePlaceholder loading={true} size={size}/>}
        {result ? <Image id='res_img' src={result}  width={size[0]} height={size[1]} alt="" quality={95} /> : <ImagePlaceholder loading={loading} size={size}/>}
      </div>
    </div>
  );
}