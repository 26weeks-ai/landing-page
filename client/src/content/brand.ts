export interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
  stars: number;
}

export const brandIdentity = {
  name: "26weeks.ai",
  tagline: "Your AI Marathon Coach",
  domain: "https://26weeks.ai",
  defaultOgImage: "https://26weeks.ai/og-image.svg",
  logo: "https://26weeks.ai/icon-corners.svg",
  contactEmail: "coach@26weeks.ai",
  links: {
    waitlist: "https://forms.gle/26weeksWaitlist",
    sitemap: "https://26weeks.ai/sitemap.xml",
  },
  social: {
    twitter: "https://x.com/26weeks_ai",
    instagram: "https://www.instagram.com/26weeks.ai/",
    linkedin: "https://www.linkedin.com/company/26weeks-ai/",
  },
};

export const seo = {
  home: {
    type: "website",
    title: "AI Marathon Training in 26 Weeks",
    description:
      "Train for 26.2 with an adaptive AI coach that syncs with your wearables, personalizes every workout, and keeps you healthy from day one to race day.",
    url: brandIdentity.domain,
    image: brandIdentity.defaultOgImage,
    tags: [
      "AI marathon coach",
      "adaptive training plan",
      "couch to marathon",
      "personalized running program",
    ],
    aiSummary: [
      "Hyper-personalized marathon plans that adapt every day using your biometrics and feedback.",
      "Integrated wearable data, nutrition nudges, and injury-prevention cues for confident training.",
      "Human-backed AI coaching that carries you from couch to marathon-ready in 26 weeks or less.",
    ],
  },
  blog: {
    type: "website",
    title: "Run Smarter – 26weeks.ai Blog",
    description:
      "Long-form breakdowns on AI coaching, marathon science, and runner stories from the 26weeks.ai team.",
    url: `${brandIdentity.domain}/blog`,
    image: brandIdentity.defaultOgImage,
    tags: ["marathon blog", "AI training insights", "running tips"],
    aiSummary: [
      "Weekly drops from the 26weeks.ai coaching lab covering training, recovery, and mindset.",
      "Data-backed lessons for AI-assisted running plans, wearable integrations, and race prep.",
    ],
  },
  privacy: {
    type: "website",
    title: "Privacy Policy",
    description:
      "Understand how 26weeks.ai collects, encrypts, and uses your training data to personalize marathon coaching.",
    url: `${brandIdentity.domain}/privacy`,
    image: brandIdentity.defaultOgImage,
    tags: ["privacy policy", "data protection", "runner data privacy"],
  },
  terms: {
    type: "website",
    title: "Terms of Service",
    description:
      "Review the subscription terms, user responsibilities, and refund policies that govern your 26weeks.ai marathon coaching membership.",
    url: `${brandIdentity.domain}/terms`,
    image: brandIdentity.defaultOgImage,
    tags: ["terms of service", "subscription terms", "runner agreement"],
  },
  cancellations: {
    type: "website",
    title: "Cancellations & Refunds",
    description:
      "See how the 30-day money-back guarantee and subscription cancellation process works for every 26weeks.ai plan.",
    url: `${brandIdentity.domain}/cancellations`,
    image: brandIdentity.defaultOgImage,
    tags: ["refund policy", "subscription cancellation", "money-back guarantee"],
  },
  notFound: {
    type: "website",
    title: "Page Missing",
    description: "The page you were looking for doesn't exist on 26weeks.ai.",
    url: `${brandIdentity.domain}/404`,
    image: brandIdentity.defaultOgImage,
    noIndex: true,
  },
} as const;

export const hero = {
  title: {
    prefix: "Couch to",
    highlight: "Marathon",
    suffix: "in",
    highlightNumber: "26",
    suffixWeeks: "weeks!",
  },
  subtitle:
    "Adaptive and Intelligent Coaching that tailors your training to your performance, recovery, and progress—turning your 26.2-mile dream into reality in 26 weeks or less.",
};

export const features = {
  title: "Why Choose",
  titleHighlight: "26weeks.ai",
  subtitle:
    "Cutting-edge AI technology combined with proven scientific training methods to transform you into a marathon runner",
};

