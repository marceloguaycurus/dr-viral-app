// app/(app)/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/navbar/app-sidebar";
import { getUserData } from "@/lib/utils/dataFunctions/bd-management";
import { ClinicProvider } from "@/context/clinic-context";
import { getClinicServer } from "@/lib/utils/selected-clinic-cookie";
import { cookies } from "next/headers";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const userData = await getUserData();
  const initialClinic = await getClinicServer(await cookies());

  return (
    <ClinicProvider initialClinic={initialClinic}>
      <SidebarProvider>
        <AppSidebar userData={userData} />
        <main className="min-h-screen bg-background w-full">{children}</main>
      </SidebarProvider>
    </ClinicProvider>
  );
}
