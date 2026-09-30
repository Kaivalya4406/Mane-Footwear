import { headers } from "next/headers";
import { auth } from "./auth";

export async function requireAdminSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.id !== process.env.ADMIN_USER_ID) {
    return null;
  }

  return session;
}