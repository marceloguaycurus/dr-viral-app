import { NavMain } from "@/components/shared/navbar/nav-main";
import { getClinicServer } from "@/lib/utils/selected-clinic-cookie";
import { SidebarLogo } from "@/components/shared/navbar/sidebar-logo";
import { TeamSwitcher } from "@/components/shared/navbar/team-switcher";
import { NavUser } from "@/components/shared/navbar/nav-user";
import { UserData } from "@/lib/types/UserTypes";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export async function AppSidebar({
  userData,
  ...props
}: React.ComponentProps<typeof Sidebar> & { userData: UserData | null }) {
  const c = await cookies();
  const clinic = await getClinicServer(c);
  const allowed = clinic && ["owner", "admin"].includes(clinic.role ?? "");

  let AdminMenu = null;
  if (allowed) {
    const mod = await import("@/components/shared/navbar/nav-admin");
    AdminMenu = <mod.NavAdmin />;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
        <SidebarSeparator />
        <TeamSwitcher />
        <SidebarSeparator />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        {AdminMenu}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
