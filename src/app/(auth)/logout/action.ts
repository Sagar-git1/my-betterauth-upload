"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function logout() {
  const reqHeaders = await headers();

  await auth.api.signOut({
    headers: reqHeaders,
  });

  redirect("/login");
}
