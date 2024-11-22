import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Looper's Code</h1>
      <Link href="/signin">
        <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Sign In
        </button>
      </Link>
    </div>
  );
}
