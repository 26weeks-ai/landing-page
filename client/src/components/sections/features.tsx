import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Activity,
  LineChart,
  Timer,
  HeartPulse,
  Apple,
  Users,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { features, featuresList, runningQuotes } from "@/content/brand";

// Map Lucide icons to features
const featureIcons = {
  "Personalized & Adaptive": Brain,
  "Daily Check-ins": Timer,
  "Deep Integrations": Activity,
  "Progress Tracking": LineChart,
  "Injury Prevention": HeartPulse,
  "Nutrition Guide": Apple,
  "Community Support": Users,
  "Money-Back Guarantee": ShieldCheck,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Features() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % runningQuotes.length);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section 
      id="features"
      className="py-20 bg-white scroll-mt-24"
      aria-label="Key features and benefits of 26weeks.ai"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={prefersReducedMotion ? undefined : { once: true }}
        >
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            {features.title}{" "}
            <span className="text-orange-500">{features.titleHighlight}</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            {features.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "show"}
          viewport={prefersReducedMotion ? undefined : { once: true }}
        >
          {featuresList.map((feature, index) => {
            const Icon =
              featureIcons[feature.title as keyof typeof featureIcons];

            return (
              <motion.div
                key={index}
                className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                variants={item}
              >
                <div
                  className={`w-14 h-14 ${feature.bgClass} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-8 h-8 ${feature.iconClass}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Inspirational Quotes Section */}
        <div className="mt-20 max-w-4xl mx-auto text-center relative h-32">
          {prefersReducedMotion ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div>
                <p className="text-xl text-neutral-600 italic mb-2">
                  "{runningQuotes[currentQuoteIndex].quote}"
                </p>
                <p className="text-sm text-neutral-500">
                  — {runningQuotes[currentQuoteIndex].author}
                </p>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </section>
  );
}
