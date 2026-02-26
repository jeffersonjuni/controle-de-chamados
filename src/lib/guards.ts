import { redirect } from "next/navigation";
import { getAuthSession } from "./auth/auth";
import { Role } from "@prisma/client";

export async function requireAdmin() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== Role.ADMIN) {
    redirect("/");
  }

  return session;
}