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
      className="py-20 bg-white scroll-mt-24"
      aria-label="Pricing plans and subscription options"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            {pricing.title}
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            {pricing.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {pricing.plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 
                ${plan.popular ? 'border-orange-500' : 'border-neutral-100'} 
                overflow-hidden relative flex flex-col h-full`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-orange-500 text-neutral-950 px-4 py-1 text-sm font-semibold">
                  POPULAR
                </div>
              )}
              <div className="p-8 flex-1 flex flex-col">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">{plan.name}</h3>
                  <div className="flex items-baseline mb-8">
                    <span className="text-5xl font-bold text-neutral-900">${formatMoney(plan.price)}</span>
                    <span className="text-neutral-600 ml-2">
                      {plan.billingIntervalMonths === 1
                        ? "/month"
                        : plan.billingIntervalMonths === 12
                          ? "/year"
                          : `/${plan.billingIntervalMonths} months`}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 -mt-6 mb-8">
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
                      <li key={featureIndex} className="flex items-center text-neutral-700">
                        <Check className="w-5 h-5 text-green-500 mr-3" aria-hidden="true" />
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
          <p className="text-neutral-600 flex items-center justify-center">
            <Check className="w-5 h-5 text-green-500 mr-2" />
            30-day money-back guarantee for all plans
          </p>
        </div>
      </div>
    </section>
  );
}
