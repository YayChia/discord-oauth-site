'use client';

import { signIn } from 'next-auth/react';
import './no-access/WaveBackground.css'; // Reusing wave CSS

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="relative min-h-screen text-white flex items-center justify-center px-4 overflow-hidden">
      {/* Waves Background */}
      <div className="absolute inset-0 z-0">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>

      {/* Foreground Box */}
      <div className="relative z-10 text-center space-y-6 max-w-md w-full border border-neutral-700 rounded-2xl p-8 bg-black/80 shadow-xl backdrop-blur-sm">
        <h1 className="text-4xl font-extrabold tracking-wide text-gray-100">
          Nocturnal Victims Event
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Selamat datang di event Mobile Legends Nocturnal Victims<br />
          Silakan login dengan akun Discord Anda untuk melanjutkan pendaftaran.
        </p>
        <button
          onClick={() => signIn('discord', { callbackUrl: '/event' })}
          className="bg-white text-black hover:bg-gray-300 transition-colors px-6 py-3 rounded-full text-base font-semibold shadow-md"
        >
          Login dengan Discord
        </button>
      </div>
    </div>
  );
}
