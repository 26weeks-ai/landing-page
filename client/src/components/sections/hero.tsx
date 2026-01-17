import { useEffect, useState, type CSSProperties } from 'react';
import WaitlistForm from '@/components/waitlist-form';
import { hero } from '@/content/brand';
import { Masthead } from '@/components/editorial/masthead';
import { CheckCircle2 } from 'lucide-react';
import type { RouteAsset } from '@/assets/marathon-routes/route-assets';

type HeroRoute = {
  key: string;
  d: string;
  left: number;
  top: number;
  scale: number;
  rotateDeg: number;
  opacity: number;
  opacityHot: number;
  blurPx: number;
  floatX: number;
  floatY: number;
  floatRotateDeg: number;
  floatDurationS: number;
  floatDelayS: number;
  glintDurationS: number;
  glintDelayS: number;
};

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function randomInt(min: number, max: number): number {
  return Math.floor(randomBetween(min, max + 1));
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

type HeroBackdrop = {
  routeSizePx: number;
  routes: HeroRoute[];
};

function pickDistinctIndices(total: number, count: number): number[] {
  return shuffled(Array.from({ length: total }, (_, index) => index)).slice(0, count);
}

function getRouteBaseSizePx(): number {
  const width = typeof window === "undefined" ? 1200 : window.innerWidth;
  const height = typeof window === "undefined" ? 800 : window.innerHeight;
  const minDim = Math.min(width, height);
  // Base is roughly the hero motif size; buildHeroBackdrop scales this up further.
  return clamp(minDim * 0.25, 120, 360);
}

function buildHeroBackdrop(routeAssets: RouteAsset[]): HeroBackdrop {
  if (routeAssets.length === 0) {
    return { routeSizePx: getRouteBaseSizePx(), routes: [] };
  }

  const targetCount = Math.min(randomInt(12, 16), routeAssets.length);
  const baseRouteSizePx = getRouteBaseSizePx();
  const routeSizePx = clamp(baseRouteSizePx * 2.25, 240, 720);

  const pool = shuffled(routeAssets).slice(0, targetCount);

  const sampleBiasedPct = () => {
    const edgeBias = Math.random() < 0.7;
    if (!edgeBias) return randomBetween(0, 100);

    const nearStart = Math.random() < 0.5;
    return nearStart ? randomBetween(-6, 24) : randomBetween(76, 106);
  };

  const routes: HeroRoute[] = pool.map((asset, index) => {
    const leftPct = sampleBiasedPct();
    const topPct = sampleBiasedPct();

    const centerDx = (leftPct - 50) / 50;
    const centerDy = (topPct - 46) / 54;
    const centerDistance = Math.sqrt(centerDx * centerDx + centerDy * centerDy);
    const edgeFactor = clamp((centerDistance - 0.12) / 0.95, 0, 1);

    const scale = clamp(
      randomBetween(0.92, 1.08) + edgeFactor * randomBetween(0.08, 0.2),
      0.88,
      1.22,
    );

    const opacity = clamp(
      randomBetween(0.052, 0.085) + edgeFactor * randomBetween(0.05, 0.14),
      0.04,
      0.22,
    );

    const opacityHot = clamp(
      opacity + randomBetween(0.055, 0.11) + edgeFactor * randomBetween(0.02, 0.07),
      opacity + 0.05,
      0.3,
    );

    const blurPx = clamp(
      randomBetween(0, 0.9) + (1 - edgeFactor) * randomBetween(0.1, 0.85),
      0,
      1.7,
    );

    const glintDurationS = randomBetween(58, 86);

    return {
      key: `${asset.id}-${index}`,
      d: asset.d,
      left: leftPct,
      top: topPct,
      scale,
      rotateDeg: randomBetween(-18, 18),
      opacity,
      opacityHot,
      blurPx,
      floatX: randomBetween(-1.9, 1.9),
      floatY: randomBetween(-1.9, 1.9),
      floatRotateDeg: 0,
      floatDurationS: randomBetween(16, 30),
      floatDelayS: randomBetween(-18, 0),
      glintDurationS,
      glintDelayS: randomBetween(-glintDurationS, 0),
    };
  });

  return { routeSizePx, routes };
}

function MarathonRoutesBackdrop({
  isHovered,
  routeAssets,
}: {
  isHovered: boolean;
  routeAssets: RouteAsset[];
}) {
  const [backdrop] = useState(() => buildHeroBackdrop(routeAssets));
  const { routeSizePx, routes } = backdrop;
  const [glintTarget] = useState(() => randomInt(6, 7));
  const glintCount = Math.min(glintTarget, routes.length);

  const [glintIndices, setGlintIndices] = useState(() =>
    pickDistinctIndices(routes.length, glintCount),
  );

  useEffect(() => {
    if (routes.length === 0) return;

    let scheduleId: number | undefined;

    const scheduleNext = () => {
      const nextDelayMs = randomBetween(
        isHovered ? 30000 : 42000,
        isHovered ? 46000 : 72000,
      );

      scheduleId = window.setTimeout(() => {
        setGlintIndices((current) => {
          if (routes.length <= glintCount) return current;

          const dropIndex = randomInt(0, current.length - 1);
          const used = new Set(current);
          used.delete(current[dropIndex]);

          const candidates = Array.from({ length: routes.length }, (_, index) => index).filter(
            (index) => !used.has(index),
          );

          const nextIndex = candidates[Math.floor(Math.random() * candidates.length)] ?? 0;
          const next = [...current];
          next[dropIndex] = nextIndex;
          return next;
        });

        scheduleNext();
      }, nextDelayMs);
    };

    scheduleNext();

    return () => {
      if (scheduleId) window.clearTimeout(scheduleId);
    };
  }, [routes.length, glintCount, isHovered]);

  if (routes.length === 0) return null;

  return (
    <div
      className="hero-routes-backdrop absolute inset-0"
      style={
        {
          "--route-size": `${routeSizePx.toFixed(0)}px`,
        } as CSSProperties
      }
    >
      {routes.map((route, index) => {
        const isGlinting = glintIndices.includes(index);

        return (
          <div
            key={route.key}
            className="hero-route-cell"
            style={
              {
                left: `${route.left}%`,
                top: `${route.top}%`,
                transform: "translate(-50%, -50%)",
                "--route-scale": route.scale.toFixed(3),
                "--route-rotate": `${route.rotateDeg.toFixed(2)}deg`,
                "--route-opacity": route.opacity.toFixed(3),
                "--route-opacity-hot": route.opacityHot.toFixed(3),
                "--route-blur": `${route.blurPx.toFixed(2)}px`,
                "--float-x": `${route.floatX.toFixed(1)}px`,
                "--float-y": `${route.floatY.toFixed(1)}px`,
                "--float-rotate": `${route.floatRotateDeg.toFixed(2)}deg`,
                "--float-duration": `${route.floatDurationS.toFixed(2)}s`,
                "--float-delay": `${route.floatDelayS.toFixed(2)}s`,
                "--glint-duration": `${route.glintDurationS.toFixed(2)}s`,
                "--glint-delay": `${route.glintDelayS.toFixed(2)}s`,
              } as CSSProperties
            }
          >
            <div className="hero-route">
              <div className="hero-route__transform">
                <div className="hero-route__float">
                  <svg
                    className="hero-route__svg"
                    viewBox="-50 -50 100 100"
                    focusable="false"
                    aria-hidden="true"
                  >
                    <path className="hero-route__path hero-route__path--base" d={route.d} />
                    {isGlinting ? (
                      <>
                        <path
                          className="hero-route__path hero-route__glint hero-route__glint--tail"
                          d={route.d}
                          pathLength="1000"
                        />
                        <path
                          className="hero-route__path hero-route__glint hero-route__glint--head"
                          d={route.d}
                          pathLength="1000"
                        />
                      </>
                    ) : null}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [routeAssets, setRouteAssets] = useState<RouteAsset[] | null>(null);
  const [shouldLoadRoutes, setShouldLoadRoutes] = useState(false);
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
    if (typeof window === "undefined") return;

    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;

    if (connection?.saveData || (connection?.effectiveType ?? "").includes("2g")) {
      return;
    }

    let triggered = false;

    const triggerLoad = () => {
      if (triggered) return;
      triggered = true;
      setShouldLoadRoutes(true);
    };

    const passiveOnce = { passive: true, once: true } as const;

    window.addEventListener("pointerdown", triggerLoad, passiveOnce);
    window.addEventListener("pointermove", triggerLoad, passiveOnce);
    window.addEventListener("touchstart", triggerLoad, passiveOnce);
    window.addEventListener("scroll", triggerLoad, passiveOnce);
    window.addEventListener("keydown", triggerLoad, { once: true });

    return () => {
      window.removeEventListener("pointerdown", triggerLoad);
      window.removeEventListener("pointermove", triggerLoad);
      window.removeEventListener("touchstart", triggerLoad);
      window.removeEventListener("scroll", triggerLoad);
      window.removeEventListener("keydown", triggerLoad);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!shouldLoadRoutes) return;
    if (prefersReducedMotion) return;
    if (routeAssets) return;
    if (typeof window === "undefined") return;

    let cancelled = false;

    const load = async () => {
      try {
        const module = await import('@/assets/marathon-routes/route-assets');
        if (cancelled) return;
        setRouteAssets(module.ROUTE_ASSETS);
      } catch (err) {
        // Decorative-only: ignore failures and keep the base hero background.
      }
    };

    const win = window as unknown as {
      requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof win.requestIdleCallback === "function") {
      const handle = win.requestIdleCallback(() => void load(), { timeout: 2000 });
      return () => {
        cancelled = true;
        win.cancelIdleCallback?.(handle);
      };
    }

    const timeoutId = window.setTimeout(() => void load(), 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [prefersReducedMotion, routeAssets, shouldLoadRoutes]);

  return (
	    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden py-24 sm:py-28"
      role="banner"
      aria-label="Hero section - AI Marathon Coach introduction"
      data-hero-hovered={isHeroHovered ? "true" : "false"}
      onMouseEnter={() => setIsHeroHovered(true)}
      onMouseLeave={() => setIsHeroHovered(false)}
    >
      <div className="absolute inset-0 bg-background" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={
            {
              background: [
                "radial-gradient(92% 84% at 82% 14%, hsl(var(--midnight-500) / 0.22) 0%, hsl(var(--midnight-900) / 0.08) 46%, transparent 72%)",
                "radial-gradient(70% 54% at 24% 18%, hsl(var(--copper-700) / 0.14) 0%, transparent 66%)",
                "radial-gradient(58% 48% at 64% 56%, hsl(var(--copper-500) / 0.06) 0%, transparent 70%)",
              ].join(","),
            } as CSSProperties
          }
        />

        {routeAssets ? (
          <MarathonRoutesBackdrop isHovered={isHeroHovered} routeAssets={routeAssets} />
        ) : null}

        <div
          className="absolute inset-0"
          style={
            {
              background:
                "radial-gradient(100% 92% at 50% 40%, transparent 0%, hsl(var(--background) / 0.38) 58%, hsl(var(--background) / 0.92) 100%)",
            } as CSSProperties
          }
        />
      </div>

	      <div className="relative mx-auto w-full max-w-6xl px-6">
	        <div className="mx-auto max-w-3xl">
	          <div>
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
	              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
	            >
	              <WaitlistForm label="Join the waitlist" />
	            </div>

	            <div
	              className="mt-10 mx-auto grid max-w-xl gap-3 sm:grid-cols-2"
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
