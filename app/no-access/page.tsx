import Link from "next/link";
import "./NoAccess.css"; // make sure to create this CSS file

export default function NoAccessPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black animated-bg"></div>

      <div className="relative z-10 max-w-md w-full text-center border border-gray-700 rounded-2xl p-8 bg-gray-950 bg-opacity-90 shadow-2xl backdrop-blur-md">
        <h1 className="text-5xl font-extrabold mb-4 text-red-500">🚫 Access Denied</h1>
        <p className="text-lg font-medium mb-2">
          This event is <span className="text-yellow-400">Sorry! This event is exclusively available to Indonesian users only</span>.
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
