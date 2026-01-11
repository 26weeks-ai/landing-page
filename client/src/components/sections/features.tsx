import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  Activity,
  LineChart,
  Timer,
  HeartPulse,
  Apple,
  Users,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { features, featuresList, raceCalendar, runningQuotes } from "@/content/brand";
import { Masthead } from "@/components/editorial/masthead";
import { Hairline } from "@/components/editorial/hairline";
import WaitlistForm from "@/components/waitlist-form";
import { ScrollArea } from "@/components/ui/scroll-area";

// Map Lucide icons to features
const featureIcons = {
  "Personalized & Adaptive": Brain,
  "Daily Check-ins": Timer,
  "Deep Integrations": Activity,
  "Progress Tracking": LineChart,
  "Injury Prevention": HeartPulse,
  "Nutrition Guide": Apple,
  "Community Support": Users,
  "Finish-Line Guarantee": ShieldCheck,
};

export default function Features() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % runningQuotes.length);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section 
      id="features"
      className="py-20 scroll-mt-28"
      aria-label="Key features and benefits of 26weeks.ai"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Masthead
          kicker={features.title.toUpperCase()}
          stamp="CHAPTER 02"
          title={
            <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.08]">
              {features.title}{" "}
              <span className="text-copper-500">{features.titleHighlight}</span>
            </h2>
          }
          subtitle={features.subtitle}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.55fr_0.45fr] lg:gap-12">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-secondary">
                What you get
              </p>
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold tracking-[0.18em] text-paper-secondary">
                MODULES
              </span>
            </div>

            <Hairline className="my-5 opacity-70" />

            <div className="divide-y divide-border">
              {featuresList.map((feature, index) => {
                const Icon =
                  featureIcons[feature.title as keyof typeof featureIcons] ?? Brain;

                const number = String(index + 1).padStart(2, "0");

                return (
                  <div key={feature.title} className="group py-6 first:pt-0 last:pb-0">
                    <div className="grid gap-4 sm:grid-cols-[3.25rem_1fr] sm:items-start">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-muted">
                        {number}
                      </div>
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-paper">
                            {feature.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-paper-secondary">
                            {feature.description}
                          </p>
                        </div>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background transition-colors group-hover:border-copper-500/70 group-hover:bg-accent">
                          <Icon className="h-5 w-5 text-paper-secondary group-hover:text-copper-400" strokeWidth={1.75} aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="rounded-3xl border border-border bg-card p-6 sm:p-8 flex flex-col">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-secondary">
                In the margins
              </p>
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold tracking-[0.18em] text-paper-secondary">
                QUOTE
              </span>
            </div>

            <Hairline className="my-5 opacity-70" />

            <div className="relative min-h-[10.5rem]">
              {prefersReducedMotion ? (
                <div className="absolute inset-0 flex items-center">
                  <div>
                    <p className="font-serif text-2xl leading-snug text-paper">
                      “{runningQuotes[currentQuoteIndex].quote}”
                    </p>
                    <p className="mt-4 text-sm font-semibold text-paper-secondary">
                      — {runningQuotes[currentQuoteIndex].author}
                    </p>
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuoteIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 flex items-center"
                  >
                    <div>
                      <p className="font-serif text-2xl leading-snug text-paper">
                        “{runningQuotes[currentQuoteIndex].quote}”
                      </p>
                      <p className="mt-4 text-sm font-semibold text-paper-secondary">
                        — {runningQuotes[currentQuoteIndex].author}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            <Hairline className="my-5 opacity-70" />

            <div className="mt-6 flex min-h-[18rem] flex-1 flex-col">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-secondary">
                  {raceCalendar.title}
                </p>
                <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold tracking-[0.18em] text-paper-secondary">
                  CERTIFIED
                </span>
              </div>

              <Hairline className="my-5 opacity-70" />

              <p className="text-sm leading-relaxed text-paper-secondary">
                {raceCalendar.subtitle}
              </p>

              <div className="mt-4 flex-1">
                <ScrollArea className="h-full pr-3">
                  <div className="space-y-3">
                    {raceCalendar.events.map((event) => (
                      <div
                        key={event.race}
                        className="group flex items-start gap-4 rounded-2xl border border-border bg-background/20 px-4 py-3 transition-colors hover:border-copper-500/50 hover:bg-accent"
                      >
                        <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-xl border border-border bg-background px-2 py-2 text-center">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-paper-muted">
                            {event.month}
                          </span>
                          <span className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-paper">
                            {event.window}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-semibold leading-snug text-paper">
                              {event.race}
                            </p>
                            <span className="shrink-0 rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-paper-muted">
                              {event.badge}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-paper-secondary">
                            {event.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-paper-muted">
                {raceCalendar.note}
              </p>

              <div className="mt-5">
                <WaitlistForm label="Get the full calendar" className="w-full" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
