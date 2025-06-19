'use client';

import { signIn } from 'next-auth/react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-3xl font-bold tracking-wide">
          Nocturnal Victims Event
        </h1>
        <p className="text-gray-300">
          Selamat datang di event Mobile Legends kami. Silakan login dengan akun Discord Anda untuk melanjutkan pendaftaran.
        </p>
        <button
          onClick={() => signIn('discord', { callbackUrl: '/event' })}
          className="bg-indigo-600 hover:bg-indigo-700 transition-colors px-6 py-3 rounded-xl text-lg font-semibold"
        >
          Login dengan Discord
        </button>
      </div>
    </div>
  );
}
