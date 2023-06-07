import Image from 'next/image';
import styles from './TopBar.module.css';
import UserDisplay from '@/components/UserDisplay';
export default function TopBar({num_tokens}: {num_tokens: string | null}) {
  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.topbar_inner}>
          <div className={styles.topbar_logo}>
            <Image src="/logo.webp" width={40} height={40} placeholder='empty' quality={10} alt="Logo" />
          </div>
          <div className={styles.topbar_title}>
            styleswap.art
          </div>
          <UserDisplay num_tokens={num_tokens}/>
        </div>

      </div>
    </>
  );
}