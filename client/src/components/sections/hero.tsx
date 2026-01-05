import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck, Sparkles, Watch } from "lucide-react";
import InlineWaitlistForm from "@/components/inline-waitlist-form";
import { hero } from "@/content/brand";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      className="relative isolate overflow-hidden bg-background pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20"
      role="banner"
      aria-label="Hero section - AI Marathon Coach introduction"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          {/* Copy */}
          <div
            className={`transition-all duration-700 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs uppercase tracking-[0.32em] text-muted-foreground">
              <Sparkles className="h-4 w-4 text-ring" aria-hidden="true" />
              Your AI marathon coach
            </p>

            <h1 className="mt-6 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] text-foreground">
              {hero.title.prefix}{" "}
              <span className="text-ring">{hero.title.highlight}</span>,{" "}
              {hero.title.suffix}{" "}
              <span className="text-ring">{hero.title.highlightNumber}</span>{" "}
              {hero.title.suffixWeeks}
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground">
              {hero.subtitle}
            </p>

            <div className="mt-10 max-w-xl space-y-3">
              <InlineWaitlistForm source="home-hero" />
              <a
                href="#features"
                aria-label="See product features"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                See what you get <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: Watch, label: "Wearables-ready", detail: "Garmin · Apple Watch · Strava" },
                { icon: ShieldCheck, label: "30‑day guarantee", detail: "Try it, track progress, decide" },
                { icon: Sparkles, label: "Adapts daily", detail: "Effort · recovery · schedule" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-card px-4 py-4 text-sm"
                >
                  <item.icon className="mt-0.5 h-5 w-5 text-ring" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="mt-1 text-subtle">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product-ish preview */}
          <div
            className={`relative transition-all duration-700 ease-out delay-100 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-elev-3">
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                      Week 7 · Today
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-foreground">
                      Tempo run + strides
                    </h3>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-secondary" />
                    Recovery: good
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { label: "Target", value: "RPE 7", accent: "bg-ring/12 text-ring" },
                    { label: "Time", value: "38–42m", accent: "bg-chart-4/12 text-chart-4" },
                    { label: "Goal", value: "Endurance", accent: "bg-chart-2/12 text-chart-2" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-border bg-muted p-4"
                    >
                      <p className="text-xs text-subtle">{stat.label}</p>
                      <p className="mt-1 text-sm font-semibold">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 ${stat.accent}`}
                        >
                          {stat.value}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-border bg-muted p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">Training load</p>
                    <p className="text-xs text-subtle">next 7 days</p>
                  </div>
                  <svg
                    className="mt-3 h-20 w-full"
                    viewBox="0 0 240 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Training load trend preview"
                  >
                    <path
                      d="M8 58 C 32 48, 44 46, 58 52 C 76 61, 92 66, 112 58 C 130 50, 140 34, 154 30 C 176 24, 188 30, 204 38 C 218 45, 228 50, 232 44"
                      stroke="hsl(var(--ring))"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 58 C 32 48, 44 46, 58 52 C 76 61, 92 66, 112 58 C 130 50, 140 34, 154 30 C 176 24, 188 30, 204 38 C 218 45, 228 50, 232 44 L232 80 L8 80 Z"
                      fill="hsl(var(--ring) / 0.08)"
                    />
                    <circle cx="232" cy="44" r="4.5" fill="hsl(var(--chart-2))" />
                  </svg>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    { day: "Sat", label: "Long run", value: "12 mi", dot: "bg-ring" },
                    { day: "Mon", label: "Easy run", value: "35 min", dot: "bg-chart-4" },
                    { day: "Wed", label: "Intervals", value: "6×400", dot: "bg-secondary" },
                  ].map((row) => (
                    <div
                      key={row.day}
                      className="flex items-center justify-between rounded-2xl border border-border bg-muted px-4 py-3 text-sm"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`h-2 w-2 rounded-full ${row.dot}`} aria-hidden="true" />
                        <span className="text-subtle">{row.day}</span>
                        <span className="truncate font-medium text-foreground">{row.label}</span>
                      </div>
                      <span className="shrink-0 text-muted-foreground">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border bg-background/30 px-6 py-4 text-xs text-subtle">
                Built on proven training principles — personalized by your data.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
