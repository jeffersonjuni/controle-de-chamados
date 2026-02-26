import { requireAdmin } from "@/src/lib/guards";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div>
      <h1>Painel Administrativo</h1>
      {children}
    </div>
  );
}