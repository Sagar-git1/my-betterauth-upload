"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

type LoginState = {
  error?: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    if (!result) {
      return { error: "Invalid email or password" };
    }
  } catch (err) {
    return { error: "Invalid email or password" };
  }

  redirect("/dashboard");
}
