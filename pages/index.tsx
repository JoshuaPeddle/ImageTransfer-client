import { Inter } from 'next/font/google';
import TFView from '@/components/TFView';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
const inter = Inter({ subsets: [ 'latin' ] });
export default function Home() {
  return (
    <>
      <TopBar />
      <main className='flex flex-col min-h-screen '>
        <div className={`flex flex-1 min-w-screen flex-col items-center justify-center  ${inter.className}`}>
          <TFView />
        </div>
        <Footer />
      </main>
     
    </>
  );
}
