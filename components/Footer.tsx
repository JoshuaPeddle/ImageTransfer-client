import styles from './Footer.module.css';
import Link from 'next/link';
export default function footer() {
  return (
    <>
      <div className={styles.footer}> 
        <div className={styles.footer_inner}>
          <div className={styles.footer_info}>
            <p className={styles.footer_quote}>Style Transfer for Everyone</p>
            <p className={styles.footer_year}>2023</p>
          </div>
          <div className={styles.footer_links}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/TOS">TOS</Link>
          </div>
        </div>
      </div>
    </>
  );
}