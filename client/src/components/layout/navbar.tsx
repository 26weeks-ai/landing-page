import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'wouter';
import WaitlistForm from '@/components/waitlist-form';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
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
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 translate-y-0 shadow-lg shadow-black/30' : 'bg-neutral-900/80 backdrop-blur-sm'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div 
              className="font-bold cursor-pointer flex items-center transition-transform duration-150 hover:scale-105 active:scale-95"
            >
              <span className="text-2xl">
                <span className="text-orange-500">26</span>
                <span className="text-white">weeks</span>
                <span className="text-orange-500">.</span>
                <span className="text-white">ai</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/90 hover:text-orange-500 transition-all duration-150 hover:scale-105 inline-flex"
              >
                {link.label}
              </a>
            ))}
            {pageLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className="text-white/90 hover:text-orange-500 transition-all duration-150 cursor-pointer inline-flex hover:scale-105"
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <WaitlistForm />
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden text-white" size="icon" aria-label="Open navigation menu">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-neutral-900 border-neutral-800">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">Site navigation links</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileNavOpen(false)}
                    className="text-white hover:text-orange-500 transition-all px-4 py-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
                  >
                    {link.label}
                  </a>
                ))}
                {pageLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <span
                      onClick={() => setIsMobileNavOpen(false)}
                      className="text-white hover:text-orange-500 transition-colors px-4 py-2 rounded-lg cursor-pointer block"
                    >
                      {link.label}
                    </span>
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
    </header>
  );
}