export const featuresList = [
  {
    title: "Personalized & Adaptive",
    description:
      "Training plans that starts with your fitness level and dynamically adapt to you.",
    bgClass: "bg-blue-100",
    iconClass: "text-blue-600",
  },
  {
    title: "Daily Check-ins",
    description:
      "Get real-time feedback and adjustments based on your performance",
    bgClass: "bg-orange-100",
    iconClass: "text-orange-500",
  },
  {
    title: "Deep Integrations",
    description:
      "Seamlessly connects with your favorite fitness apps and devices (Apple Fitness, Garmin, Whoop, Strava, etc)",
    bgClass: "bg-green-100",
    iconClass: "text-green-500",
  },
  {
    title: "Progress Tracking",
    description: "Visual insights and analytics to monitor your journey",
    bgClass: "bg-purple-100",
    iconClass: "text-purple-500",
  },
  {
    title: "Injury Prevention",
    description:
      "Smart mobility and stretching with every training session to keep you safe and healthy",
    bgClass: "bg-red-100",
    iconClass: "text-red-500",
  },
  {
    title: "Nutrition Guide",
    description: "Personalized nutrition advice and meal plans",
    bgClass: "bg-yellow-100",
    iconClass: "text-yellow-500",
  },
  {
    title: "Community Support",
    description: "Connect with fellow dreamers, discuss and share experiences",
    bgClass: "bg-indigo-100",
    iconClass: "text-indigo-500",
  },
  {
    title: "Money-Back Guarantee",
    description: "30-day money-back guarantee, no questions asked",
    bgClass: "bg-teal-100",
    iconClass: "text-teal-500",
  },
];

export const runningQuotes = [
  {
    quote:
      "The miracle isn't that I finished. The miracle is that I had the courage to start.",
    author: "John Bingham",
  },
  {
    quote:
      "Running is the greatest metaphor for life, because you get out of it what you put into it.",
    author: "Oprah Winfrey",
  },
  {
    quote:
      "I run because I can. When I get tired, I remember those who can't run, what they would give to have this simple gift I take for granted.",
    author: "Melissa Ragsdale",
  },
  {
    quote: "Pain is temporary. Quitting lasts forever.",
    author: "Lance Armstrong",
  },
  {
    quote: "The body achieves what the mind believes.",
    author: "Napoleon Hill",
  },
  {
    quote:
      "Run when you can, walk if you have to, crawl if you must; just never give up.",
    author: "Dean Karnazes",
  },
  {
    quote:
      "Everything you wanna know about yourself, you can learn in 26 miles - one breath, one step and one moment at a time!",
    author: "Diwakar",
  },
];

export const guarantee = {
  title: "100% Money-Back Guarantee",
  description:
    "If you're not satisfied with your progress within the first 30 days, we'll refund every penny. No questions asked.",
};

export const trustPoints = [
  {
    title: "30-Day Trial",
    description: "Full access to all features for a complete experience",
  },
  {
    title: "No Contract",
    description: "Cancel anytime with no hidden fees",
  },
  {
    title: "Secure Payment",
    description: "SSL encrypted checkout for your security",
  },
];

export const pricing = {
  title: "Simple, Transparent Pricing",
  subtitle:
    "No questions asked return policy. No credit card required. 3 plans.",
  plans: [
    {
      name: "Monthly",
      price: "20",
      description: "Start your journey",
      features: [
        "Full Access to AI Coach",
        "Personalized Training Plan",
        "Progress Tracking",
        "Communities and Content",
      ],
    },
    {
      name: "6 Months",
      price: "100",
      description: "Most Popular Choice",
      popular: true,
      features: ["All Monthly Features", "Priority Support", "Save 17%"],
    },
    {
      name: "Yearly",
      price: "200",
      description: "Best value",
      features: ["All 6-Month Features", "VIP Support", "Save 17%"],
    },
  ],
};

export const testimonials = {
  title: "Success Stories",
  subtitle: "Join thousands of runners who have achieved their marathon dreams",
  reviews: [
    {
      name: "Sarah Johnson",
      role: "First-time Marathoner",
      image: "https://ui-avatars.com/api/?name=Sarah+Johnson",
      quote:
        "26weeks.ai transformed me from someone who couldn't run a mile to completing my first marathon. The AI adapts perfectly to your progress.",
      stars: 5,
    },
    {
      name: "Michael Chen",
      role: "Experienced Runner",
      image: "https://ui-avatars.com/api/?name=Michael+Chen",
      quote:
        "Even as an experienced runner, the AI coaching helped me improve my times and prevent injuries. The personalization is incredible.",
      stars: 5,
    },
    {
      name: "Emma Wilson",
      role: "Busy Professional",
      image: "https://ui-avatars.com/api/?name=Emma+Wilson",
      quote:
        "The flexibility of the program allowed me to train for a marathon while maintaining my busy schedule. The results speak for themselves.",
      stars: 5,
    },
  ] as Testimonial[],
};

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
      "If you’re not satisfied within the first 30 days, email coach@26weeks.ai and we’ll issue a full refund—no hoops or hidden clauses.",
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
