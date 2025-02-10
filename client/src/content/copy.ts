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

// Navigation
export const navigation = {
  logo: {
    text: {
      prefix: '26',
      middle: 'weeks',
      dot: '.',
      suffix: 'ai'
    }
  },
  links: [
    { href: '#features', label: 'Features' },
    { href: '#guarantee', label: 'Guarantee' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#faq', label: 'FAQ' },
  ]
};

// Hero Section
export const hero = {
  title: {
    prefix: "From Couch Potato to",
    highlight: "Marathon Finisher",
    suffix: "in 26 Weeks"
  },
  subtitle: "Personalized AI-powered coaching that adapts to your progress, making your marathon dream a reality.",
  cta: {
    primary: "Join Waitlist",
    secondary: "Learn More"
  }
};

// Features Section
export const features = {
  title: "Why Choose",
  titleHighlight: "26weeks.ai",
  subtitle: "Cutting-edge AI technology combined with proven training methods to transform you into a marathon runner"
};

export const featuresList = [
  {
    title: "Personalized AI Plans",
    description: "Custom training plans that adapt to your progress and fitness level",
    bgClass: "bg-blue-100",
    iconClass: "text-blue-600",
  },
  {
    title: "Daily Check-ins",
    description: "Get real-time feedback and adjustments based on your performance",
    bgClass: "bg-orange-100",
    iconClass: "text-orange-500",
  },
  {
    title: "Deep Integrations",
    description: "Seamlessly connects with your favorite fitness apps and devices",
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
    description: "100% satisfaction guarantee or your money back",
    bgClass: "bg-teal-100",
    iconClass: "text-teal-500",
  }
];

// Guarantee Section
export const guarantee = {
  title: "100% Money-Back Guarantee",
  subtitle: "If you're not satisfied with your progress within the first 30 days, we'll refund every penny. No questions asked.",
  trustPoints: [
    {
      title: "30-Day Trial",
      description: "Full access to all features for a complete experience",
      icon: "clock"
    },
    {
      title: "No Contract",
      description: "Cancel anytime with no hidden fees",
      icon: "check"
    },
    {
      title: "Secure Payment",
      description: "SSL encrypted checkout for your security",
      icon: "shield"
    }
  ]
};

// FAQ Section
export const faq = {
  title: "Frequently Asked Questions",
  subtitle: "Everything you need to know about our AI-powered marathon training",
  questions: [
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
  ]
};

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
  ]
};

// Pricing Section
export const pricing = {
  title: "Simple, Transparent Pricing",
  subtitle: "No hidden fees. No questions asked return policy.",
  plans: [
    {
      name: "Monthly",
      price: "20",
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
      popular: true,
      features: [
        "All Monthly Features",
        "Priority Support",
        "Save 17%",
      ],
    },
    {
      name: "Yearly",
      price: "200",
      features: [
        "All 6-Month Features",
        "VIP Support",
        "Save 17%",
      ],
    },
  ],
  guarantee: "30-day money-back guarantee for all plans"
};

// Legal Pages
export const legal = {
  lastUpdated: "February 10, 2025",
  privacy: {
    title: "Privacy Policy",
    sections: {
      collect: {
        title: "Information We Collect",
        items: [
          "Create an account",
          "Use our AI coaching services",
          "Connect fitness tracking devices",
          "Participate in our community features"
        ]
      },
      use: {
        title: "How We Use Your Information",
        items: [
          "Provide personalized training plans",
          "Track your progress",
          "Improve our AI coaching algorithms",
          "Send important updates about your training"
        ]
      },
      security: {
        title: "Data Security",
        content: "We implement appropriate security measures to protect your personal information. Your data is encrypted and stored securely in compliance with industry standards."
      },
      rights: {
        title: "Your Rights",
        items: [
          "Access your personal data",
          "Request corrections to your data",
          "Request deletion of your data",
          "Opt out of marketing communications"
        ]
      }
    }
  },
  terms: {
    title: "Terms of Service",
    sections: {
      acceptance: {
        title: "Acceptance of Terms",
        content: "By accessing and using 26weeks.ai, you agree to be bound by these Terms of Service and all applicable laws and regulations."
      },
      service: {
        title: "Service Description",
        content: "26weeks.ai provides AI-powered marathon training services, including but not limited to:",
        items: [
          "Personalized training plans",
          "Progress tracking",
          "AI coaching feedback",
          "Community features"
        ]
      }
    }
  }
};

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