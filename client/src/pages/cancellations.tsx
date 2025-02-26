import { Link } from "wouter";

export default function Cancellations() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-neutral-900 mb-8">Cancellations and Refunds</h1>
        
        <div className="prose prose-lg">
          <p>Last updated: February 26, 2025</p>

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
            <li>Email our support team at <a href="mailto:support@26weeks.ai" className="text-orange-500 hover:text-orange-600">support@26weeks.ai</a></li>
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
            <a href="mailto:support@26weeks.ai" className="text-orange-500 hover:text-orange-600">support@26weeks.ai</a>.
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