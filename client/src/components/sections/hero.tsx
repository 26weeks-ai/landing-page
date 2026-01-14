import { useEffect, useState, type CSSProperties } from 'react';
import WaitlistForm from '@/components/waitlist-form';
import { hero } from '@/content/brand';
import { Masthead } from '@/components/editorial/masthead';
import { CheckCircle2 } from 'lucide-react';

const marathonRouteSvgs = import.meta.glob(
  "../../assets/marathon-routes/svgs/*.svg",
  {
    eager: true,
    query: "?raw",
    import: "default",
  },
) as Record<string, string>;

type RouteBounds = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

type RouteAsset = { id: string; d: string; bounds: RouteBounds };

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

function extractPathData(raw: string): string | null {
  const match = raw.match(/<path[^>]*\sd="([^"]+)"[^>]*\/?>/i);
  return match?.[1] ?? null;
}

function extractPathBounds(d: string): RouteBounds | null {
  const numbers = d.match(/-?\d*\.?\d+/g);
  if (!numbers || numbers.length < 2) return null;

  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  for (let index = 0; index + 1 < numbers.length; index += 2) {
    const x = Number.parseFloat(numbers[index] ?? "");
    const y = Number.parseFloat(numbers[index + 1] ?? "");

    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  if (!Number.isFinite(minX) || !Number.isFinite(minY)) return null;

  return { minX, maxX, minY, maxY };
}

function isRouteAsset(asset: RouteAsset | null): asset is RouteAsset {
  return Boolean(asset);
}

const ROUTE_ASSETS: RouteAsset[] = Object.entries(marathonRouteSvgs)
  .map(([path, raw]) => {
    const fileName = path.split("/").pop() ?? path;
    const id = fileName.replace(/\.svg$/i, "");
    const d = extractPathData(raw);
    if (!d) return null;
    const bounds = extractPathBounds(d);
    if (!bounds) return null;
    return { id, d, bounds };
  })
  .filter(isRouteAsset)
  .sort((a, b) => a.id.localeCompare(b.id));

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

type Obb = {
  cx: number;
  cy: number;
  halfW: number;
  halfH: number;
  ux: number;
  uy: number;
  vx: number;
  vy: number;
};

function createObb(
  cx: number,
  cy: number,
  halfW: number,
  halfH: number,
  theta: number,
): Obb {
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  return {
    cx,
    cy,
    halfW,
    halfH,
    ux: cos,
    uy: sin,
    vx: -sin,
    vy: cos,
  };
}

function projectRadius(box: Obb, axisX: number, axisY: number): number {
  const uDot = Math.abs(box.ux * axisX + box.uy * axisY);
  const vDot = Math.abs(box.vx * axisX + box.vy * axisY);
  return box.halfW * uDot + box.halfH * vDot;
}

function obbIntersects(a: Obb, b: Obb): boolean {
  const dx = b.cx - a.cx;
  const dy = b.cy - a.cy;

  const axes: Array<[number, number]> = [
    [a.ux, a.uy],
    [a.vx, a.vy],
    [b.ux, b.uy],
    [b.vx, b.vy],
  ];

  for (const [axisX, axisY] of axes) {
    const centerDistance = Math.abs(dx * axisX + dy * axisY);
    const ra = projectRadius(a, axisX, axisY);
    const rb = projectRadius(b, axisX, axisY);
    if (centerDistance > ra + rb) return false;
  }

  return true;
}

function pickDistinctIndices(total: number, count: number): number[] {
  return shuffled(Array.from({ length: total }, (_, index) => index)).slice(0, count);
}

function getRouteBaseSizePx(): number {
  const width = typeof window === "undefined" ? 1200 : window.innerWidth;
  const height = typeof window === "undefined" ? 800 : window.innerHeight;
  const minDim = Math.min(width, height);
  // Base is ~old grid-cell sizing; buildHeroBackdrop scales this up to ~1.5×.
  return clamp(minDim * 0.25, 120, 360);
}

function packRoutes(args: {
  routeSizePx: number;
  targetCount: number;
  minCount: number;
  viewportWidth: number;
  viewportHeight: number;
}): HeroRoute[] {
  const { routeSizePx, targetCount, minCount, viewportWidth, viewportHeight } = args;
  const pixelsPerUnit = routeSizePx / 100;

  const passes = [
    { safePadFactor: 0.95, collisionPad: 18, baseMin: 0.9, baseMax: 1.06, boostMin: 0.05, boostMax: 0.16, clampMin: 0.86, clampMax: 1.18 },
    { safePadFactor: 1.1, collisionPad: 16, baseMin: 0.88, baseMax: 1.04, boostMin: 0.04, boostMax: 0.14, clampMin: 0.84, clampMax: 1.16 },
    { safePadFactor: 1.25, collisionPad: 14, baseMin: 0.86, baseMax: 1.02, boostMin: 0.03, boostMax: 0.12, clampMin: 0.82, clampMax: 1.14 },
    { safePadFactor: 1.45, collisionPad: 12, baseMin: 0.84, baseMax: 1.0, boostMin: 0.03, boostMax: 0.1, clampMin: 0.8, clampMax: 1.12 },
  ];

  let best: HeroRoute[] = [];

  for (const pass of passes) {
    const placed: HeroRoute[] = [];
    const placedBoxes: Obb[] = [];
    const pool = shuffled(ROUTE_ASSETS);
    const safePad = routeSizePx * pass.safePadFactor;

    for (const asset of pool) {
      if (placed.length >= targetCount) break;

      const boundsW = asset.bounds.maxX - asset.bounds.minX;
      const boundsH = asset.bounds.maxY - asset.bounds.minY;
      const boundsCenterX = (asset.bounds.minX + asset.bounds.maxX) / 2;
      const boundsCenterY = (asset.bounds.minY + asset.bounds.maxY) / 2;

      const attemptLimit = 620;

      for (let attempt = 0; attempt < attemptLimit; attempt += 1) {
        const edgeBias = Math.random() < 0.72;

        const sampleEdge = (max: number) => {
          const band = max * 0.18;
          return Math.random() < 0.5
            ? randomBetween(-safePad, band)
            : randomBetween(max - band, max + safePad);
        };

        const x = edgeBias
          ? sampleEdge(viewportWidth)
          : randomBetween(-safePad, viewportWidth + safePad);
        const y = edgeBias
          ? sampleEdge(viewportHeight)
          : randomBetween(-safePad, viewportHeight + safePad);

        const leftPct = (x / viewportWidth) * 100;
        const topPct = (y / viewportHeight) * 100;

        const centerDx = (leftPct - 50) / 50;
        const centerDy = (topPct - 46) / 54;
        const centerDistance = Math.sqrt(centerDx * centerDx + centerDy * centerDy);
        const edgeFactor = clamp((centerDistance - 0.12) / 0.95, 0, 1);

        const scale = clamp(
          randomBetween(pass.baseMin, pass.baseMax) + edgeFactor * randomBetween(pass.boostMin, pass.boostMax),
          pass.clampMin,
          pass.clampMax,
        );

        const rotateDeg = randomBetween(-18, 18);
        const theta = (rotateDeg * Math.PI) / 180;
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);

        const halfW = (boundsW * pixelsPerUnit * scale) / 2 + pass.collisionPad + 3;
        const halfH = (boundsH * pixelsPerUnit * scale) / 2 + pass.collisionPad + 3;

        const offsetX = boundsCenterX * pixelsPerUnit * scale;
        const offsetY = boundsCenterY * pixelsPerUnit * scale;
        const centerX = x + offsetX * cos - offsetY * sin;
        const centerY = y + offsetX * sin + offsetY * cos;

        const radius = Math.sqrt(halfW * halfW + halfH * halfH);
        if (
          centerX + radius < 0 ||
          centerX - radius > viewportWidth ||
          centerY + radius < 0 ||
          centerY - radius > viewportHeight
        ) {
          continue;
        }

        const candidate = createObb(centerX, centerY, halfW, halfH, theta);
        const collides = placedBoxes.some((existing) => obbIntersects(existing, candidate));
        if (collides) continue;

        const opacity = clamp(
          randomBetween(0.042, 0.078) + edgeFactor * randomBetween(0.045, 0.11),
          0.032,
          0.17,
        );

        const opacityHot = clamp(
          opacity + randomBetween(0.045, 0.09) + edgeFactor * randomBetween(0.02, 0.08),
          opacity + 0.04,
          0.28,
        );

        const blurPx = clamp(
          randomBetween(0, 0.85) + (1 - edgeFactor) * randomBetween(0.15, 0.85),
          0,
          1.7,
        );

        const glintDurationS = randomBetween(36, 54);

        placed.push({
          key: `${asset.id}-${placed.length}`,
          d: asset.d,
          left: leftPct,
          top: topPct,
          scale,
          rotateDeg,
          opacity,
          opacityHot,
          blurPx,
          floatX: randomBetween(-1.8, 1.8),
          floatY: randomBetween(-1.8, 1.8),
          floatRotateDeg: 0,
          floatDurationS: randomBetween(14, 26),
          floatDelayS: randomBetween(-18, 0),
          glintDurationS,
          glintDelayS: randomBetween(-glintDurationS, 0),
        });

        placedBoxes.push(candidate);
        break;
      }
    }

    if (placed.length > best.length) best = placed;
    if (placed.length >= minCount) return placed;
  }

  return best;
}

