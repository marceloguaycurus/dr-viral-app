import { requireRole } from "@/lib/utils/require-role";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireRole();

  return <>{children}</>;
}
