'use client';
import Link from 'next/link';

export default function ClientOnlyContent({ session }) {
  if (!session) {
    return (
      <div>
        <h2>Akses Ditolak</h2>
        <p>
          Kamu belum login. <Link href="/login">Login dengan Discord</Link>
        </p>
      </div>
    );
  }

  if (session.user.isInBlockedGuild) {
    return (
      <div>
        <h2>Akses Ditolak</h2>
        <p>
          Maaf, kamu tidak dapat ikut event karena kamu tergabung dalam server yang tidak diizinkan.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Selamat datang, {session.user.name}!</h1>
      <p>ID Discord kamu: {session.user.id}</p>
    </div>
  );
}
