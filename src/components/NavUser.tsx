"use client";

import {
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom"; // 👈 Import hooks

type Subscription = {
  plan_name: string;
  status: string;
  scan_limit: number;
  price: number;
  expires_at: string;
};

type Profile = {
  first_name: string;
  last_name: string;
  avatar_url: string | null;
};

const profileSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
});

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, signOut } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [scansUsed, setScansUsed] = useState<number>(0);
  const [scansLeft, setScansLeft] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
    },
  });
  console.log("user: ", user);

  // Extract initials for avatar fallback
  const getInitials = useMemo(() => {
    if (!user) return "U";
    return (
      user?.user_metadata?.first_name?.charAt(0).toUpperCase() +
      user?.user_metadata?.last_name?.charAt(0).toUpperCase()
    );
  }, [user]);

  const fullName = useMemo(() => {
    return (
      user?.user_metadata?.full_name ??
      `${user?.user_metadata?.first_name ?? ""} ${
        user?.user_metadata?.last_name ?? ""
      }`.trim()
    );
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("first_name, last_name, avatar_url")
        .eq("id", user!.id)
        .single();

      if (profileError) throw profileError;

      // Fetch subscription
      const { data: subscriptionData, error: subscriptionError } =
        await supabase
          .from("user_subscriptions")
          .select(
            `
          status,
          starts_at,
          expires_at,
          subscription_plans(
            name,
            price,
            scan_limit
          )
        `
          )
          .eq("user_id", user!.id)
          .eq("status", "active")
          .single();

      if (subscriptionError && subscriptionError.code !== "PGRST116") {
        // PGRST116 is the error code for "No rows returned"
        throw subscriptionError;
      }

      // fetch scan usage
      const { count: scanCount, error: scanCountError } = await supabase
        .from("scan_history")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id)
        .gte("created_at", subscriptionData?.starts_at); // or figure out period start

      if (scanCountError) {
        console.error("Failed to fetch scan usage:", scanCountError);
      }

      if (scanCount !== null && subscriptionData) {
        setScansUsed(scanCount);
        setScansLeft(
          subscriptionData.subscription_plans.scan_limit - scanCount
        );
      }

      if (profileData) {
        setProfile(profileData);
        form.reset({
          first_name: profileData.first_name || "",
          last_name: profileData.last_name || "",
        });
      }

      if (subscriptionData) {
        setSubscription({
          plan_name: subscriptionData.subscription_plans.name,
          status: subscriptionData.status,
          scan_limit: subscriptionData.subscription_plans.scan_limit,
          price: subscriptionData.subscription_plans.price,
          expires_at: subscriptionData.expires_at,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error", {
        description: "Failed to load your profile data",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (subPath: string) => () => {
    const basePath = location.pathname.startsWith("/dashboard")
      ? "/dashboard"
      : "";

    navigate(`${basePath}/${subPath}`);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage
                  src={user?.user_metadata?.avatar_url}
                  alt={getInitials}
                />
                <AvatarFallback className="rounded-lg">
                  {getInitials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{fullName}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={"user avatar"} alt={fullName} />
                  <AvatarFallback className="rounded-lg">
                    {getInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{fullName}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleNavigate("acount")}>
                <UserCircleIcon />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleNavigate("billing")}>
                <CreditCardIcon />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleNavigate("notifications")}>
                <BellIcon />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
