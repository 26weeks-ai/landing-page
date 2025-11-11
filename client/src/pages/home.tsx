import { useEffect, lazy, Suspense } from 'react';
import Navbar from '@/components/layout/navbar';
import Hero from '@/components/sections/hero';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load below-the-fold sections for performance
const Features = lazy(() => import('@/components/sections/features'));
const Guarantee = lazy(() => import('@/components/sections/guarantee'));
const Pricing = lazy(() => import('@/components/sections/pricing'));
const Testimonials = lazy(() => import('@/components/sections/testimonials'));
const FAQ = lazy(() => import('@/components/sections/faq'));
const Footer = lazy(() => import('@/components/sections/footer'));

// Section loading placeholder
const SectionLoader = () => (
  <div className="py-16 px-4">
    <Skeleton className="h-8 w-48 mx-auto mb-8" />
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-64 w-full rounded-xl" />
      ))}
    </div>
  </div>
);

export default function Home() {

  useEffect(() => {
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]')) as HTMLAnchorElement[];
    const handleAnchorClick = (event: Event) => {
      event.preventDefault();
      const target = event.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href) {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    anchors.forEach((anchor) => anchor.addEventListener('click', handleAnchorClick));

    const timer = setTimeout(() => {
      import('@/components/sections/features');
      import('@/components/sections/footer');
    }, 2000);

    return () => {
      anchors.forEach((anchor) => anchor.removeEventListener('click', handleAnchorClick));
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Removed animated background as requested */}
      
      {/* Content overlay */}
      <div className="relative z-10">
        <Navbar />
        <main>
          {/* Critical content loaded immediately */}
          <Hero />
          
          {/* Lazy loaded sections with suspense boundaries */}
          <Suspense fallback={<SectionLoader />}>
            <Features />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Guarantee />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Pricing />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Testimonials />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <FAQ />
          </Suspense>
        </main>
        
        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}
