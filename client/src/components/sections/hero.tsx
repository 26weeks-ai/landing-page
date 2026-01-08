import { useEffect, useState } from 'react';
import WaitlistForm from '@/components/waitlist-form';
import { hero } from '@/content/brand';
import { Masthead } from '@/components/editorial/masthead';
import { Hairline } from '@/components/editorial/hairline';
import { CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Simple CSS animations instead of heavy framer-motion
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section 
      className="relative overflow-hidden pt-28 sm:pt-32 pb-16 sm:pb-20"
      role="banner"
      aria-label="Hero section - AI Marathon Coach introduction"
    >
      <div className="absolute inset-0 bg-background" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div
            className={`transition-[opacity,transform] duration-500 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            <Masthead
              kicker="AI MARATHON COACH"
              stamp="EDITION 01"
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
              className={`mt-8 flex flex-col gap-4 sm:flex-row sm:items-center transition-[opacity,transform] duration-500 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
              style={{ transitionDelay: "120ms" }}
            >
              <WaitlistForm label="Join the waitlist" />
              <a
                href="#pricing"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-transparent px-6 text-sm font-semibold text-paper hover:border-copper-500/70 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                See pricing
              </a>
            </div>

            <div
              className={`mt-10 grid max-w-xl gap-3 sm:grid-cols-2 transition-[opacity,transform] duration-500 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
              style={{ transitionDelay: "200ms" }}
              aria-label="Key trust points"
            >
              {[
                "Syncs with wearables + training logs",
                "Adjusts daily to recovery + effort",
                "Built for real schedules (not ideal ones)",
                "30-day money-back guarantee",
              ].map((line) => (
                <div key={line} className="flex items-start gap-3 text-sm text-paper-secondary">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-midnight-400" aria-hidden="true" strokeWidth={1.75} />
                  <span className="leading-relaxed">{line}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`transition-[opacity,transform] duration-500 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            style={{ transitionDelay: "160ms" }}
          >
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-secondary">
                  Plan preview
                </p>
                <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold tracking-[0.18em] text-paper-secondary">
                  WEEK 06 / 26
                </span>
              </div>

              <Hairline className="my-5 opacity-70" />

              <div className="space-y-4">
                {[
                  { day: "Tue", session: "Intervals", note: "effort-led, adaptive pacing" },
                  { day: "Thu", session: "Tempo", note: "threshold work + form cues" },
                  { day: "Sat", session: "Long run", note: "fueling reminders + recovery checks" },
                ].map((row) => (
                  <div key={row.day} className="grid grid-cols-[3.25rem_1fr] items-start gap-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-muted">
                      {row.day}
                    </div>
                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="font-semibold text-paper">{row.session}</p>
                        <span className="text-xs font-semibold tracking-[0.18em] text-midnight-300">
                          READY
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-paper-secondary">{row.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Hairline className="my-6 opacity-70" />

              <p className="text-sm leading-relaxed text-paper-secondary">
                Each session ships with mobility, cooldown guidance, and injury-prevention nudges—quietly delivered when you need them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
