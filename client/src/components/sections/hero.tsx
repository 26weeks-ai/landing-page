import { useEffect, useState } from 'react';
import WaitlistForm from '@/components/waitlist-form';
import { hero } from '@/content/brand';
import { Masthead } from '@/components/editorial/masthead';
import { CheckCircle2 } from 'lucide-react';

function CourseMapBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <radialGradient id="hero-haze" cx="82%" cy="14%" r="88%">
            <stop offset="0" stopColor="hsl(var(--midnight-500))" stopOpacity="0.18" />
            <stop offset="0.38" stopColor="hsl(var(--midnight-900))" stopOpacity="0.04" />
            <stop offset="0.74" stopColor="hsl(var(--copper-700))" stopOpacity="0.09" />
            <stop offset="1" stopColor="hsl(var(--background))" stopOpacity="0" />
          </radialGradient>

          <pattern id="hero-grid" width="96" height="96" patternUnits="userSpaceOnUse">
            <path
              d="M 96 0 H 0 V 96"
              fill="none"
              stroke="hsl(var(--paper) / 0.03)"
              strokeWidth="1"
            />
            <path
              d="M 48 0 V 96 M 0 48 H 96"
              fill="none"
              stroke="hsl(var(--paper) / 0.018)"
              strokeWidth="1"
            />
          </pattern>

          <pattern id="hero-speckle" width="160" height="160" patternUnits="userSpaceOnUse">
            <circle cx="18" cy="22" r="1.1" fill="hsl(var(--paper) / 0.04)" />
            <circle cx="52" cy="78" r="0.9" fill="hsl(var(--paper) / 0.03)" />
            <circle cx="104" cy="44" r="1.2" fill="hsl(var(--midnight-200) / 0.05)" />
            <circle cx="132" cy="118" r="0.8" fill="hsl(var(--paper) / 0.02)" />
            <circle cx="86" cy="132" r="0.7" fill="hsl(var(--copper-500) / 0.035)" />
            <circle cx="22" cy="128" r="0.6" fill="hsl(var(--midnight-300) / 0.045)" />
            <circle cx="148" cy="16" r="0.6" fill="hsl(var(--paper) / 0.02)" />
            <circle cx="78" cy="14" r="0.8" fill="hsl(var(--paper) / 0.028)" />
          </pattern>

          <linearGradient id="hero-art-fade-gradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="white" stopOpacity="1" />
            <stop offset="0.58" stopColor="white" stopOpacity="0.62" />
            <stop offset="1" stopColor="white" stopOpacity="0.09" />
          </linearGradient>

          <mask id="hero-art-fade">
            <rect width="1200" height="800" fill="url(#hero-art-fade-gradient)" />
          </mask>

          <radialGradient id="hero-vignette" cx="48%" cy="34%" r="88%">
            <stop offset="0" stopColor="hsl(var(--background))" stopOpacity="0" />
            <stop offset="0.62" stopColor="hsl(var(--background))" stopOpacity="0.22" />
            <stop offset="1" stopColor="hsl(var(--background))" stopOpacity="0.92" />
          </radialGradient>
        </defs>

        <rect width="1200" height="800" fill="hsl(var(--background))" />
        <rect width="1200" height="800" fill="url(#hero-haze)" opacity="0.95" />

        <g mask="url(#hero-art-fade)" className="opacity-95 sm:opacity-90 lg:opacity-85">
          <rect width="1200" height="800" fill="url(#hero-grid)" />
          <rect width="1200" height="800" fill="url(#hero-speckle)" opacity="0.55" />
        </g>

        <rect width="1200" height="800" fill="url(#hero-vignette)" />
      </svg>
    </div>
  );
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Simple CSS animations instead of heavy framer-motion
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden pt-28 sm:pt-32 pb-16 sm:pb-20"
      role="banner"
      aria-label="Hero section - AI Marathon Coach introduction"
    >
      <div className="absolute inset-0 bg-background" aria-hidden="true" />
      <CourseMapBackdrop />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl">
          <div
            className={`transition-[opacity,transform] duration-500 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            <Masthead
              kicker="AI MARATHON COACH"
              stamp="EDITION 01"
              align="center"
              title={
                <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.04]">
                  {hero.title.prefix}{" "}
                  <span className="text-copper-500">{hero.title.highlight}</span>,{" "}
                  {hero.title.suffix}{" "}
                  <span className="text-copper-500">{hero.title.highlightNumber}</span>{" "}
                  {hero.title.suffixWeeks}
                </h1>
              }
              subtitle={hero.subtitle}
              showRule={false}
            />

            <div
              className={`mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center transition-[opacity,transform] duration-500 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
              style={{ transitionDelay: "120ms" }}
            >
              <WaitlistForm label="Join the waitlist" />
              <a
                href="#pricing"
                className="inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-xl border border-border bg-transparent px-6 text-sm font-semibold text-paper hover:border-copper-500/70 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                See pricing
              </a>
            </div>

            <div
              className={`mt-10 mx-auto grid max-w-xl gap-3 sm:grid-cols-2 transition-[opacity,transform] duration-500 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
              style={{ transitionDelay: "200ms" }}
              aria-label="Key trust points"
            >
              {[
                "Starts from where you are",
                "Takes care of you",
                "Adapts to your progress",
                "Gets you to finish-line",
              ].map((line) => (
                <div key={line} className="flex items-start gap-3 text-sm text-paper-secondary">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-midnight-400" aria-hidden="true" strokeWidth={1.75} />
                  <span className="leading-relaxed">{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
