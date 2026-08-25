"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  BarChart2, 
  Info,
  Menu,
  X,
  Activity,
  Sun
} from "lucide-react";
import { checkHealth } from "@/lib/api";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState<"checking" | "online" | "offline">("checking");

  useEffect(() => {
    async function verifyHealth() {
      try {
        await checkHealth();
        setApiStatus("online");
      } catch (error) {
        setApiStatus("offline");
      }
    }
    verifyHealth();
  }, []);

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "New Assessment", href: "/dashboard/assessment", icon: PlusCircle },
    { name: "History", href: "/dashboard/history", icon: History },
    { name: "Model Analytics", href: "/dashboard/model", icon: BarChart2 },
    { name: "About Project", href: "/", icon: Info },
  ];

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Overview";
    const item = navigation.find(n => n.href === pathname);
    return item ? item.name : "Dashboard";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile sidebar backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-navy/80 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-navy text-white transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex h-16 shrink-0 items-center px-6 border-b border-navy-surface">
          <Activity className="h-6 w-6 text-primary mr-2" />
          <div>
            <div className="font-manrope font-bold text-lg leading-tight tracking-wide">HeartGuard AI</div>
            <div className="text-[10px] text-muted uppercase tracking-wider">Risk Intelligence Platform</div>
          </div>
        </div>
        
        <div className="flex flex-col h-[calc(100vh-4rem)]">
          <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors
                    ${isActive 
                      ? "bg-primary/10 text-primary border border-primary/20" 
                      : "text-slate-300 hover:bg-navy-surface hover:text-white"
                    }
                  `}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-300"}`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          {/* Project Identity */}
          <div className="p-6 border-t border-navy-surface mt-auto">
            <div className="text-xs text-slate-400">
              <p>Dataset: 1,024 Records</p>
              <p>Engine v1.0</p>
              <p className="mt-2 pt-2 border-t border-navy-surface/50 text-slate-500 font-medium">BILE Initiative — Group 3</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border-color bg-white px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button
              type="button"
              className="mr-4 text-slate-500 md:hidden hover:text-slate-700"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="text-sm text-slate-500 flex items-center space-x-2">
              <Link href="/dashboard" className="hover:text-slate-900 transition-colors">Dashboard</Link>
              <span>›</span>
              <span className="font-medium text-slate-900">{getPageTitle()}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* API Status Badge */}
            <div className={`
              inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
              ${apiStatus === "online" ? "bg-success/10 text-success border-success/20" : 
                apiStatus === "checking" ? "bg-slate-100 text-slate-500 border-slate-200" : 
                "bg-primary/10 text-primary border-primary/20"}
            `}>
              <span className={`mr-1.5 h-2 w-2 rounded-full ${
                apiStatus === "online" ? "bg-success" : 
                apiStatus === "checking" ? "bg-slate-400 animate-pulse" : 
                "bg-primary"
              }`}></span>
              {apiStatus === "online" ? "API: Model Online" : 
               apiStatus === "checking" ? "Checking API..." : 
               "API: Offline"}
            </div>
            
            {/* Theme Toggle (Visual only, simple implementation) */}
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Sun className="h-5 w-5" />
            </button>
            
            {/* Initials Avatar */}
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
              DR
            </div>
          </div>
        </header>

        {/* Main scrollable area */}
        <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
