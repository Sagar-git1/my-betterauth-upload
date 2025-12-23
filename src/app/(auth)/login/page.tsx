import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "./action";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold tracking-tight">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent className="px-10 pb-8">
          <form action={login} className="flex flex-col gap-8">
            <div className="grid gap-3">
              <Label htmlFor="email" className="text-lg font-semibold">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="h-12 text-lg"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="password" className="text-lg font-semibold">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="h-12 text-lg"
              />
            </div>

            <Button className="w-full h-12 text-lg mt-4" type="submit">
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
