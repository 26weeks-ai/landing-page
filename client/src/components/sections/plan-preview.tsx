import { useEffect, useRef, useState } from "react";
import { Masthead } from "@/components/editorial/masthead";
import { Hairline } from "@/components/editorial/hairline";

type PlanRow = { day: string; session: string; note: string; status?: string };
type PlanPreview = { phaseLabel: string; rows: PlanRow[]; footer: string };

function clampWeek(week: number) {
  if (Number.isNaN(week)) return 6;
  return Math.min(26, Math.max(1, Math.round(week)));
}

function getPlanPreview(week: number): PlanPreview {
  const clampedWeek = clampWeek(week);
  const phase =
    clampedWeek <= 6 ? "Base" : clampedWeek <= 14 ? "Build" : clampedWeek <= 22 ? "Peak" : "Taper";

  if (phase === "Base") {
    return {
      phaseLabel: "BASE",
      rows: [
        { day: "Mon", session: "Cross-train + strength", note: "hips + calves • easy core", status: "CRS" },
        { day: "Tue", session: "Easy intervals", note: "short pickups • relaxed form" },
        { day: "Wed", session: "Recovery", note: "walk + mobility • check soreness", status: "REC" },
        { day: "Thu", session: "Steady aerobic", note: "nose-breath pace • smooth cadence" },
        { day: "Sat", session: "Long run", note: "time-on-feet • easy finish" },
      ],
      footer:
        "Consistency first: cross-training for durability, recovery days that actually recover, and long runs that feel doable.",
    };
  }

  if (phase === "Build") {
    return {
      phaseLabel: "BUILD",
      rows: [
        { day: "Mon", session: "Cross-train", note: "bike/row • aerobic base", status: "CRS" },
        { day: "Tue", session: "Intervals", note: "effort-led • adaptive pacing" },
        { day: "Wed", session: "Recovery", note: "easy shakeout • mobility reset", status: "REC" },
        { day: "Thu", session: "Tempo", note: "threshold work • form cues" },
        { day: "Sat", session: "Long run", note: "fueling reminders • recovery checks" },
      ],
      footer:
        "Build weeks add intent without burnout—cross-training keeps you aerobic, recovery keeps you consistent, workouts get sharper.",
    };
  }

  if (phase === "Peak") {
    return {
      phaseLabel: "PEAK",
      rows: [
        { day: "Mon", session: "Strength + drills", note: "power + form • low volume", status: "CRS" },
        { day: "Tue", session: "VO₂ intervals", note: "fast-but-controlled • full recoveries" },
        { day: "Wed", session: "Recovery", note: "easy miles • soft tissue", status: "REC" },
        { day: "Thu", session: "Race pace", note: "dial the rhythm • cadence + breath" },
        { day: "Sat", session: "Long run", note: "confidence builder • steady negatives" },
      ],
      footer:
        "Peak is specificity: race-pace rhythm + confidence. Cross-training stays light; recovery is non‑negotiable.",
    };
  }

  return {
    phaseLabel: "TAPER",
    rows: [
      { day: "Mon", session: "Mobility + reset", note: "sleep • legs up • easy walk", status: "REC" },
      { day: "Tue", session: "Strides", note: "pop + snap • stay loose" },
      { day: "Wed", session: "Cross-train", note: "easy spin • keep blood moving", status: "CRS" },
      { day: "Thu", session: "Short tempo", note: "taste of pace • leave fresh" },
      { day: "Sat", session: "Easy run", note: "shorter • smooth" },
    ],
    footer:
      "Taper keeps the edge while shedding fatigue: a touch of intensity, light cross-training, and calm recovery.",
  };
}

type WeekScrubberProps = {
  week: number;
  phaseLabel: string;
  onChange: (week: number) => void;
  className?: string;
  variant?: "standalone" | "embedded";
};

function WeekScrubber({
  week,
  phaseLabel,
  onChange,
  className,
  variant = "standalone",
}: WeekScrubberProps) {
  const clampedWeek = clampWeek(week);
  const weekLabel = String(clampedWeek).padStart(2, "0");
  const weekPos = ((clampedWeek - 1) / 25) * 100;
  const isEmbedded = variant === "embedded";
  const trackRef = useRef<HTMLDivElement | null>(null);

  const setWeekFromPointer = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const inset = 4; // matches `inset-x-1` (0.25rem) used by the track lines
    const usableWidth = Math.max(1, rect.width - inset * 2);
    const x = Math.min(usableWidth, Math.max(0, clientX - (rect.left + inset)));
    const nextWeek = clampWeek(1 + (x / usableWidth) * 25);
    if (nextWeek !== clampedWeek) onChange(nextWeek);
  };

  return (
    <div
      className={`${isEmbedded ? "" : "rounded-2xl border border-border/70 px-5 py-4"} bg-transparent ${
        className ?? ""
      }`}
    >
      {!isEmbedded && (
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-paper-muted">
            WEEK {weekLabel} / 26
          </p>
          <span className="text-xs font-semibold uppercase tracking-[0.26em] text-paper-secondary">
            {phaseLabel}
          </span>
        </div>
      )}

      <div
        ref={trackRef}
        className={`${isEmbedded ? "relative h-10" : "relative mt-4 h-10"}`}
        aria-label="Week selector"
        onMouseMove={(event) => {
          if (event.buttons !== 0) return;
          setWeekFromPointer(event.clientX);
        }}
      >
        <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 h-px bg-border/80" />
        <div
          className="absolute inset-x-1 top-1/2 -translate-y-1/2 h-px bg-copper-500/70"
          style={{ width: `calc(${weekPos}% + 0.25rem)` }}
        />

        <div className="pointer-events-none absolute inset-x-1 top-1/2 -translate-y-1/2 flex justify-between opacity-75">
          {Array.from({ length: 26 }, (_, index) => {
            const isMajor = index % 5 === 0 || index === 25;
            return (
              <span
                key={index}
                className={`w-px ${isMajor ? "h-3 bg-paper/22" : "h-2 bg-paper/14"}`}
              />
            );
          })}
        </div>

        <div
          className="pointer-events-none absolute top-1/2 -translate-y-1/2"
          style={{ left: `${weekPos}%` }}
        >
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

      {!isEmbedded && (
        <p className="mt-3 text-sm leading-relaxed text-paper-secondary">
          Drag to preview the training arc—base, build, peak, taper.
        </p>
      )}
    </div>
  );
}

