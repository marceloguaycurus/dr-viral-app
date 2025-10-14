import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ToastProvider, RouterToastListener } from "@/components/shared/toast";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boilerplate NextJS",
  description: "Boilerplate NextJS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geist.className} font-sans antialiased overflow-y-scroll`}>
        <ToastProvider>
          <RouterToastListener />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
