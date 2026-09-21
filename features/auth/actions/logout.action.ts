"use server";

import { redirect } from "next/navigation";
import { signOut } from "@/features/auth/services/auth.service";

export async function logoutAction(): Promise<void> {
  await signOut();
  redirect("/admin/login");
}
