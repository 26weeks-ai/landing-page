import { Link } from "wouter";
import { Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-neutral-900 pt-20 pb-10">
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
                href="#"
                className="text-neutral-400 hover:text-white transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors duration-300"
                aria-label="Github"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate__animated animate__fadeIn animate__delay-1s">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <Link href="/" className="block text-neutral-400 hover:text-white mb-2 transition-colors duration-300">Home</Link>
            <Link href="/#features" className="block text-neutral-400 hover:text-white mb-2 transition-colors duration-300">Features</Link>
            <Link href="/#pricing" className="block text-neutral-400 hover:text-white mb-2 transition-colors duration-300">Pricing</Link>
            <Link href="/#testimonials" className="block text-neutral-400 hover:text-white mb-2 transition-colors duration-300">Testimonials</Link>
          </div>

          {/* Support */}
          <div className="animate__animated animate__fadeIn animate__delay-2s">
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <Link href="/#faq" className="block text-neutral-400 hover:text-white mb-2 transition-colors duration-300">FAQ</Link>
            <Link href="/privacy" className="block text-neutral-400 hover:text-white mb-2 transition-colors duration-300">Privacy Policy</Link>
            <Link href="/terms" className="block text-neutral-400 hover:text-white mb-2 transition-colors duration-300">Terms of Service</Link>
            <Link href="/contact" className="block text-neutral-400 hover:text-white mb-2 transition-colors duration-300">Contact Us</Link>
          </div>

          {/* Contact */}
          <div className="animate__animated animate__fadeIn animate__delay-3s">
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p className="text-neutral-400 mb-2">Email: support@26weeks.ai</p>
            <p className="text-neutral-400">
              Location: San Francisco, CA
            </p>
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