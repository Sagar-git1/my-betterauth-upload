import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="max-w-2xl text-center px-6 space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Production-grade Auth & Uploads
        </h1>

        <p className="text-muted-foreground text-lg">
          Built with Next.js 15, Better Auth, Drizzle ORM, Neon Postgres,
          Cloudflare R2 and shadcn/ui.
        </p>
      </div>
    </main>
  );
}
