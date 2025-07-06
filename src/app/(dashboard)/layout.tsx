import React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { DashboardProvider } from "@/context/DashboardContext";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ConfigurationBar } from "@/components/layout/ConfigurationBar"; // Import the actual component

import { LayoutDashboard, ShieldCheck, DollarSign, BarChart3, Briefcase } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/compliance", label: "Compliance", icon: ShieldCheck },
  { href: "/tco-analysis", label: "TCO Analysis", icon: DollarSign },
  { href: "/vendor-comparison", label: "Vendor Comparison", icon: BarChart3 },
  { href: "/portnox", label: "Portnox Platform", icon: Briefcase },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "flex flex-col min-h-screen bg-gray-950 text-slate-100")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <DashboardProvider>
              <div className="flex flex-1 h-screen overflow-hidden">
                {/* Sidebar Navigation */}
                <aside className="w-60 p-4 space-y-4 sticky top-0 h-full overflow-y-auto flex-shrink-0
                                 bg-slate-900/80 dark:bg-gray-950/80 backdrop-blur-xl border-r border-slate-700/50 dark:border-gray-800/50
                                 shadow-2xl">
                  <div className="text-3xl font-extrabold text-center py-5 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                    ZTCA
                  </div>
                  <nav className="flex flex-col space-y-1.5">
                    {navItems.map((item) => (
                      <Link
                        key={item.label}
                        href={`/(dashboard)${item.href}`}
                        className={cn(
                          "flex items-center px-3 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 ease-in-out group",
                          "text-slate-400 hover:text-white hover:bg-slate-700/60 dark:text-gray-400 dark:hover:text-slate-100 dark:hover:bg-gray-800/70",
                          // TODO: Add active state styling here using usePathname from next/navigation
                          // Example: pathname === `/(dashboard)${item.href}` ? "bg-slate-700/80 text-white" : ""
                        )}
                      >
                        <item.icon className="w-5 h-5 mr-3 flex-shrink-0 text-slate-500 group-hover:text-cyan-400 transition-colors duration-200" />
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </aside>

                {/* Main Content Area with its own scroll */}
                <div className="flex-1 flex flex-col overflow-y-auto">
                  {/* Configuration Bar - Sticky at the top of this scrolling div */}
                  <ConfigurationBar />

                  <main className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-gray-950 to-black">
                    {/* Content for each page will be rendered here */}
                    {children}
                  </main>
                </div>
              </div>
            </DashboardProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
