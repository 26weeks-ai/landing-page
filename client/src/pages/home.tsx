import { useEffect, lazy, Suspense, useState } from 'react';
import Navbar from '@/components/layout/navbar';
import Hero from '@/components/sections/hero';
import { Skeleton } from '@/components/ui/skeleton';
import { MetaHead } from '@/components/MetaHead';
import { SiteStructuredData } from '@/components/seo/SiteStructuredData';
import { faqs, seo } from '@/content/brand';

// Lazy load below-the-fold sections for performance
const Features = lazy(() => import('@/components/sections/features'));
const Pricing = lazy(() => import('@/components/sections/pricing'));
const Testimonials = lazy(() => import('@/components/sections/testimonials'));
const PlanPreviewSection = lazy(() => import('@/components/sections/plan-preview'));
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
  const [renderBelowFold, setRenderBelowFold] = useState(false);
  useEffect(() => {
    const enable = () => setRenderBelowFold(true);

    const win = window as unknown as {
      requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof win.requestIdleCallback === "function") {
      const handle = win.requestIdleCallback(enable, { timeout: 1200 });
      return () => win.cancelIdleCallback?.(handle);
    }

    const timeoutId = setTimeout(enable, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!renderBelowFold || typeof window === "undefined") return;
    if (!window.location.hash) return;

    const hash = window.location.hash;
    const start = performance.now();
    let raf = 0;

    const tryScroll = () => {
      const target = document.querySelector(hash);
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ block: "start" });
        return;
      }

      if (performance.now() - start < 2500) {
        raf = window.requestAnimationFrame(tryScroll);
      }
    };

    raf = window.requestAnimationFrame(tryScroll);
    return () => window.cancelAnimationFrame(raf);
  }, [renderBelowFold]);

  return (
    <>
      <MetaHead {...seo.home} />
      <SiteStructuredData faqs={faqs} />
      <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Removed animated background as requested */}
      
      {/* Content overlay */}
      <div className="relative z-10">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:text-paper focus:shadow-none focus:border focus:border-border"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">
          {/* Critical content loaded immediately */}
          <Hero />
          
          {/* Below-the-fold content mounts after first paint */}
          {renderBelowFold && (
            <>
              <Suspense fallback={<SectionLoader />}>
                <Features />
              </Suspense>
          
              <Suspense fallback={<SectionLoader />}>
                <Pricing />
              </Suspense>
          
              <Suspense fallback={<SectionLoader />}>
                <Testimonials />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <PlanPreviewSection />
              </Suspense>
          
              <Suspense fallback={<SectionLoader />}>
                <FAQ />
              </Suspense>
            </>
          )}
        </main>
        
        {renderBelowFold && (
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
        )}
      </div>
      </div>
    </>
  );
}
