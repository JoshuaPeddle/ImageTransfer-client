
import type { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
export default function UserDisplay({ loggedIn, name, num_tokens }: { loggedIn: Session | null, name: string | null | undefined, num_tokens: number | undefined }) {
  if (loggedIn) {
    return (
      <>
        <h1>{name}</h1>
        <h1>{num_tokens}</h1>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}