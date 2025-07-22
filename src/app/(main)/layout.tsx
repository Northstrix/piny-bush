"use client"

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Header />
      <main className="flex-1 pt-8">{children}</main>
      <Footer />
    </div>
  );
}
