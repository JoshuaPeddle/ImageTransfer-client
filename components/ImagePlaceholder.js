import styles from './ImagePlaceholder.module.css';

export default function ImagePlaceholder({loading}) {
  return (
    <>
      {loading ? <div className={styles.placeholderLoading}></div> : <div className={styles.placeholder}></div>}
    </>
  );
}