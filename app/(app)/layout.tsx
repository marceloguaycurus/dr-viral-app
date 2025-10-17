// app/(app)/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/navbar/app-sidebar";
import { getUserData } from "@/lib/utils/dataFunctions/bd-management";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const userData = await getUserData();
  return (
    <SidebarProvider>
      <AppSidebar userData={userData} />
      <main className="min-h-screen bg-background w-full">{children}</main>
    </SidebarProvider>
  );
}
