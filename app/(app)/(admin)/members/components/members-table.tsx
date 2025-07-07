"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { EditMemberDialog } from "@/app/(app)/(admin)/members/components/edit-member-dialog";
import { deleteMember } from "@/app/(app)/(admin)/members/actions";

export type Member = {
  id: string;
  email: string;
  role: "owner" | "manager" | "member";
  createdAt: Date;
};

type MembersTableProps = { members: Member[] };
export function MembersTable({ members: initialMembers }: MembersTableProps) {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [memberToEdit, setMemberToEdit] = useState<Member | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDeleteMember = async (id: string) => {
    try {
      await deleteMember(id);
      setMembers(members.filter((member) => member.id !== id));
    } catch (error) {
      console.error("Failed to delete member:", error);
    }
  };

  const handleEditClick = (member: Member) => {
    setMemberToEdit(member);
    setIsEditDialogOpen(true);
  };

  const handleMemberUpdated = (updatedMember: Member) => {
    setMembers(members.map((member) => (member.id === updatedMember.id ? updatedMember : member)));
    setIsEditDialogOpen(false);
    setMemberToEdit(null);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>
                {member.createdAt.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                {member.role !== "owner" && (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(member)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteMember(member.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {memberToEdit && (
        <EditMemberDialog
          member={memberToEdit}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onMemberUpdated={handleMemberUpdated}
        />
      )}
    </>
  );
}
