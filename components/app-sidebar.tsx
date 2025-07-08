"use client"

import type * as React from "react"
import {
  Calculator,
  BarChart3,
  Building2,
  FileText,
  TrendingUp,
  Shield,
  Users,
  Zap,
  Target,
  Settings,
  Home,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Navigation data
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "TCO Analysis",
      url: "#",
      icon: Calculator,
      items: [
        {
          title: "Interactive Calculator",
          url: "#tco-calculator",
        },
        {
          title: "Cost Breakdown",
          url: "#cost-breakdown",
        },
        {
          title: "Savings Analysis",
          url: "#savings-analysis",
        },
      ],
    },
    {
      title: "Vendor Comparison",
      url: "#",
      icon: BarChart3,
      items: [
        {
          title: "Feature Matrix",
          url: "#feature-matrix",
        },
        {
          title: "Pricing Comparison",
          url: "#pricing-comparison",
        },
        {
          title: "Market Analysis",
          url: "#market-analysis",
        },
      ],
    },
    {
      title: "Industry Analysis",
      url: "#",
      icon: Building2,
      items: [
        {
          title: "Healthcare",
          url: "#healthcare",
        },
        {
          title: "Financial Services",
          url: "#financial",
        },
        {
          title: "Manufacturing",
          url: "#manufacturing",
        },
        {
          title: "Education",
          url: "#education",
        },
      ],
    },
    {
      title: "ROI Calculator",
      url: "#",
      icon: TrendingUp,
      items: [
        {
          title: "Investment Analysis",
          url: "#investment-analysis",
        },
        {
          title: "Payback Period",
          url: "#payback-period",
        },
        {
          title: "Risk Assessment",
          url: "#risk-assessment",
        },
      ],
    },
    {
      title: "Security Analysis",
      url: "#",
      icon: Shield,
      items: [
        {
          title: "Risk Assessment",
          url: "#security-risk",
        },
        {
          title: "Compliance Mapping",
          url: "#compliance",
        },
        {
          title: "Vulnerability Analysis",
          url: "#vulnerabilities",
        },
      ],
    },
    {
      title: "Migration Planning",
      url: "#",
      icon: Zap,
      items: [
        {
          title: "Migration Timeline",
          url: "#migration-timeline",
        },
        {
          title: "Implementation Plan",
          url: "#implementation",
        },
        {
          title: "Resource Planning",
          url: "#resources",
        },
      ],
    },
    {
      title: "Executive Reports",
      url: "#",
      icon: FileText,
      items: [
        {
          title: "Executive Summary",
          url: "#executive-summary",
        },
        {
          title: "Business Case",
          url: "#business-case",
        },
        {
          title: "Technical Analysis",
          url: "#technical-analysis",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#settings",
      icon: Settings,
    },
    {
      title: "Help & Support",
      url: "#help",
      icon: Users,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Target className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Portnox TCO Analyzer</span>
                  <span className="truncate text-xs">Network Access Control</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Analysis Tools</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      {item.items && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size="sm">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#profile">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Users className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">NAC Analyst</span>
                  <span className="truncate text-xs">Enterprise User</span>
                </div>
                <ChevronDown className="ml-auto size-4" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