export default function PlanPreviewSection() {
  const [week, setWeek] = useState(6);
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollSyncRef = useRef<{ scrollY: number; week: number } | null>(null);
  const weekRef = useRef(week);
  const [isHoverPointer, setIsHoverPointer] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  });

  useEffect(() => {
    weekRef.current = week;
  }, [week]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handleChange = () => setIsHoverPointer(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isHoverPointer) return;
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const seed = scrollSyncRef.current ?? { scrollY: window.scrollY, week: weekRef.current };
      const section = sectionRef.current;

      if (!section) {
        scrollSyncRef.current = { scrollY: window.scrollY, week: seed.week };
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const inView = rect.bottom > 0 && rect.top < viewportHeight;

      if (!inView) {
        scrollSyncRef.current = { scrollY: window.scrollY, week: seed.week };
        return;
      }

      const scrollRange = Math.max(section.offsetHeight, viewportHeight);
      const scrollPerWeek = Math.max(1, scrollRange / 25);
      const deltaWeeks = (window.scrollY - seed.scrollY) / scrollPerWeek;
      const nextWeek = clampWeek(seed.week + deltaWeeks);

      if (nextWeek === seed.week) return;

      scrollSyncRef.current = { scrollY: window.scrollY, week: nextWeek };
      setWeek(nextWeek);
    };

    scrollSyncRef.current = { scrollY: window.scrollY, week: weekRef.current };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHoverPointer]);

  const handleWeekChange = (nextWeek: number) => {
    const clamped = clampWeek(nextWeek);
    setWeek(clamped);

    if (isHoverPointer) return;
    if (typeof window === "undefined") return;
    scrollSyncRef.current = { scrollY: window.scrollY, week: clamped };
  };

  const planPreview = getPlanPreview(week);
  const weekLabel = String(clampWeek(week)).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      id="plan-preview"
      className="py-20 scroll-mt-28"
      aria-label="Training plan preview"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Masthead
          kicker="TRAINING PLAN"
          stamp="CHAPTER 05"
          title={
            <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.08]">
              Sample training plan for anyone
            </h2>
          }
          subtitle="Scrub through weeks 1–26 and see how the training arc shifts from base to taper."
        />

        <div className="mt-12 mx-auto max-w-4xl">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-secondary">
                Plan preview
              </p>
              <div className="flex items-center gap-2">
                <span className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold tracking-[0.24em] text-paper-secondary">
                  {planPreview.phaseLabel}
                </span>
                <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold tracking-[0.18em] text-paper-secondary">
                  WEEK {weekLabel} / 26
                </span>
              </div>
            </div>

            <WeekScrubber
              week={week}
              phaseLabel={planPreview.phaseLabel}
              onChange={handleWeekChange}
              variant="embedded"
              className="mt-5"
            />

            <div className="mt-6 space-y-4">
              {planPreview.rows.map((row) => (
                <div key={row.day} className="grid grid-cols-[3.25rem_1fr] items-start gap-4">
                  <div className="pt-1 text-xs font-semibold uppercase tracking-[0.22em] text-paper-muted">
                    {row.day}
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-semibold text-paper">{row.session}</p>
                      {(() => {
                        const status = row.status ?? "RUN";
                        const statusClass =
                          status === "RUN"
                            ? "text-copper-500"
                            : status === "CRS"
                              ? "text-midnight-300"
                              : status === "REC"
                                ? "text-sand-500/80"
                                : "text-paper-secondary";

                        return (
                          <span className={`text-xs font-semibold tracking-[0.18em] ${statusClass}`}>
                            {status}
                          </span>
                        );
                      })()}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-paper-secondary">{row.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <Hairline className="my-6 opacity-70" />

            <p className="text-sm leading-relaxed text-paper-secondary lg:h-[2.9rem] lg:overflow-hidden lg:[display:-webkit-box] lg:[-webkit-box-orient:vertical] lg:[-webkit-line-clamp:2]">
              {planPreview.footer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
