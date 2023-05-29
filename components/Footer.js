import styles from './Footer.module.css';

export default function footer() {
  return (
    <>

      <div className={styles.footer}> 

        <div className={styles.footer_inner}>
          <div className={styles.footer_logo}>
            <img src="/logo.png" width="100" height="100" alt="Logo" />
          </div>

          <div className={styles.footer_title}>
            <h1>styleswap.art</h1>
          </div>

          <div className={styles.footer_links}>
            <a href="">Home</a>
            <a href="">About</a>
          </div>
        </div>

      </div>

    </>
  );
}