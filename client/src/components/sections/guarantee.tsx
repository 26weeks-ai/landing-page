import { motion } from 'framer-motion';
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
      className="py-20 bg-neutral-900"
      aria-label="Money-back guarantee and trust indicators"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="bg-neutral-800 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full filter blur-3xl opacity-10" />
            
            <div className="relative z-10 text-center">
              <motion.div 
                className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-8"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Check className="w-10 h-10 text-orange-500" aria-hidden="true" />
              </motion.div>
              
              <h2 className="text-4xl font-bold text-white mb-6">
                100% Money-Back Guarantee
              </h2>
              
              <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
                If you're not satisfied with your progress within the first 30 days,
                we'll refund every penny. No questions asked.
              </p>
              
              <WaitlistForm />
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {trustPoints.map((point, index) => (
              <motion.div 
                key={index}
                className="bg-neutral-800 rounded-xl p-6 text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <point.icon className="w-8 h-8 text-blue-500" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{point.title}</h3>
                <p className="text-neutral-400">{point.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
