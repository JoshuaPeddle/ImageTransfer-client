import styles from './ImagePlaceholder.module.css';
import Image from 'next/image';
export default function ImagePlaceholder({loading}) {
  return (
    <>

      {loading ?  <div><Image  id='src_img_laceholder' src='/loader-dark.gif' width="384" height="256" alt="" quality={95} /> </div> :
        <Image id='res_img_placeholder' src='/blank-dark.png' width="384" height="256" alt="" quality={95}/> }
    </>
  );
}

// {loading ? <div className={styles.placeholderLoading}></div> : <div className={styles.placeholder}></div>}