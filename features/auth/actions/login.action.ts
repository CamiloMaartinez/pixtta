"use server";

import { redirect } from "next/navigation";
import { signInWithPassword } from "@/features/auth/services/auth.service";

export async function loginAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const result = await signInWithPassword(email, password);

  if (!result.success) {
    redirect(`/admin/login?error=${encodeURIComponent(result.error)}`);
  }

  redirect("/admin");
}