function buildHeroBackdrop(): HeroBackdrop {
  const targetCount = randomInt(15, 20);
  const baseRouteSizePx = getRouteBaseSizePx();
  const minCount = Math.min(15, ROUTE_ASSETS.length);
  const viewportWidth = typeof window === "undefined" ? 1200 : window.innerWidth;
  const viewportHeight = typeof window === "undefined" ? 800 : window.innerHeight;

  const sizeMultipliers: number[] = [];
  for (let multiplier = 1.5; multiplier > 1; multiplier -= 0.08) {
    sizeMultipliers.push(multiplier);
  }
  sizeMultipliers.push(1);
  sizeMultipliers.push(0.92);
  sizeMultipliers.push(0.84);
  sizeMultipliers.push(0.76);
  sizeMultipliers.push(0.68);
  sizeMultipliers.push(0.6);

  let bestRoutes: HeroRoute[] = [];
  let bestSizePx = baseRouteSizePx;

  for (const multiplier of sizeMultipliers) {
    const routeSizePx = baseRouteSizePx * multiplier;
    const routes = packRoutes({
      routeSizePx,
      targetCount,
      minCount,
      viewportWidth,
      viewportHeight,
    });

    if (routes.length > bestRoutes.length) {
      bestRoutes = routes;
      bestSizePx = routeSizePx;
    }

    if (routes.length >= minCount) {
      return { routeSizePx, routes: routes.slice(0, targetCount) };
    }
  }

  return {
    routeSizePx: bestSizePx,
    routes: bestRoutes.slice(0, Math.min(targetCount, bestRoutes.length)),
  };
}

function MarathonRoutesBackdrop({ isHovered }: { isHovered: boolean }) {
  const [backdrop] = useState(() => buildHeroBackdrop());
  const { routeSizePx, routes } = backdrop;
  const glintCount = Math.min(3, routes.length);

  const [glintIndices, setGlintIndices] = useState(() =>
    pickDistinctIndices(routes.length, glintCount),
  );

  useEffect(() => {
    if (routes.length === 0) return;

    setGlintIndices(pickDistinctIndices(routes.length, glintCount));
  }, [routes.length, glintCount]);

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

  return (
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
  );
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  
  // Simple CSS animations instead of heavy framer-motion
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden pt-28 sm:pt-32 pb-16 sm:pb-20"
      role="banner"
      aria-label="Hero section - AI Marathon Coach introduction"
      data-hero-hovered={isHeroHovered ? "true" : "false"}
      onMouseEnter={() => setIsHeroHovered(true)}
      onMouseLeave={() => setIsHeroHovered(false)}
    >
      <div className="absolute inset-0 bg-background" aria-hidden="true" />
      <MarathonRoutesBackdrop isHovered={isHeroHovered} />

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
