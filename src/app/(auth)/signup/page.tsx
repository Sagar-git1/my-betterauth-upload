import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signup } from "./action";

export default function SignupPage() {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-sm border-gray-200">
      <CardHeader className="pt-10 pb-6">
        <CardTitle className="text-center text-3xl font-bold tracking-tight">
          Create account
        </CardTitle>
      </CardHeader>

      {/* px-12 creates the deep inset from the card edges */}
      <CardContent className="px-12 pb-10">
        <form action={signup} className="flex flex-col gap-8">
          {/* Name Field */}
          <div className="grid gap-3">
            <Label htmlFor="name" className="text-lg font-semibold">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              className="h-12 text-lg rounded-lg border-gray-300"
            />
          </div>

          {/* Email Field */}
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
              className="h-12 text-lg rounded-lg border-gray-300"
            />
          </div>

          {/* Password Field */}
          <div className="grid gap-3">
            <Label htmlFor="password" className="text-lg font-semibold">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              className="h-12 text-lg rounded-lg border-gray-300"
            />
          </div>

          {/* Button with spacing matching the previous style */}
          <Button
            className="w-full h-12 text-lg font-bold bg-[#1a1a1a] hover:bg-black rounded-lg mt-4"
            type="submit"
          >
            Create account
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
