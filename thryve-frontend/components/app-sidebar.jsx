"use client"

import * as React from "react"
import {
  IconArrowNarrowUp,
  IconCamera,
  IconCoins,
  IconFileAi,
  IconFileDescription,
  IconHelp,
  IconListDetails,
  IconPackage,
  IconSearch,
  IconSettings,
  IconFileAnalyticsFilled,
  IconDashboard,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "admin",
    email: "admin@orangeorange.co.za",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
    
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
    
      title: "Categories",
      url: "/dashboard/categories",
      icon: IconListDetails,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: IconPackage,
    },
    {
      title: "Sales",
      url: "/dashboard/sales",
      icon: IconCoins,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/dashboard/help",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "dashboard/search",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Today's Sales",
      url: "/dashboard/reports/today",
      icon: IconFileAnalyticsFilled,
    },
    {
      name: "Weekly Sales",
      url: "/dashboard/reports/weekly",
      icon: IconFileAnalyticsFilled,
    },
    {
      name: "Monthly Sales",
      url: "/dashboard/reports/monthly",
      icon: IconFileAnalyticsFilled,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <IconArrowNarrowUp color="#14b8a6" className="!size-5" />
                <span className="text-base font-semibold">Thryve</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
