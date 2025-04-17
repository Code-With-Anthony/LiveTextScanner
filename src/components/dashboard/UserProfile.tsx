import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Wallet,
  CreditCard,
  PencilLine,
  LifeBuoy,
  LogOut,
  UserX,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

export default function UserProfile() {
  const { user, updateProfile, signOut } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [scansUsed, setScansUsed] = useState<number>(0);
  const [scansLeft, setScansLeft] = useState<number>(0);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
    },
  });

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

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    try {
      await updateProfile({
        first_name: data.first_name,
        last_name: data.last_name,
      });
      setProfile({
        ...profile!,
        first_name: data.first_name,
        last_name: data.last_name,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    try {
      setIsDeleting(true);

      // In a real app, we would implement the actual account deletion logic here
      // This would typically involve:
      // 1. Deleting user data from all tables
      // 2. Cancelling active subscriptions
      // 3. Finally deleting the auth account

      // For this demo, we'll just sign out
      await signOut();
      navigate("/");

      toast.success("Account Deleted", {
        description: "Your account has been successfully deleted",
      });
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Error", {
        description: "Failed to delete your account",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  const firstNamePlaceholder = user?.user_metadata?.full_name?.split(" ")[0];
  const lastNamePlaceholder = user?.user_metadata?.full_name?.split(" ")[1];

  console.log("subscription: ", subscription);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Profile Settings</CardTitle>
          <CardDescription>
            Manage your account information and settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={firstNamePlaceholder}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={lastNamePlaceholder}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 pt-2">
                    <div className="text-sm text-muted-foreground">
                      Email: {user?.email}
                    </div>
                    <Button type="submit">
                      <PencilLine className="h-4 w-4 mr-2" />
                      Update Profile
                    </Button>
                  </div>
                </form>
              </Form>

              <div className="pt-4">
                <h3 className="text-lg font-medium mb-4">Subscription</h3>
                {subscription ? (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center">
                          <span className="text-lg font-medium">
                            {subscription.plan_name} Plan
                          </span>
                          <span
                            className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                              subscription.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {subscription.status.charAt(0).toUpperCase() +
                              subscription.status.slice(1)}
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          Monthly limit:{" "}
                          {subscription.scan_limit.toLocaleString()} scans
                          {" • "}${subscription.price}/month
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {/* Monthly limit:{" "}
                          {subscription.scan_limit.toLocaleString()} scans
                          {" • "} */}
                          Used: {scansUsed} scans
                          {" • "}
                          Left: {scansLeft} scans
                        </div>

                        <div className="mt-1 text-sm text-muted-foreground">
                          Expires:{" "}
                          {new Date(
                            subscription.expires_at
                          ).toLocaleDateString()}
                        </div>
                      </div>
                      <Button variant="outline">
                        <Wallet className="h-4 w-4 mr-2" />
                        Manage Subscription
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground mb-4">
                      You don't have an active subscription
                    </p>
                    <Button>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Choose a Plan
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-center justify-between border-t p-6 gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              <LifeBuoy className="h-4 w-4 mr-2" />
              Help & Support
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-full sm:w-auto">
                <UserX className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm mt-2">
                Warning: All your data including scan history and subscription
                information will be lost.
              </div>
              <DialogFooter className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => setDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete Account"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
