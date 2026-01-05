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
  defaultOgImage: "https://26weeks.ai/og-image.png",
  logo: "https://26weeks.ai/icon-corners.svg",
  contactEmail: "coach@26weeks.ai",
  links: {
    waitlist: "/waitlist",
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
  waitlist: {
    type: "website",
    title: "Join the Waitlist",
    description:
      "Get launch updates, early access invites, and training drops from 26weeks.ai.",
    url: `${brandIdentity.domain}/waitlist`,
    image: brandIdentity.defaultOgImage,
    tags: ["waitlist", "marathon training app", "AI marathon coach"],
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
    "An adaptive AI coach that syncs with your wearables and adjusts workouts using effort + recovery—so you build endurance without burning out.",
};

export const features = {
  title: "Why Choose",
  titleHighlight: "26weeks.ai",
  subtitle:
    "A 26‑week system that plans the week, adjusts the day, and keeps you healthy to the start line.",
};

export const featuresList = [
  {
    title: "Personalized & Adaptive",
    description:
      "Starts from your current fitness level and recalibrates as you improve.",
    bgClass: "bg-chart-4/12",
    iconClass: "text-chart-4",
  },
  {
    title: "Daily Check-ins",
    description:
      "Quick feedback loops that tune intensity before little issues become injuries.",
    bgClass: "bg-ring/12",
    iconClass: "text-ring",
  },
  {
    title: "Deep Integrations",
    description:
      "Pulls data from Garmin, Apple Watch, Strava, WHOOP, and more—automatically.",
    bgClass: "bg-chart-3/12",
    iconClass: "text-chart-3",
  },
  {
    title: "Progress Tracking",
    description: "Clear trends on load, pace, and recovery so you know what’s working.",
    bgClass: "bg-secondary/14",
    iconClass: "text-chart-5",
  },
  {
    title: "Injury Prevention",
    description:
      "Mobility cues, recovery protocols, and load guardrails to keep you running.",
    bgClass: "bg-secondary/18",
    iconClass: "text-chart-3",
  },
  {
    title: "Nutrition Guide",
    description: "Simple fueling guidance for training blocks and long-run weekends.",
    bgClass: "bg-chart-2/14",
    iconClass: "text-chart-2",
  },
  {
    title: "Community Support",
    description: "A place to ask, share, and stay accountable when motivation dips.",
    bgClass: "bg-chart-5/10",
    iconClass: "text-chart-5",
  },
  {
    title: "Money-Back Guarantee",
    description: "Try it for 30 days. If it’s not helping, get every penny back.",
    bgClass: "bg-ring/12",
    iconClass: "text-ring",
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
    "Three plans, cancel anytime, and a 30‑day money‑back guarantee. No credit card to join the waitlist.",
  plans: [
    {
      id: "monthly",
      name: "Monthly",
      price: 20,
      billingIntervalMonths: 1,
      description: "Start your journey",
      features: [
        "Full Access to AI Coach",
        "Personalized Training Plan",
        "Progress Tracking",
        "Runner Community + Training Library",
      ],
    },
    {
      id: "six-months",
      name: "6 Months",
      price: 100,
      billingIntervalMonths: 6,
      description: "Most Popular Choice",
      popular: true,
      features: ["All Monthly Features", "Priority Support", "Save 17%"],
    },
    {
      id: "yearly",
      name: "Yearly",
      price: 200,
      billingIntervalMonths: 12,
      description: "Best value",
      features: ["All 6-Month Features", "VIP Support", "Save 17%"],
    },
  ],
};

export const testimonials = {
  title: "Success Stories",
  subtitle: "Join runners training smarter with an adaptive marathon plan",
  reviews: [
    {
      name: "Sarah Johnson",
      role: "First-time marathoner",
      image: "",
      quote:
        "The daily check-ins nailed the balance between pushing and backing off. I stayed consistent, avoided niggles, and finally felt in control of my training.",
      stars: 5,
    },
    {
      name: "Michael Chen",
      role: "Experienced runner",
      image: "",
      quote:
        "The plan adjusted around travel weeks without derailing my long runs. The trend view made it obvious when I needed more recovery — and it worked.",
      stars: 5,
    },
    {
      name: "Emma Wilson",
      role: "Busy professional",
      image: "",
      quote:
        "I don’t have time to guess. Having workouts adapt to my schedule and energy kept me training through the messy weeks — without guilt or burnout.",
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
