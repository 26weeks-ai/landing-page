import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Activity,
  LineChart,
  Timer,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { features, featuresList, runningQuotes } from '@/content/copy';

interface CustomIconProps {
  className?: string;
}

const ShieldCheck: React.FC<CustomIconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const InjuryPreventionIcon: React.FC<CustomIconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Footprint outline */}
    <path d="M8 7c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
    <path d="M12 16c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
    <path d="M16 7c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
    <path d="M6 9v7" />
    <path d="M14 9v7" />
    {/* Cushioning waves */}
    <path d="M4 12c2 0 4 1 4 1" />
    <path d="M12 12c2 0 4 1 4 1" />
    {/* Arch support */}
    <path d="M7 14c1.5-1 5-1 6.5 0" />
  </svg>
);

const NutritionIcon: React.FC<CustomIconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Plate outline */}
    <circle cx="12" cy="12" r="10" />
    {/* Dividing lines for food groups */}
    <path d="M12 2v20" />
    <path d="M2 12h20" />
    {/* Food items */}
    <path d="M7 7c0 0 2 1 2 2" /> {/* Vegetables */}
    <path d="M17 7l-2 2" /> {/* Protein */}
    <path d="M7 17c1-1 2-1 2-1" /> {/* Grains */}
    <path d="M17 17c-1-1-2-1-2-1" /> {/* Fruits */}
  </svg>
);

const CommunityIcon: React.FC<CustomIconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Central figure */}
    <circle cx="12" cy="8" r="3" />
    <path d="M12 11v4" />
    {/* Supporting figures */}
    <circle cx="6" cy="15" r="2" />
    <circle cx="18" cy="15" r="2" />
    <path d="M6 17v2" />
    <path d="M18 17v2" />
    {/* Connecting lines showing support */}
    <path d="M12 15c-2-2-8-1-8 3" />
    <path d="M12 15c2-2 8-1 8 3" />
    {/* Heart shape above to symbolize support */}
    <path d="M12 5c1-1 2-1 3 0 2 2 0 3-3 5-3-2-5-3-3-5 1-1 2-1 3 0" />
  </svg>
);

// Map Lucide icons and custom icons to features
const featureIcons = {
  "Personalized AI Plans": Brain,
  "Daily Check-ins": Timer,
  "Deep Integrations": Activity,
  "Progress Tracking": LineChart,
  "Injury Prevention": InjuryPreventionIcon,
  "Nutrition Guide": NutritionIcon,
  "Community Support": CommunityIcon,
  "Money-Back Guarantee": ShieldCheck,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Features() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % runningQuotes.length);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            {features.title}{' '}
            <span className="text-orange-500">{features.titleHighlight}</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            {features.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {featuresList.map((feature, index) => {
            const Icon = featureIcons[feature.title as keyof typeof featureIcons];

            return (
              <motion.div
                key={index}
                className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                variants={item}
              >
                <div className={`w-14 h-14 ${feature.bgClass} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${feature.iconClass}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Inspirational Quotes Section */}
        <div className="mt-20 max-w-4xl mx-auto text-center relative h-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuoteIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div>
                <p className="text-xl text-neutral-600 italic mb-2">
                  "{runningQuotes[currentQuoteIndex].quote}"
                </p>
                <p className="text-sm text-neutral-500">
                  — {runningQuotes[currentQuoteIndex].author}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}