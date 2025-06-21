export default function NoAccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white px-4">
      <div className="text-center max-w-md space-y-4">
        <h1 className="text-4xl font-bold text-red-500">🚫 Access Denied</h1>
        <p className="text-lg">
          You are not permitted to access this event. Please check your Discord access or try logging in again.
        </p>
        <a
          href="/"
          className="inline-block mt-4 rounded bg-white text-black px-4 py-2 font-semibold hover:bg-gray-200 transition"
        >
          Return to Home
        </a>
      </div>
    </main>
  );
}
