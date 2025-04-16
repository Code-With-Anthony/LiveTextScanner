import { useState, useEffect } from "react";
import { Check, CreditCard } from "lucide-react";
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
import { toast } from "sonner";

type Plan = {
  id: number;
  name: string;
  description: string;
  price: number;
  scan_limit: number;
  features: string[];
};

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPlanId, setCurrentPlanId] = useState<number | null>(null);

  useEffect(() => {
    fetchPlans();
    fetchCurrentPlan();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from("subscription_plans")
        .select("*")
        .eq("active", true)
        .order("price", { ascending: true });

      if (error) throw error;

      setPlans(
        data.map((plan) => ({
          ...plan,
          features: plan.features as string[],
        }))
      );
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Error", {
        description: "Failed to load subscription plans",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentPlan = async () => {
    try {
      const { data, error } = await supabase
        .from("user_subscriptions")
        .select("plan_id")
        .eq("status", "active")
        .single();

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        setCurrentPlanId(data.plan_id);
      }
    } catch (error) {
      console.error("Error fetching current plan:", error);
    }
  };

  const handleSubscribe = (planId: number) => {
    // In a real app, this would open a payment form or redirect to a payment processor
    toast.info("Payment Simulation", {
      description:
        "This is a placeholder for the payment process. In a real app, this would connect to a payment processor like Stripe.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Subscription Plans</CardTitle>
        <CardDescription>Choose the plan that's right for you</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`overflow-hidden ${
                  currentPlanId === plan.id ? "border-primary" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  {currentPlanId === plan.id && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs rounded-bl-md">
                      Current Plan
                    </div>
                  )}
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="mb-4">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <div className="text-sm mb-2">
                    <strong>{plan.scan_limit.toLocaleString()}</strong> scans
                    per month
                  </div>
                  <ul className="space-y-2 mt-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={currentPlanId === plan.id ? "outline" : "default"}
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={currentPlanId === plan.id}
                  >
                    {currentPlanId === plan.id ? (
                      "Current Plan"
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Subscribe
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
