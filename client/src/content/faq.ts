export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: "Do I need any running experience to start?",
    answer:
      "No prior running experience is needed. 26weeks.ai starts from your current fitness level and gradually builds endurance, helping complete beginners finish a marathon safely.",
  },
  {
    question: "How does the AI personalization work?",
    answer:
      "Our AI analyzes daily performance data, recovery patterns, wearable inputs, and perceived effort to continuously adjust workouts, intensities, and mileage so every week fits your body.",
  },
  {
    question: "What if I miss a training day?",
    answer:
      "The coach automatically redistributes workouts and modifies intensities when you miss sessions, keeping you on track for race day while preventing overtraining.",
  },
  {
    question: "Can I use my existing fitness devices?",
    answer:
      "Yes. We integrate with Garmin, Fitbit, Apple Watch, Strava, and more so your activity data syncs automatically for the most accurate coaching.",
  },
  {
    question: "What support do I get if I struggle?",
    answer:
      "All plans include access to the runner community, AI chat support, and guided resources. Pro and Elite tiers unlock priority human coaching for deeper help.",
  },
  {
    question: "How does the money-back guarantee work?",
    answer:
      "If you’re not satisfied within the first 30 days, email support@26weeks.ai and we’ll issue a full refund—no hoops or hidden clauses.",
  },
  {
    question: "Will the training fit around my busy schedule?",
    answer:
      "Absolutely. Tell the AI when you prefer to train and it creates flexible blocks that still hit the key physiological targets required for marathon success.",
  },
  {
    question: "What happens if I get injured?",
    answer:
      "Training load monitors flag risk early, and if you report pain the AI shifts you into recovery protocols with cross-training suggestions. Always consult a medical professional for serious injuries.",
  },
];
