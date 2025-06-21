'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import './no-access/WaveBackground.css'; // Make sure this path is correct

export default function EventClient() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-4 overflow-hidden">
        {/* Wave Background */}
        <div className="absolute inset-0 z-0">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>

        <div className="relative z-10 text-center space-y-6 max-w-md w-full border border-gray-700 p-8 rounded-2xl bg-gray-950 bg-opacity-90 shadow-lg backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white">🚫 Akses Ditolak</h2>
          <p className="text-gray-400">
            Kamu belum login.{' '}
            <Link href="/" className="text-white underline hover:text-gray-300 transition">
              Login dengan Discord
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-4 overflow-hidden">
      {/* Wave Background */}
      <div className="absolute inset-0 z-0">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>

      {/* Foreground */}
      <div className="relative z-10 text-center space-y-6 max-w-md w-full border border-gray-700 p-8 rounded-2xl bg-gray-950 bg-opacity-90 shadow-lg backdrop-blur-sm">
        <h1 className="text-3xl font-extrabold tracking-wide text-white">
          Selamat Datang, {session?.user?.name}!
        </h1>
        <p className="text-gray-400 text-sm">
          Silakan pilih salah satu peran di bawah untuk mendaftar ke event Mobile Legends.
        </p>
        <div className="space-y-4">
          <a
            href="https://forms.gle/sQ6Vvraipcwb9Rxe6"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white text-black hover:bg-gray-200 transition-colors px-6 py-3 rounded-full text-base font-semibold shadow-md"
          >
            🕹️ Player Sign Up
          </a>
          <a
            href="https://forms.gle/qzmgDXjKs1FdYR8N6"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white text-black hover:bg-gray-200 transition-colors px-6 py-3 rounded-full text-base font-semibold shadow-md"
          >
            🎤 Caster Sign Up
          </a>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="mt-6 text-sm text-gray-400 hover:text-white hover:underline transition"
        >
          🔓 Sign Out
        </button>
      </div>
    </div>
  );
}
