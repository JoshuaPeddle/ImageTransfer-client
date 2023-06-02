import styles from './ImagePlaceholder.module.css';

export default function ImagePlaceholder({loading, size }: {loading: boolean, size: [number, number]}) {
  return (
    <>
      {loading ?  <div className={styles.placeholderLoading}  style={{width: `${size[0]}px`, height:`${size[1]}px`}}></div> :
        <div className={styles.placeholder}  style={{width: `${size[0]}px`, height:`${size[1]}px`}}></div> }
    </>
  );
}