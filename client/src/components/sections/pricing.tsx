import { Check } from 'lucide-react';
import WaitlistForm from '@/components/waitlist-form';
import { pricing } from '@/content/brand';
import { Masthead } from "@/components/editorial/masthead";
import { Hairline } from "@/components/editorial/hairline";

const formatMoney = (amount: number) =>
  amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const formatMonthly = (amount: number) =>
  amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Pricing() {
  return (
    <section 
      id="pricing"
      className="py-20 scroll-mt-28"
      aria-label="Pricing plans and subscription options"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Masthead
          kicker="PRICING"
          stamp="CHAPTER 04"
          title={
            <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.08]">
              {pricing.title}
            </h2>
          }
          subtitle={pricing.subtitle}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pricing.plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card transition-colors ${
                plan.popular ? "border-copper-500/70" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute right-4 top-4 rounded-full border border-copper-500/60 bg-background px-3 py-1 text-xs font-semibold tracking-[0.18em] text-paper-secondary">
                  MOST POPULAR
                </div>
              )}
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-secondary">
                    {plan.billingIntervalMonths === 1
                      ? "Monthly"
                      : plan.billingIntervalMonths === 12
                        ? "Yearly"
                        : `Every ${plan.billingIntervalMonths} months`}
                  </p>
                  <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold tracking-[0.18em] text-paper-secondary">
                    PLAN
                  </span>
                </div>

                <Hairline className="my-5 opacity-70" />

                <h3 className="font-serif text-2xl font-semibold tracking-[-0.02em] text-paper">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-paper-secondary">{plan.description}</p>

                <div className="mt-6 flex items-end gap-2">
                  <span className="tabular-nums text-5xl font-semibold tracking-tight text-paper">
                    ${formatMoney(plan.price)}
                  </span>
                  <span className="pb-1 text-sm text-paper-secondary">
                    {plan.billingIntervalMonths === 1
                      ? "/mo"
                      : plan.billingIntervalMonths === 12
                        ? "/yr"
                        : `/${plan.billingIntervalMonths} mo`}
                  </span>
                </div>

                <p className="mt-2 text-xs text-paper-muted">
                  {plan.billingIntervalMonths === 1
                    ? "Billed monthly."
                    : plan.billingIntervalMonths === 12
                      ? "Billed yearly."
                      : `Billed every ${plan.billingIntervalMonths} months.`}
                  {plan.billingIntervalMonths > 1 && (
                    <>
                      {" "}
                      <span className="tabular-nums">
                        (≈ ${formatMonthly(plan.price / plan.billingIntervalMonths)}/mo)
                      </span>
                    </>
                  )}
                </p>

                <Hairline className="my-6 opacity-70" />

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 text-sm text-paper-secondary">
                      <Check className="mt-0.5 h-4 w-4 text-midnight-300" aria-hidden="true" strokeWidth={1.75} />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <WaitlistForm
                    label="Join waitlist"
                    planId={plan.id}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3 text-sm text-paper-secondary">
          <Check className="h-4 w-4 text-copper-500" aria-hidden="true" strokeWidth={1.75} />
          <span>30-day money-back guarantee for all plans.</span>
        </div>
      </div>
    </section>
  );
}
