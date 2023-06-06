
import type { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
export default function UserDisplay({ loggedIn, name, num_tokens }: { loggedIn: Session | null, name: string | null | undefined, num_tokens: number | undefined }) {
  if (loggedIn) {
    return (
      <div className='flex'>
        <h1>{num_tokens}</h1>
        <button  onClick={() => signOut()}>Sign-Out</button>
      </div>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}