"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateMember } from "@/app/(app)/(admin)/members/actions";
import type { Member } from "@/app/(app)/(admin)/members/components/members-table";

const formSchema = z.object({
  id: z.string(),
  email: z.string().email({
    message: "Por favor, insira um endereço de email válido.",
  }),
  role: z.enum(["owner", "manager", "member"], {
    required_error: "Por favor, selecione um cargo.",
  }),
});

interface EditMemberDialogProps {
  member: Member;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMemberUpdated: (member: Member) => void;
}

export function EditMemberDialog({
  member,
  open,
  onOpenChange,
  onMemberUpdated,
}: EditMemberDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: member.id,
      email: member.email,
      role: member.role,
    },
  });

  // Reset form values when member changes
  useEffect(() => {
    if (member) {
      form.reset({
        id: member.id,
        email: member.email,
        role: member.role,
      });
    }
  }, [member, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const updatedMember = await updateMember(values);
      onMemberUpdated({
        ...updatedMember,
        createdAt: member.createdAt, // Preserve the original creation date
      });
    } catch (error) {
      console.error("Erro ao atualizar membro:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Membro</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="manager">Gerente</SelectItem>
                      <SelectItem value="member">Membro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end pt-2">
              <Button type="submit">Salvar Alterações</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
