import Image from "next/image";
import { CardDescription, CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import Logo from "@/public/images/logo.png";

export default function LoginHeader() {
  return (
    <CardHeader className="space-y-1">
      <CardTitle className="flex justify-center mb-4">
        <Image src={Logo} alt="Logo" className="h-10 w-auto" />
      </CardTitle>

      <CardDescription className="text-center">
        Faça login ou cadastre-se para continuar
      </CardDescription>
    </CardHeader>
  );
}
