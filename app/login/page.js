'use client';
export const dynamic = 'force-dynamic';

import { useSession, signIn } from 'next-auth/react';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const sessionData = useSession();
  const session = sessionData?.data;
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/event");
  }, [session, router]);

  return (
    <div>
      <h2>Login terlebih dahulu</h2>
      <button onClick={() => signIn("discord")}>Login with Discord</button>
    </div>
  );
}
