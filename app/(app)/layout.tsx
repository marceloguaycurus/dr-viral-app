// app/(app)/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/navbar/app-sidebar";
import { ChildHeader } from "@/components/shared/child-header";
import { getUserData } from "@/lib/utils/dataFunctions/bd-management";
import { ClinicProvider } from "@/context/clinic-context";
import { getClinicServer } from "@/lib/utils/selected-clinic-cookie";
import { cookies } from "next/headers";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUserData();
  const initialClinic = await getClinicServer(await cookies());

  return (
    <ClinicProvider initialClinic={initialClinic}>
      <div className="flex h-screen flex-col">
        <SidebarProvider>
          <AppSidebar userData={userData} />
          <main className="flex flex-1 flex-col">
            <ChildHeader />
            {children}
          </main>
        </SidebarProvider>
      </div>
    </ClinicProvider>
  );
}
