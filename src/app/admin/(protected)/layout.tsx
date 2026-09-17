import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../../lib/auth";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminMobileNav from "../../../components/admin/AdminMobileNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-offwhite">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader email={session.user.email} />
        <AdminMobileNav />
        <main className="flex-1 px-6 py-8 sm:px-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}