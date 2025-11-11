import { Link } from "wouter";
import { Twitter, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WAITLIST_FORM_URL } from "@/components/waitlist-form";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer 
      id="footer" 
      className="bg-neutral-900 pt-20 pb-10"
      role="contentinfo"
      aria-label="Site footer with company information and links"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="animate__animated animate__fadeIn">
            <div className="text-2xl font-bold text-white mb-4">26weeks.ai</div>
            <p className="text-neutral-400 mb-6">
              Transform your running journey with AI-powered marathon training.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/26weeks_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors duration-300 focus:text-white"
                aria-label="Follow us on Twitter (opens in new tab)"
              >
                <Twitter className="w-6 h-6" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/26weeks.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors duration-300 focus:text-white"
                aria-label="Follow us on Instagram (opens in new tab)"
              >
                <Instagram className="w-6 h-6" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate__animated animate__fadeIn animate__delay-1s">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <button
              onClick={() => scrollToSection("features")}
              className="block text-neutral-400 hover:text-white mb-2 transition-colors duration-300 focus:text-white text-left"
              aria-label="Navigate to Features section"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="block text-neutral-400 hover:text-white mb-2 transition-colors duration-300 focus:text-white text-left"
              aria-label="Navigate to Pricing section"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="block text-neutral-400 hover:text-white mb-2 transition-colors duration-300 focus:text-white text-left"
              aria-label="Navigate to Testimonials section"
            >
              Testimonials
            </button>
          </div>

          {/* Support */}
          <div className="animate__animated animate__fadeIn animate__delay-2s">
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <button
              onClick={() => scrollToSection("faq")}
              className="block text-neutral-400 hover:text-white mb-2 transition-colors duration-300 focus:text-white text-left"
              aria-label="Navigate to FAQ section"
            >
              FAQ
            </button>
            <Link
              href="/privacy"
              className="block text-neutral-400 hover:text-white mb-2 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="block text-neutral-400 hover:text-white mb-2 transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/cancellations"
              className="block text-neutral-400 hover:text-white mb-2 transition-colors duration-300"
            >
              Cancellations & Refunds
            </Link>
            <a
              href="mailto:diwakar@26weeks.ai"
              className="block text-neutral-400 hover:text-white mb-2 transition-colors duration-300 flex items-center gap-2 focus:text-white"
              aria-label="Send email to diwakar@26weeks.ai"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              diwakar@26weeks.ai
            </a>
          </div>

          {/* Waitlist CTA */}
          <div className="animate__animated animate__fadeIn animate__delay-3s">
            <h3 className="text-white font-semibold mb-4">Join the Waitlist</h3>
            <p className="text-neutral-400 mb-4">
              Be the first to hear about launch updates, product news, and training drops.
            </p>
            <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              <a href={WAITLIST_FORM_URL} target="_blank" rel="noopener noreferrer">
                Open Waitlist Form
              </a>
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-neutral-800 pt-8">
          <p className="text-neutral-400">
            © {new Date().getFullYear()} 26weeks.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
