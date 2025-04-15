import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Basic text scanning for occasional use",
      features: [
        "10 scans per day",
        "Basic text recognition",
        "Export to clipboard",
        "Mobile & desktop access",
        "Standard support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$12",
      period: "/month",
      description: "Advanced features for regular users",
      features: [
        "Unlimited scans",
        "High precision recognition",
        "Export to PDF, Word, Excel",
        "Cloud synchronization",
        "Multi-language support",
        "Priority support",
      ],
      cta: "Start 7-day Trial",
      popular: true,
    },
    {
      name: "Business",
      price: "$39",
      period: "/month",
      description: "Complete solution for teams and businesses",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "API access",
        "Batch processing",
        "Advanced formatting",
        "Custom integrations",
        "Dedicated support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Choose Your Plan
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Simple, transparent pricing that grows with your needs.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 pt-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl border ${
                plan.popular ? "border-primary shadow-lg" : "border-border"
              } bg-card p-6 relative flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs py-1 px-3 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="ml-1 text-muted-foreground">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>
              <ul className="mb-6 space-y-2 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${plan.popular ? "btn-shine" : ""}`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include a 7-day free trial. No credit card required to
            start.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
