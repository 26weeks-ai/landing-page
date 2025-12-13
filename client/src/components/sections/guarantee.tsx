import { Check, Clock, Lock } from 'lucide-react';
import WaitlistForm from '@/components/waitlist-form';

const trustPoints = [
  {
    icon: Clock,
    title: "30-Day Trial",
    description: "Full access to all features for a complete experience"
  },
  {
    icon: Check,
    title: "No Contract",
    description: "Cancel anytime with no hidden fees"
  },
  {
    icon: Lock,
    title: "Secure Payment",
    description: "SSL encrypted checkout for your security"
  }
];

export default function Guarantee() {
  return (
    <section 
      id="guarantee"
      className="py-20 bg-neutral-900 scroll-mt-24"
      aria-label="Money-back guarantee and trust indicators"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div 
            className="bg-neutral-800 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1"
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full filter blur-3xl opacity-10" />
            
            <div className="relative z-10 text-center">
              <div 
                className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse"
              >
                <Check className="w-10 h-10 text-orange-500" aria-hidden="true" />
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-6">
                100% Money-Back Guarantee
              </h2>
              
              <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
                If you're not satisfied with your progress within the first 30 days,
                we'll refund every penny. No questions asked.
              </p>
              
              <WaitlistForm />
            </div>
          </div>

          <div 
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          >
            {trustPoints.map((point, index) => (
              <div 
                key={index}
                className="bg-neutral-800 rounded-xl p-6 text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30"
              >
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <point.icon className="w-8 h-8 text-blue-500" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{point.title}</h3>
                <p className="text-neutral-400">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
