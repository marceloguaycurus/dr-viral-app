"use server";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LoginHeader from "./components/login-header";
import AuthsTab from "./components/auths-tab";
import GoogleLogin from "./components/google-login";

export default async function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Card className="w-full">
          <LoginHeader />
          <CardContent>
            <AuthsTab />

            <div className="relative my-6">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                OU CONTINUE COM
              </span>
            </div>

            <GoogleLogin />
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          Ao continuar, você concorda com nossos <a href="#">Termos de Serviço</a> e <a href="#">Política de Privacidade</a>.
        </div>
      </div>
    </div>
  );
}
