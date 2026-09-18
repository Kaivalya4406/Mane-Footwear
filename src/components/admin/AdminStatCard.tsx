type AdminStatCardProps = {
  label: string;
  value: number;
  icon: React.ReactNode;
};

export default function AdminStatCard({ label, value, icon }: AdminStatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-light bg-white p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-navy">{value}</p>
        <p className="text-sm text-foreground/70">{label}</p>
      </div>
    </div>
  );
}