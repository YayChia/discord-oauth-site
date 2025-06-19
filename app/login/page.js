'use client';
export const dynamic = 'force-dynamic';

import { useSession } from 'next-auth/react';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();
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
