import { useEffect } from 'react';
import Navbar from '@/components/layout/navbar';
import Hero from '@/components/sections/hero';
import Features from '@/components/sections/features';
import Guarantee from '@/components/sections/guarantee';
import Pricing from '@/components/sections/pricing';
import Testimonials from '@/components/sections/testimonials';
import FAQ from '@/components/sections/faq';

export default function Home() {
  useEffect(() => {
    // Implement smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Guarantee />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
    </div>
  );
}