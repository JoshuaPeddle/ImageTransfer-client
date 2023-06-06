import { Inter } from 'next/font/google';
import TFView from '@/components/TFView';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { useState } from 'react';
import UserDisplay from '@/components/UserDisplay';
import { User } from '../lib/User';
import type { GetServerSideProps } from 'next';
import prisma from '../lib/prisma';

// export const getServerSideProps: GetServerSideProps = async () => {
//   // const user = await prisma.user.create({
//   //   data: {
//   //     name: 'test',
//   //     email: 'test@test.com',
//   //     password: 'test',
//   //     styles: {},
//   //     num_tokens: 0,
//   //   }
//   // });
//   const userRec = await prisma.user.findUnique({
//     where: {
//       email: 'test@test.com'
//     }
//   });
//   if (!userRec) {
//     throw new Error('user not found');
//   }
//   const user : User = {
//     name: userRec.name,
//     email: userRec.email,
//     tokens: userRec.num_tokens,
//   };
//   return {
//     props: {
//       user: user
//     }
//   };
// };

const inter = Inter({ subsets: [ 'latin' ] });
export default function Home(props: {user: User}) {
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
          <UserDisplay/>
          <TFView />
          
        </div>
        <Footer />
      </main>
     
    </>
  );
}
