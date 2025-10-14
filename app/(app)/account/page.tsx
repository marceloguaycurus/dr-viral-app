"use client";

import { useState, useActionState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updatePasswordAction } from "./actions";
import { useToast } from "@/components/shared/toast";
import errorTranslation from "@/lib/utils/supabase/error-transtaltion";

export default function ProfilePage() {
  const [formValues, setFormValues] = useState({
    nome: "",
    email: "",
    telefone: "",
    bio: "",
    avatar: "",
  });

  const [passwordValues, setPasswordValues] = useState({ newPassword: "", confirmNewPassword: "" });

  const [error, formAction, isPending] = useActionState(updatePasswordAction, null);
  const pushToast = useToast();

  useEffect(() => {
    if (!error) return;
    pushToast({ kind: "error", code: "update-password-error", override: errorTranslation(error) });
  }, [error, pushToast]);

  useEffect(() => {
    if (isPending) return;
    if (!error) {
      // Success – clear fields and show toast
      setPasswordValues({ newPassword: "", confirmNewPassword: "" });
      pushToast({
        kind: "success",
        code: "password-updated",
      });
    }
  }, [isPending, error, pushToast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    console.log("Profile data:", formValues);
  };

  return (
    <div className="container mx-auto mt-8 max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
          <CardDescription>Gerencie suas informações pessoais e dados de contato.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={formValues.avatar} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <Button type="button" variant="outline" size="sm">
                  Alterar foto
                </Button>
                <p className="text-sm text-muted-foreground mt-1">JPG, PNG ou GIF. Máximo 2MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome completo</Label>
                <Input id="nome" name="nome" value={formValues.nome} onChange={handleInputChange} placeholder="Seu nome completo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" name="telefone" value={formValues.telefone} onChange={handleInputChange} placeholder="(11) 99999-9999" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Biografia</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formValues.bio}
                onChange={handleInputChange}
                placeholder="Conte um pouco sobre você..."
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Salvar alterações
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alterar senha</CardTitle>
          <CardDescription>Defina uma nova senha para sua conta.</CardDescription>
        </CardHeader>
        <form action={formAction} className="space-y-4">
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova senha</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordValues.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword">Confirme a nova senha</Label>
              <Input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                value={passwordValues.confirmNewPassword}
                onChange={handlePasswordChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
