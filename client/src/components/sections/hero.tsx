import { useEffect, useState } from 'react';
import WaitlistForm from '@/components/waitlist-form';
import { hero } from '@/content/brand';
import { Masthead } from '@/components/editorial/masthead';
import { Hairline } from '@/components/editorial/hairline';
import { CheckCircle2 } from 'lucide-react';

type PlanRow = { day: string; session: string; note: string };
type PlanPreview = { phaseLabel: string; rows: PlanRow[]; footer: string };

type Contour = { d: string; opacity: number; strokeWidth: number };

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function contourLoopPath(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  wobble: number,
  seed: number,
  steps = 56,
) {
  const points: Array<{ x: number; y: number }> = [];

  for (let index = 0; index < steps; index += 1) {
    const angle = (index / steps) * Math.PI * 2;
    const n1 = Math.sin(angle * 3 + seed) * 0.55 + Math.sin(angle * 7 + seed * 1.7) * 0.45;
    const n2 = Math.cos(angle * 4 + seed * 0.7) * 0.5 + Math.cos(angle * 9 + seed) * 0.5;

    const localRx = rx * (1 + wobble * n1);
    const localRy = ry * (1 + wobble * n2);

    points.push({
      x: cx + localRx * Math.cos(angle),
      y: cy + localRy * Math.sin(angle),
    });
  }

  const start = points[0];
  let d = `M ${start.x.toFixed(1)} ${start.y.toFixed(1)}`;
  for (let index = 1; index < points.length; index += 1) {
    const point = points[index];
    d += ` L ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
  }
  d += ' Z';
  return d;
}

function buildHeroContours(): Contour[] {
  const contours: Contour[] = [];
  const count = 10;

  for (let index = 0; index < count; index += 1) {
    const t = index / (count - 1);
    const rx = lerp(680, 210, t);
    const ry = lerp(380, 120, t);
    const cx = 760 + 52 * Math.sin(index * 0.78);
    const cy = 720 + 38 * Math.cos(index * 0.56);
    const wobble = lerp(0.065, 0.02, t);
    const opacity = lerp(0.12, 0.28, t);

    contours.push({
      d: contourLoopPath(cx, cy, rx, ry, wobble, 1.5 + index * 0.63),
      opacity,
      strokeWidth: lerp(1.05, 0.85, t),
    });
  }

  return contours;
}

const HERO_CONTOURS = buildHeroContours();

function clampWeek(week: number) {
  if (Number.isNaN(week)) return 6;
  return Math.min(26, Math.max(1, Math.round(week)));
}

function getPlanPreview(week: number): PlanPreview {
  const clampedWeek = clampWeek(week);
  const phase =
    clampedWeek <= 6 ? 'Base' : clampedWeek <= 14 ? 'Build' : clampedWeek <= 22 ? 'Peak' : 'Taper';

  if (phase === 'Base') {
    return {
      phaseLabel: 'BASE',
      rows: [
        { day: 'Tue', session: 'Easy intervals', note: 'short pickups • relaxed form' },
        { day: 'Thu', session: 'Steady aerobic', note: 'nose-breath pace • smooth cadence' },
        { day: 'Sat', session: 'Long run', note: 'time-on-feet • easy finish' },
      ],
      footer: 'Build consistency first—then we sharpen speed. Week volume ramps with recovery baked in.',
    };
  }

  if (phase === 'Build') {
    return {
      phaseLabel: 'BUILD',
      rows: [
        { day: 'Tue', session: 'Intervals', note: 'effort-led • adaptive pacing' },
        { day: 'Thu', session: 'Tempo', note: 'threshold work • form cues' },
        { day: 'Sat', session: 'Long run', note: 'fueling reminders • recovery checks' },
      ],
      footer: 'The plan tightens: fewer junk miles, more intent. You’ll feel fitter without feeling cooked.',
    };
  }

  if (phase === 'Peak') {
    return {
      phaseLabel: 'PEAK',
      rows: [
        { day: 'Tue', session: 'VO₂ intervals', note: 'fast-but-controlled • full recoveries' },
        { day: 'Thu', session: 'Race pace', note: 'dial the rhythm • cadence + breath' },
        { day: 'Sat', session: 'Long run', note: 'confidence builder • steady negatives' },
      ],
      footer: 'Peak weeks are about specificity: race-pace rhythm, durable legs, and calm confidence.',
    };
  }

  return {
    phaseLabel: 'TAPER',
    rows: [
      { day: 'Tue', session: 'Strides', note: 'pop + snap • stay loose' },
      { day: 'Thu', session: 'Short tempo', note: 'taste of pace • leave fresh' },
      { day: 'Sat', session: 'Easy long', note: 'shorter • smooth' },
    ],
    footer: 'We keep the edge while shedding fatigue. You arrive sharp, rested, and ready to race.',
  };
}

type TrackBackdropProps = {
  week: number;
};

function CourseMapBackdrop({ week }: TrackBackdropProps) {
  const clampedWeek = clampWeek(week);
  const progress = (clampedWeek - 1) / 25;
  const progressLength = 1000;

  const routePath =
    'M 62 628 C 210 520, 394 506, 536 588 C 664 664, 748 716, 878 694 C 1026 670, 1120 604, 1208 522';

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

          <linearGradient id="hero-copper" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="hsl(var(--copper-700))" stopOpacity="0.78" />
            <stop offset="0.42" stopColor="hsl(var(--copper-500))" stopOpacity="0.98" />
            <stop offset="0.62" stopColor="hsl(var(--sand-500))" stopOpacity="0.6" />
            <stop offset="1" stopColor="hsl(var(--copper-700))" stopOpacity="0.76" />
          </linearGradient>

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

          <g opacity="0.95">
            {HERO_CONTOURS.map((contour) => (
              <path
                key={contour.d}
                d={contour.d}
                fill="none"
                stroke="hsl(var(--paper) / 0.08)"
                strokeWidth={contour.strokeWidth}
                opacity={contour.opacity}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            ))}
          </g>

          <g opacity="0.92">
            <text
              x="560"
              y="640"
              fontFamily="Spectral, ui-serif, Georgia, serif"
              fontSize="560"
              fontWeight="700"
              letterSpacing="-0.04em"
              fill="none"
              stroke="hsl(var(--paper) / 0.06)"
              strokeWidth="2.2"
            >
              26
            </text>
            <text
              x="560"
              y="640"
              fontFamily="Spectral, ui-serif, Georgia, serif"
              fontSize="560"
              fontWeight="700"
              letterSpacing="-0.04em"
              fill="none"
              stroke="hsl(var(--midnight-200) / 0.08)"
              strokeWidth="1.3"
              opacity="0.7"
            >
              26
            </text>
          </g>

          <path
            d={routePath}
            stroke="hsl(var(--paper) / 0.12)"
            strokeWidth="4.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.22"
          />
          <path
            d={routePath}
            stroke="hsl(var(--paper) / 0.12)"
            strokeWidth="2.35"
            fill="none"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d={routePath}
            pathLength={progressLength}
            stroke="url(#hero-copper)"
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${progressLength} ${progressLength}`}
            strokeDashoffset={progressLength * (1 - progress)}
            opacity="0.95"
            style={{ transition: 'stroke-dashoffset 520ms cubic-bezier(0.2, 0.9, 0.2, 1)' }}
          />

          <path
            d={routePath}
            stroke="hsl(var(--paper) / 0.16)"
            strokeWidth="1.05"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="10 18"
            opacity="0.55"
          />
        </g>

        <rect width="1200" height="800" fill="url(#hero-vignette)" />
      </svg>
    </div>
  );
}

