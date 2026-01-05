import { Link } from "wouter";
import { Twitter, Instagram, Mail } from "lucide-react";
import InlineWaitlistForm from "@/components/inline-waitlist-form";

export default function Footer() {
  return (
    <footer 
      id="footer" 
      className="bg-background pt-20 pb-10 border-t border-border"
      role="contentinfo"
      aria-label="Site footer with company information and links"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold text-foreground mb-4">26weeks.ai</div>
            <p className="text-muted-foreground mb-6">
              Transform your running journey with AI-powered marathon training.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/26weeks_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-subtle hover:text-foreground transition-colors duration-300 focus:text-foreground"
                aria-label="Follow us on Twitter (opens in new tab)"
              >
                <Twitter className="w-6 h-6" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/26weeks.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-subtle hover:text-foreground transition-colors duration-300 focus:text-foreground"
                aria-label="Follow us on Instagram (opens in new tab)"
              >
                <Instagram className="w-6 h-6" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
            <a
              href="#features"
              className="block text-muted-foreground hover:text-foreground mb-2 transition-colors duration-300 focus:text-foreground text-left"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block text-muted-foreground hover:text-foreground mb-2 transition-colors duration-300 focus:text-foreground text-left"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="block text-muted-foreground hover:text-foreground mb-2 transition-colors duration-300 focus:text-foreground text-left"
            >
              Testimonials
            </a>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Support</h3>
            <a
              href="#faq"
              className="block text-muted-foreground hover:text-foreground mb-2 transition-colors duration-300 focus:text-foreground text-left"
            >
              FAQ
            </a>
            <Link
              href="/privacy"
              className="block text-muted-foreground hover:text-foreground mb-2 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="block text-muted-foreground hover:text-foreground mb-2 transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/cancellations"
              className="block text-muted-foreground hover:text-foreground mb-2 transition-colors duration-300"
            >
              Cancellations & Refunds
            </Link>
            <a
              href="mailto:coach@26weeks.ai"
              className="block text-muted-foreground hover:text-foreground mb-2 transition-colors duration-300 flex items-center gap-2 focus:text-foreground"
              aria-label="Send email to coach@26weeks.ai"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              coach@26weeks.ai
            </a>
          </div>

          {/* Waitlist CTA */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Join the Waitlist</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to hear about launch updates, product news, and training drops.
            </p>
            <InlineWaitlistForm source="footer" compactNote />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-border pt-8">
          <p className="text-subtle">
            © {new Date().getFullYear()} 26weeks.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
