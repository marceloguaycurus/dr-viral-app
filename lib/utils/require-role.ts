import { notFound } from "next/navigation";
import prisma from "./prisma";
import { getUserData } from "@/lib/utils/dataFunctions/bd-management";

export async function requireRole() {
  const userData = await getUserData();
  const companyId = userData?.activeCompanyId;

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
