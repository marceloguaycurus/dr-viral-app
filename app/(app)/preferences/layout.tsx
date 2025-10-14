"use client";

import { PreferencesHeader } from "./components/preferences-header";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PreferencesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Redirect to perfil if on base preferences page
  useEffect(() => {
    if (pathname === "/preferences") {
      router.replace("/preferences/profile");
    }
  }, [pathname, router]);

  return (
    <>
      <PreferencesHeader />
      <div className="container mx-auto px-4 py-6 max-w-4xl">{children}</div>
    </>
  );
}
