"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="destructive" disabled={pending}>
      {pending ? "Logging out..." : "Logout"}
    </Button>
  );
}

export default function NavButtons({
  session,
  logout,
}: {
  session: boolean;
  logout: () => Promise<void>;
}) {
  return (
    <nav className="flex items-center gap-3">
      <Link href="/">
        <Button variant="ghost">Home</Button>
      </Link>

      {!session && (
        <>
          <Link href="/login" prefetch={false}>
            <Button variant="ghost">Login</Button>
          </Link>

          <Link href="/signup" prefetch={false}>
            <Button>Sign up</Button>
          </Link>
        </>
      )}

      {session && (
        <>
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>

          <form action={logout}>
            <LogoutButton />
          </form>
        </>
      )}
    </nav>
  );
}
