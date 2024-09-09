'use client';

import { useState } from "react";
import Sidebar from "@/components/dashboard/SideNav";
import Header from "@/components/dashboard/Header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <main className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 overflow-x-hidden overflow-y-auto  p-6">
          {children}
        </div>
      </div>
    </main>
  );
}
