import AdminLogoutButton from "./AdminLogoutButton";

export default function AdminHeader({ email }: { email: string }) {
  return (
    <header className="flex items-center justify-between border-b border-gray-light bg-white px-6 py-4 sm:px-8 lg:px-10">
      <div>
        <h1 className="text-sm font-semibold text-navy">MANE FOOTWEAR Admin</h1>
        <p className="text-xs text-foreground/60">{email}</p>
      </div>
      <AdminLogoutButton />
    </header>
  );
}