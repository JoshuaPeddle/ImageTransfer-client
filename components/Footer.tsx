import styles from './Footer.module.css';

export default function footer() {
  return (
    <>
      <div className={styles.footer}> 
        <div className={styles.footer_inner}>
          <div className={styles.footer_info}>
            <p className={styles.footer_title}>styleswap.art</p>
            <p className={styles.footer_quote}>Style Transfer for Everyone</p>
            <p className={styles.footer_year}>2023</p>
          </div>
          <div className={styles.footer_links}>
            <a href="/privacy">Privacy Policy</a>
            <a href="/TOS">TOS</a>
          </div>
        </div>
      </div>
    </>
  );
}