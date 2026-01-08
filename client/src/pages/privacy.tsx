import { Link } from "wouter";
import { MetaHead } from "@/components/MetaHead";
import { seo } from "@/content/brand";
import { Masthead } from "@/components/editorial/masthead";
import { Hairline } from "@/components/editorial/hairline";

export default function Privacy() {
  return (
    <>
      <MetaHead {...seo.privacy} />
      <div className="min-h-screen bg-background text-paper">
        <header className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-12">
            <Masthead
              kicker="LEGAL"
              stamp="PRIVACY"
              title={
                <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.06]">
                  Privacy policy
                </h1>
              }
              subtitle="Last updated: February 10, 2025"
              showRule={false}
            />
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-3xl border border-border bg-card p-8">
            <div className="prose prose-lg prose-invert max-w-none prose-headings:font-serif prose-headings:tracking-[-0.02em] prose-headings:text-paper prose-p:text-paper-secondary prose-li:text-paper-secondary prose-a:text-copper-400 prose-a:decoration-copper-500/40 prose-a:underline-offset-4">

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

            </div>

            <Hairline className="my-8 opacity-70" />
            <Link
              href="/"
              className="text-sm font-semibold text-copper-400 underline decoration-copper-500/40 underline-offset-4 hover:text-copper-300"
            >
              Return to home
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
