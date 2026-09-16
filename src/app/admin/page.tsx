import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../lib/auth";
import AdminLogoutButton from "../../components/admin/AdminLogoutButton";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <section className="bg-offwhite">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
        <h1 className="text-2xl font-bold text-navy sm:text-3xl">MANE FOOTWEAR Admin</h1>
        <p className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
          You are signed in as{" "}
          <span className="font-medium text-navy">{session.user.email}</span>.
        </p>
                <p className="mt-6 text-xs text-foreground/60">
          The admin dashboard will be implemented in Phase 15.
        </p>

        <div className="mt-8">
          <AdminLogoutButton />
        </div>
      </div>
    </section>
  );
}