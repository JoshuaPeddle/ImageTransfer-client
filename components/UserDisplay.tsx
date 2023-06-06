
import { User } from '../lib/User';
import { useSession, signIn, signOut } from 'next-auth/react';
export default function UserDisplay() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <h1>{session.user?.name}</h1>
        <h1>{session.user?.num_tokens}</h1>
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