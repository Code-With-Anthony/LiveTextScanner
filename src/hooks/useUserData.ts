import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

type Profile = {
  first_name: string;
  last_name: string;
  avatar_url: string;
};

type Subscription = {
  plan_name: string;
  status: string;
  scan_limit: number;
  price: number;
  expires_at: string;
};

export const useUserData = (user: { id: string } | null) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [scansUsed, setScansUsed] = useState(0);
  const [scansLeft, setScansLeft] = useState(0);

  const form = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
    },
  });

  const fetchUserData = async () => {
    if (!user) return;
    try {
      setLoading(true);

      // Profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("first_name, last_name, avatar_url")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;

      // Subscription
      const { data: subscriptionData, error: subscriptionError } =
        await supabase
          .from("user_subscriptions")
          .select(
            `status, starts_at, expires_at,
            subscription_plans(name, price, scan_limit)`
          )
          .eq("user_id", user.id)
          .eq("status", "active")
          .single();

      if (subscriptionError && subscriptionError.code !== "PGRST116") {
        throw subscriptionError;
      }

      // Scan Count
      const { count: scanCount, error: scanCountError } = await supabase
        .from("scan_history")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("created_at", subscriptionData?.starts_at || "");

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

  useEffect(() => {
    fetchUserData();
  }, [user]);

  return {
    loading,
    profile,
    subscription,
    scansUsed,
    scansLeft,
    refetch: fetchUserData,
    form,
  };
};
