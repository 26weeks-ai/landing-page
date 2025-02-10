// Theme Colors
export const colors = {
  primary: '#f97316', // orange-500
  background: {
    dark: '#171717', // neutral-900
    darkTransparent: 'rgba(23, 23, 23, 0.95)', // neutral-900/95
  },
  text: {
    primary: '#ffffff',
    secondary: '#f3f4f6',
    muted: 'rgba(255, 255, 255, 0.9)',
  }
};

// Types
export interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
  stars: number;
}

// Testimonials Section
export const testimonials = {
  title: "Success Stories",
  subtitle: "Join thousands of runners who have achieved their marathon dreams",
  reviews: [
    {
      name: "Sarah Johnson",
      role: "First-time Marathoner",
      image: "https://ui-avatars.com/api/?name=Sarah+Johnson",
      quote: "26weeks.ai transformed me from someone who couldn't run a mile to completing my first marathon. The AI adapts perfectly to your progress.",
      stars: 5
    },
    {
      name: "Michael Chen",
      role: "Experienced Runner",
      image: "https://ui-avatars.com/api/?name=Michael+Chen",
      quote: "Even as an experienced runner, the AI coaching helped me improve my times and prevent injuries. The personalization is incredible.",
      stars: 5
    },
    {
      name: "Emma Wilson",
      role: "Busy Professional",
      image: "https://ui-avatars.com/api/?name=Emma+Wilson",
      quote: "The flexibility of the program allowed me to train for a marathon while maintaining my busy schedule. The results speak for themselves.",
      stars: 5
    }
  ] as Testimonial[]
};

// Hero Section
export const hero = {
  title: {
    prefix: "Couch to",
    highlight: "Marathon",
    suffix: "in",
    highlightNumber: "26",
    suffixWeeks: "weeks!",
  },
  subtitle:
    "Personalized AI-powered coaching that adapts to your progress, making your marathon dream a reality.",
};

// Features Section
export const features = {
  title: "Why Choose",
  titleHighlight: "26weeks.ai",
  subtitle:
    "Cutting-edge AI technology combined with proven training methods to transform you into a marathon runner",
};

export const featuresList = [
  {
    title: "Personalized AI Plans",
    description:
      "Custom training plans that adapt to your progress and fitness level",
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
      "Seamlessly connects with your favorite fitness apps and devices",
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
    description: "Smart monitoring to keep you safe and healthy",
    bgClass: "bg-red-100",
    iconClass: "text-red-500",
  },
  {
    title: "Nutrition Guide",
    description: "Personalized meal plans and nutrition advice",
    bgClass: "bg-yellow-100",
    iconClass: "text-yellow-500",
  },
  {
    title: "Community Support",
    description: "Connect with fellow runners and share experiences",
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

// Guarantee Section
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

// Pricing Section
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