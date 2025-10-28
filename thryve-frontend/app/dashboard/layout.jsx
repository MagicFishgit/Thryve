
"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { IconLoader2 } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page({children}) {
  const {status} = useSession();

  if (status === "loading") {
    return <IconLoader2 className="animate-spin mx-auto h-screen size-10 text-muted-foreground" />;
  }

  if(status === "unauthenticated"){
    redirect("/login");
  }


  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)"
        }
      }>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
