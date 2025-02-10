import { Link } from "wouter";
import { Twitter, Instagram, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/subscribe", { email });

      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our latest updates and training tips.",
      });
      setEmail("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <a
              href="mailto:support@26weeks.ai"
              className="block text-neutral-400 hover:text-white mb-2 transition-colors duration-300 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              support@26weeks.ai
            </a>
          </div>

          {/* Newsletter */}
          <div className="animate__animated animate__fadeIn animate__delay-3s">
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-neutral-400 mb-4">
              Get the latest updates and training tips.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-neutral-800 border-neutral-700 text-white"
                required
                disabled={isSubmitting}
              />
              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
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