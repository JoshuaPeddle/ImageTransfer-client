import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Box } from '@mui/material';
const TFView = dynamic(() => import('@/components/TFView'));
const TopBar = dynamic(() => import('@/components/TopBar'));
const Footer = dynamic(() => import('@/components/Footer'));
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Home() {
  const small_width = useMediaQuery('(max-width:1023px)');
  return (
    <>
      <Head>
        <title>StyleSwap</title>
        <meta name="description" content="StyleSwap" />
        <link rel="icon" href="/logo.webp" type="image/jpg" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      
      <main >
        <Box 
          sx={{
            minHeight:'100svh', 
            display:'flex',
            flexDirection:'column',
            backgroundImage: small_width ? '' : 'url("https://ik.imagekit.io/4adj1pc55/tr:w-900/BG2.webp?updatedAt=1686962735576")',
            backgroundSize:'100% 100%'}}>

          <TopBar />
          
          <TFView />
        
          <Footer />
        </Box>
      </main>
    </>
  );
}
//url("https://ik.imagekit.io/4adj1pc55/tr:w-900/00007-1739593243__1_.png?updatedAt=1687193198934")