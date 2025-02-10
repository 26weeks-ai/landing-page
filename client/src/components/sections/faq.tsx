import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need any running experience to start?",
    answer: "No prior running experience is needed! Our AI-powered program starts from your current fitness level and gradually builds your endurance. We've successfully trained complete beginners to finish marathons."
  },
  {
    question: "How does the AI personalization work?",
    answer: "Our AI analyzes your daily performance data, recovery patterns, and progress to continuously adjust your training plan. It considers factors like heart rate, pace, distance, and perceived effort to optimize your training schedule."
  },
  {
    question: "What if I miss a training day?",
    answer: "The AI automatically adjusts your training plan to accommodate missed sessions. It redistributes workouts and modifies intensities to keep you on track for your marathon goal without overtraining."
  },
  {
    question: "Can I use my existing fitness devices?",
    answer: "Yes! We integrate with popular fitness devices and apps including Garmin, Fitbit, Apple Watch, and Strava. Your data syncs automatically to provide the most accurate training adjustments."
  },
  {
    question: "What support do I get if I struggle?",
    answer: "You'll have access to our community of runners, dedicated support team, and AI-powered chat assistance. Pro and Elite plans include direct access to experienced running coaches."
  },
  {
    question: "How does the money-back guarantee work?",
    answer: "If you're not satisfied with your progress within the first 30 days, simply contact our support team and we'll process a full refund. No questions asked, no complicated procedures."
  },
  {
    question: "Will the training fit around my busy schedule?",
    answer: "Absolutely! The AI creates flexible training plans that adapt to your availability. You can set preferred training times and the system will optimize your schedule accordingly."
  },
  {
    question: "What happens if I get injured?",
    answer: "Our injury prevention system monitors your training load to minimize risk. If you do experience an injury, the AI adjusts your plan and provides recovery protocols. Medical advice should always be sought for serious injuries."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Everything you need to know about our AI-powered marathon training
          </p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold text-neutral-900">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
