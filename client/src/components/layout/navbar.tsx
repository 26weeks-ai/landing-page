import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'wouter';
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
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#plan-preview', label: 'PLAN' },
  { href: '#faq', label: 'FAQ' },
];

const pageLinks = [
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";

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
        isScrolled ? 'bg-background border-b border-border' : 'bg-background/95 border-b border-border'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/">
          <div
            className="cursor-pointer flex items-center transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99]"
            aria-label="26weeks.ai"
          >
            <span className="text-xl sm:text-2xl leading-none tracking-[-0.03em]">
              <span className="font-serif font-semibold text-copper-500">26</span>
              <span className="ml-1 font-sans font-semibold text-paper">weeks</span>
              <span className="font-sans font-semibold text-copper-500">.</span>
              <span className="font-sans font-semibold text-paper">ai</span>
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              isHome ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-secondary hover:text-paper transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={`/${link.href}`}>
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-secondary hover:text-paper transition-colors cursor-pointer">
                    {link.label}
                  </span>
                </Link>
              ),
            )}
            {pageLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-secondary hover:text-paper transition-colors cursor-pointer"
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <WaitlistForm label="Join waitlist" />
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden text-paper" size="icon" aria-label="Open navigation menu">
                <Menu className="h-6 w-6" strokeWidth={1.75} />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-popover border-border">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">Site navigation links</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) =>
                  isHome ? (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileNavOpen(false)}
                      className="rounded-lg px-4 py-2 text-sm font-semibold text-paper hover:bg-accent"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.href} href={`/${link.href}`}>
                      <span
                        onClick={() => setIsMobileNavOpen(false)}
                        className="block cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-paper hover:bg-accent"
                      >
                        {link.label}
                      </span>
                    </Link>
                  ),
                )}
                {pageLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <span
                      onClick={() => setIsMobileNavOpen(false)}
                      className="block cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-paper hover:bg-accent"
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
                <div className="px-4 pt-4">
                  <WaitlistForm label="Join waitlist" className="w-full" />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
