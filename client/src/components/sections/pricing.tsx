import { Check } from 'lucide-react';
import WaitlistForm from '@/components/waitlist-form';
import { pricing } from '@/content/brand';

const formatMoney = (amount: number) =>
  amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const formatMonthly = (amount: number) =>
  amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Pricing() {
  return (
    <section 
      id="pricing"
      className="py-24 bg-background scroll-mt-24"
      aria-label="Pricing plans and subscription options"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-foreground mb-4">
            {pricing.title}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {pricing.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {pricing.plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-card rounded-3xl shadow-elev-2 hover:shadow-elev-3 transition-all duration-300 border overflow-hidden relative flex flex-col h-full
                ${plan.popular ? "border-ring/70" : "border-border"}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-ring text-primary-foreground px-4 py-1 text-sm font-semibold">
                  POPULAR
                </div>
              )}
              <div className="p-8 flex-1 flex flex-col">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">{plan.name}</h3>
                  <div className="flex items-baseline mb-8">
                    <span className="text-5xl font-semibold text-foreground">${formatMoney(plan.price)}</span>
                    <span className="text-muted-foreground ml-2">
                      {plan.billingIntervalMonths === 1
                        ? "/month"
                        : plan.billingIntervalMonths === 12
                          ? "/year"
                          : `/${plan.billingIntervalMonths} months`}
                    </span>
                  </div>
                  <p className="text-sm text-subtle -mt-6 mb-8">
                    {plan.billingIntervalMonths === 1
                      ? "Billed monthly"
                      : plan.billingIntervalMonths === 12
                        ? "Billed yearly"
                        : `Billed every ${plan.billingIntervalMonths} months`}
                    {plan.billingIntervalMonths > 1 && (
                      <>
                        {" · "}
                        ≈ ${formatMonthly(plan.price / plan.billingIntervalMonths)}/mo
                      </>
                    )}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-muted-foreground">
                        <Check className="w-5 h-5 text-chart-3 mr-3" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto">
                  <WaitlistForm
                    label="Join waitlist"
                    planId={plan.id}
                    className="w-full sm:w-full rounded-full py-3 text-sm shadow-none hover:scale-100 active:scale-100"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground flex items-center justify-center">
            <Check className="w-5 h-5 text-chart-3 mr-2" />
            30-day money-back guarantee for all plans
          </p>
        </div>
      </div>
    </section>
  );
}
