import styles from './ImagePlaceholder.module.css';
import Image from 'next/image';

export default function ImagePlaceholder({loading, size }) {
  return (
    <>

      {loading ?  <div className={styles.placeholderLoading}  style={{width: `${size[0]}px`, height:`${size[1]}px`}}></div> :
        <div className={styles.placeholder}  style={{width: `${size[0]}px`, height:`${size[1]}px`}}></div> }
    </>
  );
}

// export default function ImagePlaceholder({loading, size }) {
//   return (
//     <>

//       {loading ?  <div><Image  id='src_img_laceholder' src='/loader-dark.gif' width={size[0]} height={size[1]} alt="" quality={95} /> </div> :
//         <Image id='res_img_placeholder' src='/blank-dark.png' width={size[0]} height={size[1]} alt="" quality={2}/> }
//     </>
//   );
// }

// {loading ? <div className={styles.placeholderLoading}></div> : <div className={styles.placeholder}></div>}