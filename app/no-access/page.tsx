'use client';

import Link from "next/link";
import "./WaveBackground.css";

export default function NoAccessPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ⛱️ Animated Wave Background */}
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>

      {/* 💬 Foreground Content */}
      <div className="relative z-10 max-w-md w-full text-center border border-gray-700 rounded-2xl p-8 bg-black bg-opacity-80 shadow-2xl backdrop-blur-md text-white">
        <h1 className="text-5xl font-extrabold mb-4 text-red-500">🚫 Access Denied</h1>
        <p className="text-lg font-medium mb-2">
          Sorry! This event is exclusively available to Indonesian users only.
        </p>
        <p className="text-sm text-gray-400 mb-6">
          If you believe this is an error, please contact an Admin through Discord.
        </p>
        <Link href="/">
          <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-6 rounded-full transition duration-200">
            ⬅ Go back to Home
          </span>
        </Link>
      </div>
    </div>
  );
}
