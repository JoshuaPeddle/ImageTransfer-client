import dynamic from 'next/dynamic';
import styles from './TopBar.module.css';
const UserDisplay = dynamic(() => import('./UserDisplay'));
const Image = dynamic(() => import('next/image'));
export default function TopBar() {
  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.topbar_inner}>
          <div className={styles.topbar_logo}>
            <Image className={styles.topbar_image} src="/logo.webp" width={40} height={40} placeholder='empty' quality={10} alt="Logo" />
            <div className={styles.topbar_title}>
            styleswap.art
            </div>
          </div>
          <UserDisplay/>
        </div>

      </div>
    </>
  );
}