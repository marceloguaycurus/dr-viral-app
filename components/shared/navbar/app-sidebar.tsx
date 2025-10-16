import { NavMain } from "@/components/shared/navbar/nav-main";
import { getSelectedCompanyId } from "@/lib/utils/company-cookie-actions";
import { SidebarLogo } from "@/components/shared/navbar/sidebar-logo";
import { TeamSwitcher } from "@/components/shared/navbar/team-switcher";
import { NavUser } from "@/components/shared/navbar/nav-user";
import { UserData } from "@/lib/types/UserTypes";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarSeparator } from "@/components/ui/sidebar";
import { getCompanies, getSelectedCompanyRole } from "@/lib/utils/dataFunctions/bd-management";
import { Organization } from "@prisma/client";

export async function AppSidebar({ userData, ...props }: React.ComponentProps<typeof Sidebar> & { userData: UserData }) {
  const activeCompanyId = await getSelectedCompanyId();
  const companies: Organization[] = await getCompanies(userData.userId);
  const activeCompanyRole = await getSelectedCompanyRole(activeCompanyId ?? "", userData.userId);
  const allowed = activeCompanyId && ["owner", "admin"].includes(activeCompanyRole ?? "");

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
