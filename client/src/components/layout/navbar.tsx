import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import WaitlistForm from '@/components/waitlist-form';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#guarantee', label: 'Guarantee' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#faq', label: 'FAQ' },
];

const pageLinks = [
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800' : 'bg-neutral-900/80 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <motion.div 
              className="font-bold cursor-pointer flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">
                <span className="text-orange-500">26</span>
                <span className="text-white">weeks</span>
                <span className="text-orange-500">.</span>
                <span className="text-white">ai</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-white/90 hover:text-orange-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.a>
            ))}
            {pageLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.span
                  className="text-white/90 hover:text-orange-500 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.span>
              </Link>
            ))}
            <WaitlistForm />
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden text-white" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-neutral-900 border-neutral-800">
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="text-white hover:text-orange-500 transition-colors px-4 py-2 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                {pageLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <motion.span
                      className="text-white hover:text-orange-500 transition-colors px-4 py-2 rounded-lg cursor-pointer block"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                ))}
                <div className="px-4 pt-4">
                  <WaitlistForm />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
