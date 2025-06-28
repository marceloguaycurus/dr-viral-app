import { useActionState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, User, Lock } from "lucide-react";
import { AuthFormValues } from "@/lib/types/UserTypes";
import { signupAction } from "../actions";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/shared/toast";

type SignupTabProps = {
  formValues: AuthFormValues;
  setFormValues: (formValues: AuthFormValues) => void;
};

export default function SignupTab({ formValues, setFormValues }: SignupTabProps) {
  const [error, formAction, isPending] = useActionState(signupAction, null);
  const redirectTo = useSearchParams().get("redirectTo") || "/";
  const pushToast = useToast();

  useEffect(() => {
    if (!error) return;
    pushToast({ kind: "error", code: error, override: error });
  }, [error, pushToast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormValues = { ...formValues, [name]: value };
    setFormValues(newFormValues as AuthFormValues);
  };

  return (
    <TabsContent value="signup">
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-name">Nome Completo</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="signup-name"
              name="fullName"
              type="text"
              placeholder="Nome completo"
              className="pl-10"
              value={formValues.fullName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="signup-email"
              name="email"
              type="email"
              placeholder="name@example.com"
              className="pl-10"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-password">Senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="signup-password"
              name="password"
              type="password"
              className="pl-10"
              value={formValues.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirmar senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              className="pl-10"
              value={formValues.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <input type="hidden" name="isSignup" value="true" />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Criando conta..." : "Criar conta"}
        </Button>
      </form>
    </TabsContent>
  );
}
