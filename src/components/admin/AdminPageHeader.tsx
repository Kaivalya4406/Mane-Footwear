export default function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold text-navy sm:text-2xl">{title}</h2>
        {description && <p className="mt-1 text-sm text-foreground/70">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}