"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "./action";

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signup, {});

  const {
    register,
    formState: { errors },
  } = useForm<SignupFormValues>();

  return (
    <Card className="w-full max-w-sm mx-auto shadow-sm border-gray-200">
      <CardHeader className="pt-10 pb-6">
        <CardTitle className="text-center text-3xl font-bold tracking-tight">
          Create account
        </CardTitle>
      </CardHeader>

      <CardContent className="px-12 pb-10">
        <form action={formAction} className="flex flex-col gap-6">
          {/* Name */}
          <div className="grid gap-2">
            <Label className="text-lg font-semibold">Name</Label>
            <Input
              className="h-12 text-lg rounded-lg"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label className="text-lg font-semibold">Email</Label>
            <Input
              type="email"
              className="h-12 text-lg rounded-lg"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label className="text-lg font-semibold">Password</Label>
            <Input
              type="password"
              className="h-12 text-lg rounded-lg"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Server Error */}
          {state?.error && (
            <p className="text-center text-sm text-red-600 font-medium">
              {state.error}
            </p>
          )}

          <Button
            disabled={isPending}
            className="w-full h-12 text-lg font-bold bg-[#1a1a1a] hover:bg-black rounded-lg mt-2"
          >
            {isPending ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
