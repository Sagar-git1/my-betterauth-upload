"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Missing credentials");
  }

  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (!result) {
    throw new Error("Invalid email or password");
  }

  redirect("/dashboard");
}
