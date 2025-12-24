import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { logout } from "@/app/(auth)/logout/action";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          MyApp
        </Link>

        <nav className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>

          {!session && (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </>
          )}

          {session && (
            <>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>

              {/* ✅ Server Action logout */}
              <form action={logout}>
                <Button type="submit" variant="destructive">
                  Logout
                </Button>
              </form>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
