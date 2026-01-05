import { Link } from "wouter";
import { MetaHead } from "@/components/MetaHead";
import { seo } from "@/content/brand";

export default function Terms() {
  return (
    <>
      <MetaHead {...seo.terms} />
      <div className="min-h-screen bg-background text-foreground py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-elev-2">
          <h1 className="text-4xl font-semibold text-foreground mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p>Last updated: February 10, 2025</p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using 26weeks.ai, you agree to be bound by these Terms of Service
              and all applicable laws and regulations.
            </p>

            <h2>2. Service Description</h2>
            <p>
              26weeks.ai provides AI-powered marathon training services, including but not limited to:
            </p>
            <ul>
              <li>Personalized training plans</li>
              <li>Progress tracking</li>
              <li>AI coaching feedback</li>
              <li>Community features</li>
            </ul>

            <h2>3. User Responsibilities</h2>
            <p>
              You are responsible for:
            </p>
            <ul>
              <li>Providing accurate information</li>
              <li>Maintaining the security of your account</li>
              <li>Following the training guidelines safely</li>
              <li>Consulting healthcare professionals when necessary</li>
            </ul>

            <h2>4. Subscription and Payments</h2>
            <p>
              Subscription fees are billed according to your chosen plan. You may cancel
              at any time, and we offer a 30-day money-back guarantee for all plans.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
              26weeks.ai is not responsible for any injuries or health issues that may
              occur during training. Always consult with healthcare professionals before
              starting any exercise program.
            </p>

            <div className="mt-8">
              <Link href="/" className="text-ring hover:text-ring/90 underline decoration-ring/40 underline-offset-4">
                Return to Home
              </Link>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
