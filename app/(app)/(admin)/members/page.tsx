import { getMembers } from "@/lib/utils/dataFunctions/bd-management";
import { getUserData } from "@/lib/utils/dataFunctions/bd-management";
import { OrganizationMember } from "@prisma/client";

export default async function MembersPage() {
  const userData = await getUserData();
  const companyId = userData?.activeCompanyId;
  if (!companyId) {
    return <div>Nenhuma empresa selecionada</div>;
  }
  const members: OrganizationMember[] = await getMembers(companyId);
  if (!members) {
    return <div>Nenhum membro encontrado</div>;
  }
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Membros da Empresa</h1>
      </div>
    </div>
  );
}
