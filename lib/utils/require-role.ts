import { notFound } from "next/navigation";
import prisma from "./prisma";
import { getSelectedCompanyId } from "@/lib/utils/company-cookie-actions";
import { getUserData } from "@/lib/utils/dataFunctions/bd-management";

export async function requireRole() {
  const companyId = await getSelectedCompanyId();
  const userData = await getUserData();

  if (companyId) {
    const company = await prisma.organizationMember.findUnique({
      where: {
        orgId_userId: {
          orgId: companyId,
          userId: userData?.userId ?? "",
        },
      },
    });
    if (!company || !company.role.includes("owner") || !company.role.includes("admin")) {
      notFound();
    }
    return company;
  }
}
