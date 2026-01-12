import { Link } from "wouter";
import { MetaHead } from "@/components/MetaHead";
import { seo } from "@/content/brand";
import { Masthead } from "@/components/editorial/masthead";
import { Hairline } from "@/components/editorial/hairline";

export default function Terms() {
  return (
    <>
      <MetaHead {...seo.terms} />
      <div className="min-h-screen bg-background text-paper">
        <header className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-12">
            <Masthead
              kicker="LEGAL"
              stamp="TERMS"
              title={
                <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.06]">
                  Terms of service
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
              at any time. Cancellation takes effect at the end of your current billing period.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
              26weeks.ai is not responsible for any injuries or health issues that may
              occur during training. Always consult with healthcare professionals before
              starting any exercise program.
            </p>

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
