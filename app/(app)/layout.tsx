// app/(app)/layout.tsx
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/navbar/app-sidebar";
import { ChildHeader } from "@/components/shared/child-header";
import { getUserData } from "@/lib/utils/dataFunctions/bd-management";
import { ClinicProvider } from "@/context/clinic-context";
import { getClinicServer } from "@/lib/utils/selected-clinic-cookie";
import { cookies } from "next/headers";

const defaultBreadcrumb = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Template", href: "/template" },
];

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const userData = await getUserData();
  const initialClinic = await getClinicServer(await cookies());

  return (
    <ClinicProvider initialClinic={initialClinic}>
      <SidebarProvider>
        <AppSidebar userData={userData} />
        <SidebarInset>
          <main>
            <ChildHeader breadcrumb={defaultBreadcrumb} />
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ClinicProvider>
  );
}
