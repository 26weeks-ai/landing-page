import { Link } from "wouter";
import { Twitter, Instagram, Mail } from "lucide-react";
import WaitlistForm from "@/components/waitlist-form";
import { Hairline } from "@/components/editorial/hairline";

export default function Footer() {
  return (
    <footer 
      id="footer" 
      className="border-t border-border bg-background pt-20 pb-10"
      role="contentinfo"
      aria-label="Site footer with company information and links"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <div className="text-xl leading-none mb-4 font-serif font-semibold tracking-[-0.03em]">
              <span className="text-copper-500">26</span>
              <span className="ml-1 text-paper">weeks</span>
              <span className="text-copper-500">.</span>
              <span className="text-paper">ai</span>
            </div>
            <p className="text-paper-secondary mb-6">
              Transform your running journey with AI-powered marathon training.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/26weeks_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper-secondary hover:text-paper transition-colors duration-300 focus:text-paper"
                aria-label="Follow us on Twitter (opens in new tab)"
              >
                <Twitter className="w-6 h-6" aria-hidden="true" strokeWidth={1.75} />
              </a>
              <a
                href="https://www.instagram.com/26weeks.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper-secondary hover:text-paper transition-colors duration-300 focus:text-paper"
                aria-label="Follow us on Instagram (opens in new tab)"
              >
                <Instagram className="w-6 h-6" aria-hidden="true" strokeWidth={1.75} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-paper mb-4">Quick links</h3>
            <a
              href="#features"
              className="block text-paper-secondary hover:text-paper mb-2 transition-colors duration-300 focus:text-paper text-left"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block text-paper-secondary hover:text-paper mb-2 transition-colors duration-300 focus:text-paper text-left"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="block text-paper-secondary hover:text-paper mb-2 transition-colors duration-300 focus:text-paper text-left"
            >
              Testimonials
            </a>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-paper mb-4">Support</h3>
            <a
              href="#faq"
              className="block text-paper-secondary hover:text-paper mb-2 transition-colors duration-300 focus:text-paper text-left"
            >
              FAQ
            </a>
            <Link
              href="/privacy"
              className="block text-paper-secondary hover:text-paper mb-2 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="block text-paper-secondary hover:text-paper mb-2 transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/cancellations"
              className="block text-paper-secondary hover:text-paper mb-2 transition-colors duration-300"
            >
              Cancellations & Refunds
            </Link>
            <a
              href="mailto:coach@26weeks.ai"
              className="block text-paper-secondary hover:text-paper mb-2 transition-colors duration-300 flex items-center gap-2 focus:text-paper"
              aria-label="Send email to coach@26weeks.ai"
            >
              <Mail className="w-4 h-4" aria-hidden="true" strokeWidth={1.75} />
              coach@26weeks.ai
            </a>
          </div>

          {/* Waitlist CTA */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-paper mb-4">Join the waitlist</h3>
            <p className="text-paper-secondary mb-4">
              Be the first to hear about launch updates, product news, and training drops.
            </p>
            <WaitlistForm
              label="Join waitlist"
              className="w-full"
            />
          </div>
        </div>

        {/* Copyright */}
        <Hairline className="opacity-70" />
        <div className="pt-8">
          <p className="text-paper-muted text-sm">
            © {new Date().getFullYear()} 26weeks.ai. All rights reserved.
          </p>
          <p className="text-paper-muted text-sm mt-2">
            26weeks.ai is a product of Renojas Technologies Private Limited.
          </p>
        </div>
      </div>
    </footer>
  );
}
