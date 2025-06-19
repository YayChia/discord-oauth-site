// app/event/EventContent.tsx
'use client';

import { signOut } from "next-auth/react";

type Props = {
  session: {
    user: {
      name: string;
      id: string;
    };
  };
};

export default function EventContent({ session }: Props) {
  return (
    <div>
      <h1>Selamat datang, {session.user.name}!</h1>
      <p>ID Discord kamu: {session.user.id}</p>
      <button onClick={() => signOut()} className="mt-4 bg-red-600 px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}
