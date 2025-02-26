import { useEffect, lazy, Suspense, useState } from 'react';
import Navbar from '@/components/layout/navbar';
import Hero from '@/components/sections/hero';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { RunningAnimation } from '@/components/ui/running-animation';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [performanceLevel, setPerformanceLevel] = useState<'high' | 'medium' | 'low'>('medium');

  useEffect(() => {
    // Implement smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      const anchorElement = anchor as HTMLAnchorElement;
      anchorElement.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const href = anchorElement.getAttribute('href');
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });

    // Preload critical resources
    const preloadComponents = () => {
      // Start preloading other components after critical content is loaded
      import('@/components/sections/features');
      import('@/components/sections/footer');
    };

    // Preload after a short delay to prioritize initial render
    const timer = setTimeout(preloadComponents, 2000);

    // Detect performance capabilities
    const detectPerformance = () => {
      // Check device capability - this is a simple heuristic
      // In a production app, you might want more sophisticated detection
      if (isMobile) {
        setPerformanceLevel('low');
      } else if (window.navigator.hardwareConcurrency > 4) {
        setPerformanceLevel('high');
      } else {
        setPerformanceLevel('medium');
      }
      
      // Mark animation as loaded after a short delay regardless
      // This ensures the UI becomes interactive even if detection is slow
      setTimeout(() => setAnimationLoaded(true), 500);
    };
    
    detectPerformance();
    
    return () => clearTimeout(timer);
  }, [isMobile]);

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