import Link from "next/link";
import "./NoAccess.css"; // make sure this CSS exists

export default function NoAccessPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Animated Wave Background */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg className="relative block w-[200%] h-64 animate-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C300,100 900,0 1200,100 L1200,00 L0,0 Z" fill="#0f0f0f" opacity="0.6"></path>
          <path d="M0,0 C400,120 800,20 1200,100 L1200,00 L0,0 Z" fill="#1a1a1a" opacity="0.4"></path>
          <path d="M0,0 C600,100 600,0 1200,100 L1200,00 L0,0 Z" fill="#1f1f1f" opacity="0.3"></path>
        </svg>
      </div>

      {/* Foreground Card */}
      <div className="relative z-10 max-w-md w-full text-center border border-gray-700 rounded-2xl p-8 bg-gray-950 bg-opacity-90 shadow-2xl backdrop-blur-md">
        <h1 className="text-5xl font-extrabold mb-4 text-red-500">🚫 Access Denied</h1>
        <p className="text-lg font-medium mb-2">
          <span className="text-yellow-400">Sorry!</span> This event is exclusively available to Indonesian users.
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
