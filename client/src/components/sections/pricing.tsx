import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import WaitlistForm from '@/components/waitlist-form';

const plans = [
  {
    name: "Basic",
    price: "49",
    description: "Perfect for beginners",
    features: [
      "Personalized Training Plan",
      "Basic Progress Tracking",
      "Email Support",
      "Access to Community",
    ]
  },
  {
    name: "Pro",
    price: "99",
    description: "Most Popular Choice",
    features: [
      "Everything in Basic",
      "Advanced Analytics",
      "Nutrition Planning",
      "Priority Support",
      "Live Chat Support",
      "Weekly Check-ins"
    ]
  },
  {
    name: "Elite",
    price: "199",
    description: "For serious runners",
    features: [
      "Everything in Pro",
      "1-on-1 Coaching",
      "Custom Race Strategy",
      "Video Analysis",
      "24/7 Support",
      "Recovery Planning"
    ]
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Choose the perfect plan for your marathon journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`bg-white rounded-2xl shadow-lg p-8 ${
                index === 1 ? 'border-2 border-orange-500' : 'border border-neutral-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ translateY: -10 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-neutral-600 mb-4">{plan.description}</p>
                <div className="text-4xl font-bold">
                  ${plan.price}
                  <span className="text-lg font-normal text-neutral-600">/mo</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-orange-500 mr-2" />
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <WaitlistForm />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
