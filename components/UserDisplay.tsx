
import type { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
export default function UserDisplay({ loggedIn, name, num_tokens }: { loggedIn: Session | null, name: string | null | undefined, num_tokens: number | undefined }) {
  if (loggedIn) {
    return (
      <div className='flex flex-row flex-wrap justify-end pl-3'>
        <h1>{num_tokens} Tokens </h1>
        
        <button className='underline pl-3' onClick={() => signOut()}>Log Out</button>
      </div>
    );
  }
  return (
    <>
      
      <button onClick={() => signIn()}>Log in</button>
    </>
  );
}