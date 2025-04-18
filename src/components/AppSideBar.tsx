"use client";

import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  DollarSignIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import * as React from "react";

import { NavDocuments } from "@/components/NavDocuments";
import { NavMain } from "@/components/NavMain";
import { NavSecondary } from "@/components/NavSecondary";
import { NavUser } from "@/components/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useUserData } from "@/hooks/useUserData";
import { NavAI } from "./NavAI";

// Sidebar content for Free Plan
const sidebarContentFree = {
  navMain: [
    { title: "Dashboard", url: "", icon: LayoutDashboardIcon },
    { title: "Scan Now", url: "/scan", icon: CameraIcon },
    { title: "History", url: "/scan-history", icon: ClipboardListIcon },
  ],
  documents: [
    { name: "Reports", url: "/reports", icon: ClipboardListIcon },
    { name: "Subscriptions", url: "/subscription", icon: DollarSignIcon },
  ],
  ai: [
    { name: "Chat With Doc", url: "/reports", icon: ClipboardListIcon },
    { name: "Explore AI Models", url: "/subscription", icon: DollarSignIcon },
  ],
  navSecondary: [
    { title: "Settings", url: "/settings", icon: SettingsIcon },
    { title: "Get Help", url: "/help", icon: HelpCircleIcon },
  ],
};

// Sidebar content for Pro Plan
const sidebarContentPro = {
  navMain: [
    { title: "Dashboard", url: "/", icon: LayoutDashboardIcon },
    { title: "Scan Now", url: "/scan", icon: CameraIcon },
    { title: "History", url: "/scan-history", icon: ClipboardListIcon },
    { title: "Analytics", url: "/analytics", icon: BarChartIcon },
  ],
  documents: [
    { name: "Data Library", url: "/data-library", icon: DatabaseIcon },
    { name: "Reports", url: "/reports", icon: ClipboardListIcon },
  ],
  ai: [
    { name: "Chat With Doc", url: "/reports", icon: ClipboardListIcon },
    { name: "Explore AI Models", url: "/subscription", icon: DollarSignIcon },
  ],
  navSecondary: [
    { title: "Settings", url: "/settings", icon: SettingsIcon },
    { title: "Search", url: "/search", icon: SearchIcon },
    { title: "Get Help", url: "/help", icon: HelpCircleIcon },
  ],
};

// Sidebar content for Business Plan
const sidebarContentBusiness = {
  navMain: [
    { title: "Dashboard", url: "/", icon: LayoutDashboardIcon },
    { title: "Scan Now", url: "/scan", icon: CameraIcon },
    { title: "History", url: "/scan-history", icon: ClipboardListIcon },
    { title: "Analytics", url: "/analytics", icon: BarChartIcon },
    { title: "Projects", url: "/projects", icon: FolderIcon },
    { title: "Team", url: "/team", icon: UsersIcon },
  ],
  documents: [
    { name: "Data Library", url: "/data-library", icon: DatabaseIcon },
    { name: "Reports", url: "/reports", icon: ClipboardListIcon },
  ],
  ai: [
    { name: "Chat With Doc", url: "/reports", icon: ClipboardListIcon },
    { name: "Explore AI Models", url: "/subscription", icon: DollarSignIcon },
  ],

  navSecondary: [
    { title: "Settings", url: "/settings", icon: SettingsIcon },
    { title: "Search", url: "/search", icon: SearchIcon },
    { title: "Get Help", url: "/help", icon: HelpCircleIcon },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const { subscription } = useUserData(user);

  const plan = subscription?.plan_name ?? "Free";

  let content;
  switch (plan) {
    case "Business":
      content = sidebarContentBusiness;
      break;
    case "Pro":
      content = sidebarContentPro;
      break;
    case "Free":
    default:
      content = sidebarContentFree;
      break;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">
                  Text Peek Online
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={content.navMain} />
        <NavDocuments items={content.documents} />
        <NavAI items={content.ai} />
        <NavSecondary items={content.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
