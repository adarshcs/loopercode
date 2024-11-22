import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      {/* Header Section */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 20px',
          backgroundColor: '#f5f5f5',
        }}
      >
        <h1>LooperCode</h1>
        <div>
          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Display user name and picture */}
              <Image
                src={session.user?.image || '/default-avatar.png'}
                alt="Profile Picture"
                width={40}
                height={40}
                style={{ borderRadius: '50%' }}
              />
              <span>{session.user?.name}</span>
              <button onClick={() => signOut()} style={{ marginLeft: '10px' }}>
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn('google')}
              style={{
                padding: '10px',
                backgroundColor: '#4285F4',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              Continue with Google
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Mountain Trail Biking</h2>
        <p>{session ? `Hello, ${session.user?.name}!` : 'Please sign in to continue.'}</p>
      </main>
    </div>
  );
}

