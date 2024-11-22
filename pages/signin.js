import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignInPage() {
  const { data: session } = useSession();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>LooperCode</h1>
      {session ? (
        <div>
          <p>Signed in as {session.user.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div>
          <button onClick={() => signIn('google')}>
              Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
}
