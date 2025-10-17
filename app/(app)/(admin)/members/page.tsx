import { getUserData } from "@/lib/utils/dataFunctions/bd-management";

export default async function MembersPage() {
  const userData = await getUserData();
  const companyId = userData?.activeCompanyId;
  if (!companyId) {
    return <div>Nenhuma empresa selecionada</div>;
  }
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Membros da Empresa</h1>
      </div>
    </div>
  );
}
