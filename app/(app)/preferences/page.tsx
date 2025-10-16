"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PreferencesPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/preferences/profile");
  }, [router]);

  return null;
}
