import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { Box } from '@mui/material';
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
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      
      <main >
        <Box sx={{minHeight:'100svh', display:'flex', flexDirection:'column', backgroundImage:'url("/BG2.jpg")', backgroundSize:'100% 100%'}}>
          <TopBar />
      
          <TFView />
        
          <Footer />
        </Box>
      </main>
    </>
  );
}
