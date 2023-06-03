import Image from 'next/image';
import styles from './TopBar.module.css';
export default function TopBar() {
  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.topbar_inner}>
          <div className={styles.topbar_logo}>
            <Image src="/logo.png" width={100} height={100} placeholder='empty' quality={10} alt="Logo" />
          </div>
          <div className={styles.topbar_title}>
            styleswap.art
          </div>
        </div>
      </div>
    </>
  );
}