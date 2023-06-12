import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const TFView = dynamic(() => import('@/components/TFView'));
const TopBar = dynamic(() => import('@/components/TopBar'));
const Footer = dynamic(() => import('@/components/Footer'));
const inter = Inter({ subsets: [ 'latin' ] });
export default function Home() {
  return (
    <>
      <Head>
        <title>Style Transfer</title>
        <meta name="description" content="Style Transfer" />
        <link rel="icon" href="/logo.jpg" type="image/jpg" />

      </Head>
      <TopBar />
      <main className='flex flex-col min-h-screen items-center'>
        
        <div className={`flex flex-1 max-w-[1000px] flex-col items-center justify-center   ${inter.className}`}>
          <TFView />
        </div>
        <Footer />
      </main>
    </>
  );
}
