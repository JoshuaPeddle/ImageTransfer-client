import Image from 'next/image';
import ImagePlaceholder from './ImagePlaceholder';
import styles from './imageView.module.css';

export default function ImageView({ image, result, loading, size }: { image: string | null, result: string | null, loading: boolean, size: [number, number] }) {
  return (
    <div className={styles.imageContainer}>
      <div className={styles.images}>
        {image ? <Image placeholder="blur" blurDataURL={'/blank-dark.png'} priority={true} id='src_img' src={image} width={size[0]} height={size[1]} quality={85} alt="" loader={({ src }) => {
          return src;
        }} unoptimized /> : <Image placeholder="blur" blurDataURL={'/blank-dark.png'} id='res_img' src={'/loader-dark.gif'} width={size[0]} height={size[1]} alt="" quality={85} />}
        {result ? <Image placeholder="blur" blurDataURL={'/blank-dark.png'} id='res_img' src={result} width={size[0]} height={size[1]} alt="" quality={85} /> :
          <Image placeholder="blur" blurDataURL={'/blank-dark.png'} id='res_img' src={'/loader-dark.gif'} width={size[0]} height={size[1]} alt="" quality={85} />}
      </div>
    </div>
  );
}  