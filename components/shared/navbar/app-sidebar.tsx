import { NavMain } from "@/components/shared/navbar/nav-main";
import { SidebarLogo } from "@/components/shared/navbar/sidebar-logo";
import { TeamSwitcher } from "@/components/shared/navbar/team-switcher";
import { NavUser } from "@/components/shared/navbar/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarSeparator } from "@/components/ui/sidebar";
import { getMembershipsWithOrganizations } from "@/lib/utils/dataFunctions/bd-management";
import type { UserData } from "@/lib/types/UserTypes";
import { Organization } from "@prisma/client";

export async function AppSidebar({ userData, ...props }: { userData: UserData | null } & React.ComponentProps<typeof Sidebar>) {
  if (!userData) return null;

  const memberships = await getMembershipsWithOrganizations(userData.userId);
  const companies: Organization[] = memberships.map((m) => m.organization);
  const activeCompanyId = userData.activeCompanyId;
  const activeCompanyRole = memberships.find((m) => m.orgId === activeCompanyId)?.role ?? null;
  const allowed = Boolean(activeCompanyId && ["owner", "admin"].includes(activeCompanyRole ?? ""));

  let AdminMenu = null;
  if (allowed) {
    const mod = await import("@/components/shared/navbar/nav-admin");
    AdminMenu = <mod.NavAdmin />;
  }

  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader>
        <SidebarLogo />
        <SidebarSeparator />
        <TeamSwitcher companyList={companies} activeCompanyId={activeCompanyId} activeCompanyRole={activeCompanyRole} />
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
