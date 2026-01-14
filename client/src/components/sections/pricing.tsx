import { Check, Clock, Lock } from 'lucide-react';
import WaitlistForm from '@/components/waitlist-form';
import { pricing, trustPoints } from '@/content/brand';
import { Masthead } from "@/components/editorial/masthead";
import { Hairline } from "@/components/editorial/hairline";

const formatMoney = (amount: number) =>
  amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const formatMonthly = (amount: number) =>
  amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const trustPointIcons = {
  "2-Week Free Trial": Clock,
  "No Contract": Check,
  "Secure Payment": Lock,
} as const;

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
          stamp="CHAPTER 03"
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
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-secondary">
                    {plan.billingIntervalMonths === 0
                      ? "2-week trial"
                      : plan.billingIntervalMonths === 1
                        ? "Monthly"
                        : plan.billingIntervalMonths === 12
                          ? "Yearly"
                          : `Every ${plan.billingIntervalMonths} months`}
                  </p>
                  <span
                    className={`inline-flex h-8 items-center justify-center whitespace-nowrap rounded-full border bg-background px-3 text-xs font-semibold leading-none tracking-[0.18em] text-paper-secondary ${
                      plan.popular ? "border-copper-500/60" : "border-border"
                    }`}
                  >
                    {plan.billingIntervalMonths === 0
                      ? "TRY FREE PLAN"
                      : plan.popular
                        ? "MOST POPULAR"
                        : "PLAN"}
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
                    {plan.billingIntervalMonths === 0
                      ? "/2 wk"
                      : plan.billingIntervalMonths === 1
                        ? "/mo"
                        : plan.billingIntervalMonths === 12
                          ? "/yr"
                          : `/${plan.billingIntervalMonths} mo`}
                  </span>
                </div>

                <p className="mt-2 text-xs text-paper-muted">
                  {plan.billingIntervalMonths === 0
                    ? "Free for 2 weeks."
                    : plan.billingIntervalMonths === 1
                      ? "Billed monthly."
                      : plan.billingIntervalMonths === 12
                        ? "Billed yearly."
                        : `Billed every ${plan.billingIntervalMonths} months.`}
                  {plan.billingIntervalMonths > 1 && plan.billingIntervalMonths !== 0 && (
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

                <div className="mt-auto pt-8">
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

        <div className="mt-10 rounded-3xl border border-border bg-card p-6 sm:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-secondary">
              Trust notes
            </p>
            <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold tracking-[0.18em] text-paper-secondary">
              DETAILS
            </span>
          </div>

          <Hairline className="my-5 opacity-70" />

          <div className="grid gap-6 sm:grid-cols-3">
            {trustPoints.map((point) => {
              const Icon = trustPointIcons[point.title as keyof typeof trustPointIcons] ?? Check;

              return (
                <div key={point.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                    <Icon className="h-5 w-5 text-midnight-300" aria-hidden="true" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-paper">{point.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-paper-secondary">{point.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
