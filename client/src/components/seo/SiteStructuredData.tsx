import { pricing, featuresList, brandIdentity } from "@/content/brand";
import type { FAQItem } from "@/content/brand";

interface SiteStructuredDataProps {
  faqs: FAQItem[];
}

const siteUrl = brandIdentity.domain;
const defaultImage = brandIdentity.defaultOgImage;

const howToSteps = [
  {
    name: "Share your current fitness baseline",
    text: "Answer onboarding questions about mileage, recovery, and wearable data so the AI knows exactly where to start.",
  },
  {
    name: "Sync your preferred devices",
    text: "Connect Garmin, Apple Health, Strava, or Fitbit so training load and recovery scores update in real time.",
  },
  {
    name: "Receive a personalized 26-week plan",
    text: "The coach builds a periodized roadmap with weekly mileage, intensity, and strength sessions tailored to you.",
  },
  {
    name: "Check in daily to adjust",
    text: "Log how you felt or let your wearable data speak for you—sessions are rebalanced instantly if you need rest.",
  },
  {
    name: "Toe the line confident",
    text: "Arrive at race day with the exact pacing guidance, fueling strategy, and taper plan you have rehearsed for weeks.",
  },
];

export function SiteStructuredData({ faqs }: SiteStructuredDataProps) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandIdentity.name,
    url: siteUrl,
    logo: brandIdentity.logo,
    sameAs: [
      brandIdentity.social.twitter,
      brandIdentity.social.instagram,
      brandIdentity.social.linkedin,
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: brandIdentity.contactEmail,
        contactType: "customer support",
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
    ],
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteUrl,
    name: "26weeks.ai",
    description:
      "AI-powered marathon coaching that adapts to your lifestyle, biometrics, and goals to take you from couch to 26.2 miles.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const applicationOffers = pricing.plans.map((plan) => ({
    "@type": "Offer",
    priceCurrency: "USD",
    price: Number(plan.price),
    name: plan.name,
    description: plan.description,
    availability: "https://schema.org/PreOrder",
    url: `${siteUrl}#pricing`,
  }));

  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "26weeks.ai Marathon Coach",
    operatingSystem: "Web",
    applicationCategory: "SportsApplication",
    offers: applicationOffers,
    image: defaultImage,
    creator: {
      "@type": "Organization",
      name: "26weeks.ai",
    },
    featureList: featuresList.map((feature) => feature.title),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Go from couch to marathon in 26 weeks with AI coaching",
    description: "Step-by-step process 26weeks.ai uses to create a personalized, adaptive marathon plan.",
    totalTime: "P26W",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "15",
    },
    supply: [
      {
        "@type": "HowToSupply",
        name: "Wearable device or fitness app data",
      },
      {
        "@type": "HowToSupply",
        name: "26weeks.ai membership",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "AI marathon coach dashboard",
      },
    ],
    step: howToSteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${siteUrl}#features`,
    })),
  };

  const featureList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Key features of 26weeks.ai",
    numberOfItems: featuresList.length,
    itemListElement: featuresList.map((feature, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: feature.title,
      description: feature.description,
    })),
  };

  const structuredData = [organization, webSite, softwareApplication, faqSchema, howTo, featureList];

  return (
    <>
      {structuredData.map((entry, index) => (
        <script key={`structured-data-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }} />
      ))}
    </>
  );
}
