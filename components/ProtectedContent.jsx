'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ProtectedContent() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    return (
      <div>
        <h2>Akses Ditolak</h2>
        <p>Kamu belum login. <Link href="/login">Login dengan Discord</Link></p>
      </div>
    );
  }

  if (session.user?.isInBlockedGuild) {
    return <p>Akses ditolak karena kamu tergabung dalam server yang diblokir.</p>;
  }

  return (
    <div>
      <h1>Selamat datang, {session.user.name}!</h1>
      <p>ID Discord kamu: {session.user.id}</p>
    </div>
  );
}