type WeekScrubberProps = {
  week: number;
  phaseLabel: string;
  onChange: (week: number) => void;
  className?: string;
};

function WeekScrubber({ week, phaseLabel, onChange, className }: WeekScrubberProps) {
  const clampedWeek = clampWeek(week);
  const weekLabel = String(clampedWeek).padStart(2, '0');
  const weekPos = ((clampedWeek - 1) / 25) * 100;

  return (
    <div
      className={`rounded-2xl border border-border/70 bg-transparent px-5 py-4 ${className ?? ''}`}
      style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-paper-muted">
          WEEK {weekLabel} / 26
        </p>
        <span className="text-xs font-semibold uppercase tracking-[0.26em] text-paper-secondary">
          {phaseLabel}
        </span>
      </div>

      <div className="relative mt-4 h-10" aria-label="Week selector">
        <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 h-px bg-border/80" />
        <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 h-px bg-copper-500/70" style={{ width: `calc(${weekPos}% + 0.25rem)` }} />

        <div className="pointer-events-none absolute inset-x-1 top-1/2 -translate-y-1/2 flex justify-between opacity-75">
          {Array.from({ length: 26 }, (_, index) => {
            const isMajor = index % 5 === 0 || index === 25;
            return (
              <span
                key={index}
                className={`w-px ${isMajor ? 'h-3 bg-paper/22' : 'h-2 bg-paper/14'}`}
              />
            );
          })}
        </div>

        <div className="pointer-events-none absolute top-1/2 -translate-y-1/2" style={{ left: `${weekPos}%` }}>
          <div className="-translate-x-1/2">
            <div className="h-4 w-[2px] rounded-full bg-copper-500 shadow-[0_0_0_6px_hsl(var(--copper-500)_/_0.10)]" />
          </div>
        </div>

        <input
          type="range"
          min={1}
          max={26}
          step={1}
          value={clampedWeek}
          onChange={(event) => onChange(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label="Select week"
        />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-paper-secondary">
        Drag to preview the training arc—base, build, peak, taper.
      </p>
    </div>
  );
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [week, setWeek] = useState(6);
  
  // Simple CSS animations instead of heavy framer-motion
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const planPreview = getPlanPreview(week);
  const weekLabel = String(clampWeek(week)).padStart(2, '0');

  return (
    <section 
      className="relative min-h-[100svh] overflow-hidden pt-28 sm:pt-32 pb-16 sm:pb-20"
      role="banner"
      aria-label="Hero section - AI Marathon Coach introduction"
    >
      <div className="absolute inset-0 bg-background" aria-hidden="true" />
      <CourseMapBackdrop week={week} />

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
              className={`mt-10 transition-[opacity,transform] duration-500 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"} lg:hidden`}
              style={{ transitionDelay: "180ms" }}
            >
              <WeekScrubber week={week} phaseLabel={planPreview.phaseLabel} onChange={setWeek} />
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
            className={`transition-[opacity,transform] duration-500 ease-out lg:order-2 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            style={{ transitionDelay: "160ms" }}
          >
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-secondary">
                  Plan preview
                </p>
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-flex rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold tracking-[0.24em] text-paper-secondary">
                    {planPreview.phaseLabel}
                  </span>
                  <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold tracking-[0.18em] text-paper-secondary">
                    WEEK {weekLabel} / 26
                  </span>
                </div>
              </div>

              <Hairline className="my-5 opacity-70" />

              <div className="space-y-4">
                {planPreview.rows.map((row) => (
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
                {planPreview.footer}
              </p>
            </div>
          </div>

          <div
            className={`hidden transition-[opacity,transform] duration-500 ease-out lg:order-3 lg:col-span-2 lg:block ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            style={{ transitionDelay: "220ms" }}
          >
            <WeekScrubber week={week} phaseLabel={planPreview.phaseLabel} onChange={setWeek} />
          </div>
        </div>
      </div>
    </section>
  );
}
