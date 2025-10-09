import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { useActionState, useEffect } from "react";
import { loginAction } from "@/app/(auth)/login/actions";
import { AuthFormValues } from "@/lib/types/UserTypes";
import errorTranslation from "@/lib/utils/supabase/error-transtaltion";
import { useToast } from "@/components/shared/toast";
import { createClient } from "@/lib/utils/supabase/client";

type LoginTabProps = {
  formValues: AuthFormValues;
  setFormValues: (formValues: AuthFormValues) => void;
  redirectTo: string;
};

// Define fallback SITE_URL just like server actions
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? (typeof window !== "undefined" ? window.location.origin : "");

// Function to request password reset link
async function requestPasswordReset(email: string) {
  const supabase = createClient();
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${SITE_URL}/confirm?next=/profile`,
  });
}

export default function LoginTab({ formValues, setFormValues, redirectTo }: LoginTabProps) {
  const [error, formAction, isPending] = useActionState(loginAction, null);

  const pushToast = useToast();

  useEffect(() => {
    if (!error) return;
    pushToast({ kind: "error", code: "invalid-credentials", override: errorTranslation(error) });
  }, [error, pushToast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormValues = { ...formValues, [name]: value };
    setFormValues(newFormValues as AuthFormValues);
  };

  async function handleForgotPassword(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault(); // Prevent form submission

    // Validate e-mail before requesting reset link
    if (!formValues.email) {
      pushToast({
        kind: "error",
        code: "missing-email",
      });
      return;
    }

    const { error } = await requestPasswordReset(formValues.email);

    if (error) {
      pushToast({
        kind: "error",
        code: "reset-password-error",
        override: errorTranslation(error.message),
      });
    } else {
      pushToast({
        kind: "success",
        code: "reset-link-sent",
      });
    }
  }

  return (
    <TabsContent value="login">
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email@exemplo.com"
              className="pl-10"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
            <Button variant="link" className="p-0 h-auto text-xs" type="button" onClick={handleForgotPassword}>
              Esqueceu sua senha?
            </Button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type="password"
              className="pl-10"
              value={formValues.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </TabsContent>
  );
}
