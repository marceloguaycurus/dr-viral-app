"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginTab from "./login-tab";
import SignupTab from "./signup-tab";
import { AuthFormValues } from "@/lib/types/UserTypes";
import { useState } from "react";

export default function AuthsTab() {
  const [formValues, setFormValues] = useState<AuthFormValues>({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
  });

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid grid-cols-2 mb-6 data-[orientation=horizontal]:w-full">
        <TabsTrigger value="login">Entrar</TabsTrigger>
        <TabsTrigger value="signup">Cadastro</TabsTrigger>
      </TabsList>

      <LoginTab formValues={formValues} setFormValues={setFormValues} />
      <SignupTab formValues={formValues} setFormValues={setFormValues} />
    </Tabs>
  );
}
