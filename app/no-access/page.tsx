'use client';

import { signIn } from 'next-auth/react';
import './NoAccess.css';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-4 overflow-hidden">
      {/* Fullscreen Animated Wave Background */}
      <div className="animated-bg-container">
        <div className="animated-bg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,100 900,0 1200,100 L1200,0 L0,0 Z" fill="#0f0f0f" opacity="0.6" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,100 900,0 1200,100 L1200,0 L0,0 Z" fill="#0f0f0f" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Foreground Login Card */}
      <div className="relative z-10 text-center space-y-6 max-w-md w-full border border-gray-700 rounded-2xl p-8 bg-gray-950 bg-opacity-90 shadow-2xl backdrop-blur-md">
        <h1 className="text-4xl font-extrabold tracking-wide text-indigo-400">
          Nocturnal Victims Event
        </h1>
        <p className="text-gray-300 text-sm leading-relaxed">
          Selamat datang di event Mobile Legends kami.<br />
          Silakan login dengan akun Discord Anda untuk melanjutkan pendaftaran.
        </p>
        <button
          onClick={() => signIn('discord', { callbackUrl: '/event' })}
          className="bg-indigo-600 hover:bg-indigo-700 transition-colors px-6 py-3 rounded-full text-base font-semibold shadow-md"
        >
          🔗 Login dengan Discord
        </button>
      </div>
    </div>
  );
}
