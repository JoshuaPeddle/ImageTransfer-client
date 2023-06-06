import Image from 'next/image';
import styles from './TopBar.module.css';
import UserDisplay from '@/components/UserDisplay';
import { useSession } from 'next-auth/react';
export default function TopBar() {
  const { data: session } = useSession();
  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.topbar_inner}>
          <div className={styles.topbar_logo}>
            <Image src="/logo.webp" width={100} height={100} placeholder='empty' quality={10} alt="Logo" />
          </div>
          <div className={styles.topbar_title}>
            styleswap.art
          </div>
          <UserDisplay loggedIn={session} name={session?.user.name} num_tokens={session?.user.num_tokens}/>
        </div>

      </div>
    </>
  );
}