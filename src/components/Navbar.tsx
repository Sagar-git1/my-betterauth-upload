// Navbar.tsx (Server Component)
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { logout } from "@/app/(auth)/logout/action";
import NavButtons from "./NavButtons";

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

        <NavButtons session={!!session} logout={logout} />
      </div>
    </header>
  );
}
