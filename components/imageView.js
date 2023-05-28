import Image from 'next/image';
import ImagePlaceholder from './ImagePlaceholder';
import styles from './imageView.module.css';
export default function ImageView({image, result, loading}) {
  return (
    <div className={styles.imageContainer}>
      <div className={styles.images}>
        {image ? <Image priority={true}  id='src_img' src={image} width="384" height="256" quality={95} alt="" loader={({ src }) => {
          return src; 
        }} unoptimized /> : <ImagePlaceholder loading={true}/>}
        {result ? <Image id='res_img' src={result} width="384" height="256" alt="" quality={95} /> : <ImagePlaceholder loading={loading}/>}
      </div>
    </div>
  );
}