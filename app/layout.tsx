// app/event/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import EventContent from "./EventContent";

export default async function EventPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <h2>Akses Ditolak</h2>
        <p>Kamu belum login. Silakan <a href="/api/auth/signin">login dengan Discord</a>.</p>
      </div>
    );
  }

  return <EventContent session={session} />;
}
