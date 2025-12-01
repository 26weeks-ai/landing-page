import { Check } from 'lucide-react';
import { WAITLIST_FORM_URL } from '@/components/waitlist-form';
import { pricing } from '@/content/brand';

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
                <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 text-sm font-semibold">
                  POPULAR
                </div>
              )}
              <div className="p-8 flex-1 flex flex-col">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">{plan.name}</h3>
                  <div className="flex items-baseline mb-8">
                    <span className="text-5xl font-bold text-neutral-900">${plan.price}</span>
                    <span className="text-neutral-600 ml-2">/{plan.name.toLowerCase()}</span>
                  </div>
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
                  <a
                    href={WAITLIST_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full ${plan.popular ? 'bg-orange-500 hover:bg-orange-600' : 'bg-neutral-900 hover:bg-neutral-800'} 
                      text-white rounded-full py-3 font-semibold transition-colors duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 inline-flex items-center justify-center`}
                    aria-label={`Choose ${plan.name} plan for $${plan.price} and join waitlist`}
                  >
                    Choose {plan.name} & Join Waitlist
                  </a>
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
