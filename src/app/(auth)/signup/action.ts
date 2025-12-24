"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

type SignupState = {
  error?: string;
};

export async function signup(
  _prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password || !name) {
    return { error: "All fields are required" };
  }

  try {
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    if (!result) {
      return { error: "Signup failed. Please try again." };
    }
  } catch (err) {
    // ✅ Catch Better Auth errors safely
    return { error: "Email already exists or signup failed" };
  }

  redirect("/dashboard");
}
