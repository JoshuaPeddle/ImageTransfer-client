import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import TFView from '@/components/TFView';
const TopBar = dynamic(() => import('@/components/TopBar'));
const Footer = dynamic(() => import('@/components/Footer'));
const inter = Inter({ subsets: [ 'latin' ] });
export default function Home() {
  const { data: session } = useSession();
  const [ local_tokens, setLocalTokens ] = useState<string |null>(null);
  const updateLocalTokens = useCallback(() => {
    if (session) return;
    const num_tokens = window.localStorage.getItem('num_tokens');
    if (!num_tokens) return;
    setLocalTokens(num_tokens);
  }, [ session ]);
  useEffect(() => {
    const init_num_tokens = () => {
      const last_request = window.localStorage.getItem('last_request');
      const num_tokens = window.localStorage.getItem('num_tokens');
      if (!last_request) {
        window.localStorage.setItem('num_tokens', '10');
        return window.localStorage.setItem('last_request', new Date().toString());
      }
      if (last_request && num_tokens) {                 // Refresh num_tokens if last request was more than 24 hours ago
        const now = new Date();
        const last = new Date(last_request);
        const diff = now.getTime() - last.getTime();
        const diff_hours = diff / (1000 * 60 * 60);
        if (diff_hours < 0.01) return;
        window.localStorage.setItem('num_tokens', '10');
        return window.localStorage.setItem('last_request', now.toString());
      }
    };
    if (session) return;
    init_num_tokens();   
    updateLocalTokens();
  }, [ session, updateLocalTokens ]);

  return (
    <>
      <Head>
        <title>Style Transfer</title>
        <meta name="description" content="Style Transfer" />
        <link rel="icon" href="/logo.jpg" type="image/jpg" />
      </Head>
      <TopBar num_tokens={local_tokens }/>
      <main className='flex flex-col min-h-screen '>
        <div className={`flex flex-1 min-w-screen flex-col items-center justify-center  ${inter.className}`}>
          <TFView updateLocalTokens={updateLocalTokens}/>
        </div>
        <Footer />
      </main>
    </>
  );
}
