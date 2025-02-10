import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-neutral-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg">
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
            <Link href="/" className="text-orange-500 hover:text-orange-600">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
