import { Inter } from 'next/font/google';
import TFView from '@/components/TFView';
import TopBar from '@/components/TopBar';
const inter = Inter({ subsets: [ 'latin' ] });
export default function Home() {
  return (
    <main
      className={`flex min-h-screen min-w-screen flex-col items-center justify-center flex-wrap  ${inter.className}`}
    >
      <TopBar />
      <TFView />
    </main>
  );
}
