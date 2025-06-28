"use client";

import { useState, useActionState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updatePasswordAction } from "./actions";
import { useToast } from "@/components/shared/toast";
import errorTranslation from "@/lib/utils/supabase/error-transtaltion";

export default function ProfilePage() {
  const [formValues, setFormValues] = useState({ newPassword: "", confirmNewPassword: "" });

  const [error, formAction, isPending] = useActionState(updatePasswordAction, null);
  const pushToast = useToast();

  useEffect(() => {
    if (!error) return;
    pushToast({ kind: "error", code: "update-password-error", override: errorTranslation(error) });
  }, [error, pushToast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (isPending) return;
    if (!error) {
      // Success – clear fields and show toast
      setFormValues({ newPassword: "", confirmNewPassword: "" });
      pushToast({
        kind: "success",
        code: "password-updated",
      });
    }
  }, [isPending, error, pushToast]);

  return (
    <div className="container mx-auto mt-8 max-w-md">
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
                value={formValues.newPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword">Confirme a nova senha</Label>
              <Input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                value={formValues.confirmNewPassword}
                onChange={handleInputChange}
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
