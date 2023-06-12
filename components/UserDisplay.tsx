
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function UserDisplay() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className='flex flex-row flex-wrap justify-end pl-3'>
        <h1>{session?.user.num_tokens} Tokens </h1>
        <button className='underline pl-3' onClick={() => signOut()}>Log Out</button>
      </div>
    );
  }
  return (
    <div className='flex flex-row flex-wrap justify-end pl-3'>

      <button className='underline pl-3' onClick={() => signIn()}>Log in</button>
    </div>
  );
}