import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider, RouterToastListener } from "@/components/shared/toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Secretária Dora",
  description: "Agente digital para gerenciamento de consultas em clínicas médicas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} font-sans antialiased`}>
        <ToastProvider>
          <RouterToastListener />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
