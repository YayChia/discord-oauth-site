import Link from "next/link";

export default function NoAccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">🚫 Access Denied</h1>
        <p className="text-lg">You do not have permission to access this page.</p>
        <p className="mt-2 text-sm text-gray-400">
          <Link href="/">
            <span className="text-blue-400 underline">Go back</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
