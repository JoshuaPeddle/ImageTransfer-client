import { Inter } from 'next/font/google';
import TFView from '@/components/TFView';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import UserDisplay from '@/components/UserDisplay';

const inter = Inter({ subsets: [ 'latin' ] });
export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Style Transfer</title>
        <meta name="description" content="Style Transfer" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <TopBar />
      <main className='flex flex-col min-h-screen '>
        <div className={`flex flex-1 min-w-screen flex-col items-center justify-center  ${inter.className}`}>
          <UserDisplay loggedIn={session} name={session?.user.name} num_tokens={session?.user.num_tokens}/>
          <TFView />
        </div>
        <Footer />
      </main>
    </>
  );
}
