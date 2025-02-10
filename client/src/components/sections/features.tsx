import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Activity, Calendar, LineChart, 
  Heart, Utensils, Users, Shield
} from 'lucide-react';
import { useEffect, useState } from 'react';

const features = [
  {
    icon: Brain,
    title: "Personalized AI Plans",
    description: "Custom training plans that adapt to your progress and fitness level",
    bgClass: "bg-blue-100",
    iconClass: "text-blue-600"
  },
  {
    icon: Calendar,
    title: "Daily Check-ins",
    description: "Get real-time feedback and adjustments based on your performance",
    bgClass: "bg-orange-100",
    iconClass: "text-orange-500"
  },
  {
    icon: Activity,
    title: "Deep Integrations",
    description: "Seamlessly connects with your favorite fitness apps and devices",
    bgClass: "bg-green-100",
    iconClass: "text-green-500"
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description: "Visual insights and analytics to monitor your journey",
    bgClass: "bg-purple-100",
    iconClass: "text-purple-500"
  },
  {
    icon: Heart,
    title: "Injury Prevention",
    description: "Smart monitoring to keep you safe and healthy",
    bgClass: "bg-red-100",
    iconClass: "text-red-500"
  },
  {
    icon: Utensils,
    title: "Nutrition Guide",
    description: "Personalized meal plans and nutrition advice",
    bgClass: "bg-yellow-100",
    iconClass: "text-yellow-500"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with fellow runners and share experiences",
    bgClass: "bg-indigo-100",
    iconClass: "text-indigo-500"
  },
  {
    icon: Shield,
    title: "Money-Back Guarantee",
    description: "100% satisfaction guarantee or your money back",
    bgClass: "bg-teal-100",
    iconClass: "text-teal-500"
  }
];

const runningQuotes = [
  {
    quote: "The miracle isn't that I finished. The miracle is that I had the courage to start.",
    author: "John Bingham"
  },
  {
    quote: "Running is the greatest metaphor for life, because you get out of it what you put into it.",
    author: "Oprah Winfrey"
  },
  {
    quote: "I run because I can. When I get tired, I remember those who can't run, what they would give to have this simple gift I take for granted.",
    author: "Melissa Ragsdale"
  },
  {
    quote: "Pain is temporary. Quitting lasts forever.",
    author: "Lance Armstrong"
  },
  {
    quote: "The body achieves what the mind believes.",
    author: "Napoleon Hill"
  },
  {
    quote: "Run when you can, walk if you have to, crawl if you must; just never give up.",
    author: "Dean Karnazes"
  }
];

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
            Why Choose <span className="text-orange-500">26weeks.ai</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Cutting-edge AI technology combined with proven training methods to transform you into a marathon runner
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              variants={item}
            >
              <div className={`w-14 h-14 ${feature.bgClass} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-8 h-8 ${feature.iconClass}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </motion.div>
          ))}
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