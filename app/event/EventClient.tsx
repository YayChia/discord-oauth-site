'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function EventClient() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <h2 className="text-2xl font-bold">Akses Ditolak</h2>
          <p className="text-gray-300">
            Kamu belum login.{' '}
            <Link href="/" className="text-indigo-400 underline">
              Login dengan Discord
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-3xl font-bold tracking-wide">
          Selamat Datang, {session.user.name}!
        </h1>
        <p className="text-gray-300">
          Silakan pilih salah satu peran di bawah untuk mendaftar ke event Mobile Legends.
        </p>
        <div className="space-y-4">
          <a
            href="https://forms.gle/sQ6Vvraipcwb9Rxe6"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-green-600 hover:bg-green-700 transition-colors px-6 py-3 rounded-xl text-lg font-semibold"
          >
            Player Sign Up
          </a>
          <a
            href="https://forms.gle/qzmgDXjKs1FdYR8N6"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-purple-600 hover:bg-purple-700 transition-colors px-6 py-3 rounded-xl text-lg font-semibold"
          >
            Caster Sign Up
          </a>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="mt-4 text-sm text-gray-400 hover:underline"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
