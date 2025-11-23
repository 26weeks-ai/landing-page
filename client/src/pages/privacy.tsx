import { Link } from "wouter";
import { MetaHead } from "@/components/MetaHead";
import { seo } from "@/content/brand";

export default function Privacy() {
  return (
    <>
      <MetaHead {...seo.privacy} />
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-neutral-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg">
            <p>Last updated: February 10, 2025</p>

            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including when you:
            </p>
            <ul>
              <li>Create an account</li>
              <li>Use our AI coaching services</li>
              <li>Connect fitness tracking devices</li>
              <li>Participate in our community features</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide personalized training plans</li>
              <li>Track your progress</li>
              <li>Improve our AI coaching algorithms</li>
              <li>Send important updates about your training</li>
            </ul>

            <h2>3. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information.
              Your data is encrypted and stored securely in compliance with industry standards.
            </p>

            <h2>4. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your personal data</li>
              <li>Request corrections to your data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <div className="mt-8">
              <Link href="/" className="text-orange-500 hover:text-orange-600">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
