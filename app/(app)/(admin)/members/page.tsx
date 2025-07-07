import { MembersTable, Member } from "@/app/(app)/(admin)/members/components/members-table";
import { AddMemberDialog } from "@/app/(app)/(admin)/members/components/add-member-dialog";
import { getMembers } from "@/lib/utils/dataFunctions/bd-management";

export default async function MembersPage() {
  const members: Member[] = await getMembers();
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Membros da clínica</h1>
        <AddMemberDialog />
      </div>
      <MembersTable members={members} />
    </div>
  );
}
