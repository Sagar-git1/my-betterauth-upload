import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { logout } from "../(auth)/logout/action";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut, LayoutDashboard, ShieldCheck } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const userEmail = session.user.email;
  const initials = userEmail.substring(0, 2).toUpperCase();

  return (
    // Centering the entire layout in the viewport
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
      <div className="w-full max-w-md space-y-6">
        {/* Branding/Icon at the top */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border">
            <LayoutDashboard className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">
            Account Dashboard
          </h1>
        </div>

        <Card className="shadow-xl border-none ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary text-xl font-bold border-4 border-background shadow-md">
                {initials}
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <p className="text-sm text-muted-foreground">
              You are successfully authenticated
            </p>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            <div className="rounded-xl bg-slate-100/50 dark:bg-slate-900/50 p-4 border border-dashed border-slate-300 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-background rounded-lg shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Active Session
                  </p>
                  <p className="text-sm font-semibold truncate max-w-[220px]">
                    {userEmail}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 pb-8">
            <div className="w-full">
              <Button asChild variant="secondary" className="w-full h-11 font-medium shadow-sm">
                <Link href="/upload">Upload File</Link>
              </Button>
            </div>
            <form action={logout} className="w-full">
              <Button
                variant="destructive"
                type="submit"
                className="w-full h-11 font-medium shadow-sm transition-all hover:shadow-md"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </form>
            <p className="text-[11px] text-center text-muted-foreground px-6">
              To switch accounts, please sign out first.
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
