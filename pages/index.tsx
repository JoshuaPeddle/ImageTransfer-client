import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Box } from '@mui/material';
import Image from 'next/image';
const TFView = dynamic(() => import('@/components/TFView'));
const TopBar = dynamic(() => import('@/components/TopBar'));
const Footer = dynamic(() => import('@/components/Footer'));
export default function Home() {
  return (
    <>
      <Head>
        <title>StyleSwap</title>
        <meta name="description" content="StyleSwap" />
        <link rel="icon" href="/logo.webp" type="image/jpg" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      
      <main >
        <Box sx={{minHeight:'100svh', display:'flex', flexDirection:'column'}}>
          <Image alt="" src="/BG2.webp" width={900} height={800} style={{position:'absolute', zIndex:-1, height:'100%', width:'100%'}} />

          <TopBar />
      
          <TFView />
        
          <Footer />
        </Box>
      </main>
    </>
  );
}
