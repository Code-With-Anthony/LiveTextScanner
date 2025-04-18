import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import ThemeToggle from "./ThemeToggle";

export function SiteHeader() {
  const location = useLocation();
  const [content, setContent] = useState("Dashboard");

  useEffect(() => {
    const path = location.pathname;
    const pathArray = path.split("/");
    const lastPath = pathArray[pathArray.length - 1];

    switch (lastPath) {
      case "scan":
        setContent("Start Scanning");
        break;
      case "scan-history":
        setContent("Scanning History");
        break;
      case "account":
        setContent("Account");
        break;
      case "billing":
        setContent("Billing");
        break;
      case "notifications":
        setContent("Notifications");
        break;
      case "dashboard":
        setContent("Dashboard");
        break;
      default:
        setContent("Dashboard");
    }
  }, [location.pathname]);

  const { setTheme } = useTheme();

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{content}</h1>
        <ThemeToggle />
      </div>
    </header>
  );
}
