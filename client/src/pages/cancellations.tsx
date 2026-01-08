import { Link } from "wouter";
import { MetaHead } from "@/components/MetaHead";
import { seo } from "@/content/brand";
import { Masthead } from "@/components/editorial/masthead";
import { Hairline } from "@/components/editorial/hairline";

export default function Cancellations() {
  return (
    <>
      <MetaHead {...seo.cancellations} />
      <div className="min-h-screen bg-background text-paper">
        <header className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-12">
            <Masthead
              kicker="LEGAL"
              stamp="REFUNDS"
              title={
                <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.06]">
                  Cancellations & refunds
                </h1>
              }
              subtitle="Last updated: February 26, 2025"
              showRule={false}
            />
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-3xl border border-border bg-card p-8">
            <div className="prose prose-lg prose-invert max-w-none prose-headings:font-serif prose-headings:tracking-[-0.02em] prose-headings:text-paper prose-p:text-paper-secondary prose-li:text-paper-secondary prose-a:text-copper-400 prose-a:decoration-copper-500/40 prose-a:underline-offset-4">

            <h2>30-Day Money-Back Guarantee</h2>
            <p>
              At 26weeks.ai, we stand behind our product with a 30-day money-back guarantee. If you're not
              completely satisfied with our service within your first 30 days, we'll refund your payment in full.
            </p>

            <h2>Eligibility for Refunds</h2>
            <p>
              To be eligible for a refund:
            </p>
            <ul>
              <li>Request must be made within 30 days of your initial purchase</li>
              <li>Your account must be in good standing</li>
              <li>You must provide a brief reason for your cancellation (to help us improve)</li>
            </ul>

            <h2>How to Request a Refund</h2>
            <p>
              To request a refund, please:
            </p>
            <ol>
              <li>Email our support team at <a href="mailto:coach@26weeks.ai" className="text-copper-400 hover:text-copper-300">coach@26weeks.ai</a></li>
              <li>Include "Refund Request" in your subject line</li>
              <li>Provide your account email and reason for cancellation</li>
            </ol>
            <p>
              We process all refund requests within 5-7 business days. Refunds will be issued to the original payment method used for the purchase.
            </p>

            <h2>Subscription Cancellations</h2>
            <p>
              You may cancel your subscription at any time:
            </p>
            <ul>
              <li>Log into your account and navigate to Account Settings</li>
              <li>Select "Manage Subscription" and follow the cancellation steps</li>
              <li>You'll receive an email confirmation of your cancellation</li>
            </ul>
            <p>
              When you cancel a subscription, you'll maintain access to your premium features until the end of your current billing period. After that date, your account will automatically downgrade to the free version.
            </p>

            <h2>Exceptions</h2>
            <p>
              While we strive to ensure customer satisfaction, certain situations may not qualify for our standard refund policy:
            </p>
            <ul>
              <li>Requests made after the 30-day period</li>
              <li>Accounts with Terms of Service violations</li>
              <li>Special promotional or discounted purchases (as indicated at time of purchase)</li>
            </ul>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about our cancellation and refund policy, please contact us at{" "}
              <a href="mailto:coach@26weeks.ai" className="text-copper-400 hover:text-copper-300">coach@26weeks.ai</a>.
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
