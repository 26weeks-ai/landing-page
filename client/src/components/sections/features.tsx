import { motion } from 'framer-motion';
import { 
  Activity, Brain, Calendar, LineChart, 
  Heart, Utensils, Users, Shield
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "Personalized AI Plans",
    description: "Custom training plans that adapt to your progress and fitness level"
  },
  {
    icon: Calendar,
    title: "Daily Check-ins",
    description: "Get real-time feedback and adjustments based on your performance"
  },
  {
    icon: Activity,
    title: "Deep Integrations",
    description: "Seamlessly connects with your favorite fitness apps and devices"
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description: "Visual insights and analytics to monitor your journey"
  },
  {
    icon: Heart,
    title: "Injury Prevention",
    description: "Smart monitoring to keep you safe and healthy"
  },
  {
    icon: Utensils,
    title: "Nutrition Guide",
    description: "Personalized meal plans and nutrition advice"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with fellow runners and share experiences"
  },
  {
    icon: Shield,
    title: "Money-Back Guarantee",
    description: "100% satisfaction guarantee or your money back"
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
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}