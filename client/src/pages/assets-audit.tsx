import { Link } from "wouter";
import { MetaHead } from "@/components/MetaHead";
import { Masthead } from "@/components/editorial/masthead";
import { Hairline } from "@/components/editorial/hairline";
import { Button } from "@/components/ui/button";

type PreviewSize = {
  label: string;
  size: number;
  pixelated?: boolean;
};

const SECTION_CLASS = "rounded-3xl border border-border bg-card p-8";

function AssetRow({
  title,
  subtitle,
  href,
  sizes,
  background = "bg-background/30",
}: {
  title: string;
  subtitle: string;
  href: string;
  sizes: readonly PreviewSize[];
  background?: string;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-border/70 py-6 first:pt-0 last:border-none last:pb-0">
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="font-serif text-xl font-semibold tracking-[-0.02em] text-paper">{title}</h3>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold uppercase tracking-[0.22em] text-copper-400 underline decoration-copper-500/40 underline-offset-4 hover:text-copper-300"
          >
            Open asset
          </a>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-paper-secondary">{subtitle}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sizes.map((preview) => (
          <div
            key={`${href}-${preview.size}`}
            className={`rounded-2xl border border-border ${background} p-4`}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-muted">
                {preview.label}
              </p>
              <span className="text-xs font-semibold text-paper-muted">{preview.size}px</span>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <img
                src={href}
                alt={`${title} at ${preview.size}px`}
                width={preview.size}
                height={preview.size}
                className="rounded-xl border border-border/50 bg-background"
                style={
                  preview.pixelated
                    ? { imageRendering: "pixelated" as const }
                    : undefined
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AssetsAuditPage() {
  return (
    <>
      <MetaHead
        title="Assets audit"
        description="Internal page to review icons, thumbnails, and brand assets for consistency."
        url={`${typeof window !== "undefined" ? window.location.origin : "https://26weeks.ai"}/__assets`}
        type="website"
        noIndex
      />

      <div className="min-h-screen bg-background text-paper">
        <header className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <Masthead
                kicker="ASSETS"
                stamp="AUDIT"
                title={
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.06]">
                    Icons, thumbnails, and marks
                  </h1>
                }
                subtitle="Spot-check the shipped assets in realistic sizes to ensure typography, contrast, and cropping stay consistent with the noir editorial guidelines."
                showRule={false}
              />

              <Link href="/">
                <Button variant="outline" className="self-start">
                  Back to home
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl space-y-10 px-6 py-14">
          <section className={SECTION_CLASS}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-muted">
              Favicons (browser tab sizes)
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-paper-secondary">
              Favicons must remain legible at 16–32px. The recommended treatment is the copper “26” mark on ink — no supporting wordmark.
            </p>
            <Hairline className="my-6 opacity-70" />

            <AssetRow
              title="Favicon PNG"
              subtitle="Used by modern browsers for crisp tab icons."
              href="/favicon-32x32.png"
              sizes={[
                { label: "Actual", size: 32 },
                { label: "Zoom (pixel)", size: 160, pixelated: true },
                { label: "Zoom (smooth)", size: 160 },
                { label: "Small", size: 16 },
              ]}
            />
            <AssetRow
              title="Favicon ICO"
              subtitle="Multi-size fallback for older browsers."
              href="/favicon.ico"
              sizes={[
                { label: "32px", size: 32, pixelated: true },
                { label: "16px", size: 16, pixelated: true },
                { label: "48px", size: 48 },
                { label: "64px", size: 64 },
              ]}
            />
          </section>

          <section className={SECTION_CLASS}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-muted">
              App icons (PWA + device)
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-paper-secondary">
              These should match the mobile app icon art exactly: Spectral “26”, tracked Inter “WEEKS”, ink canvas, no gradients.
            </p>
            <Hairline className="my-6 opacity-70" />

            <AssetRow
              title="Android Chrome"
              subtitle="PWA icon sizes used by Chromium-based browsers."
              href="/android-chrome-512x512.png"
              sizes={[
                { label: "512", size: 128 },
                { label: "192", size: 96 },
                { label: "64", size: 64 },
                { label: "32", size: 32 },
              ]}
              background="bg-background/20"
            />
            <AssetRow
              title="Apple touch icon"
              subtitle="Pinned icon for iOS home screen."
              href="/apple-touch-icon.png"
              sizes={[
                { label: "180", size: 120 },
                { label: "96", size: 96 },
                { label: "64", size: 64 },
                { label: "32", size: 32 },
              ]}
              background="bg-background/20"
            />
          </section>

          <section className={SECTION_CLASS}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-muted">
              Logos (square exports)
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-paper-secondary">
              Used for press, docs, and any square placements. Corners vs rounded should be the same artwork with a different mask.
            </p>
            <Hairline className="my-6 opacity-70" />

            <AssetRow
              title="Logo — corners"
              subtitle="Square export (no mask)."
              href="/logo-corners-1080p.png"
              sizes={[
                { label: "256", size: 128 },
                { label: "128", size: 96 },
                { label: "64", size: 64 },
                { label: "32", size: 32 },
              ]}
              background="bg-background/20"
            />
            <AssetRow
              title="Logo — rounded"
              subtitle="Rounded mask export (used for avatar-like placements)."
              href="/logo-rounded-1080p.png"
              sizes={[
                { label: "256", size: 128 },
                { label: "128", size: 96 },
                { label: "64", size: 64 },
                { label: "32", size: 32 },
              ]}
              background="bg-background/20"
            />
          </section>

          <section className={SECTION_CLASS}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-muted">
              Social preview (OG)
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-paper-secondary">
              Used by Twitter/X, Slack, iMessage, and other link unfurlers. Keep it quiet and typographically crisp: ink, hairlines, copper accent, ivory body.
            </p>
            <Hairline className="my-6 opacity-70" />

            <div className="grid gap-6 lg:grid-cols-2">
              {[
                {
                  title: "OG image",
                  subtitle: "Default page thumbnail (`og:image` + `twitter:image`).",
                  href: "/og-image.png",
                },
                {
                  title: "Banner social",
                  subtitle: "Alternate export (should be identical treatment).",
                  href: "/banner-social.png",
                },
              ].map((asset) => (
                <div key={asset.href} className="rounded-3xl border border-border bg-background/20 p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-serif text-xl font-semibold tracking-[-0.02em] text-paper">{asset.title}</h3>
                    <a
                      href={asset.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold uppercase tracking-[0.22em] text-copper-400 underline decoration-copper-500/40 underline-offset-4 hover:text-copper-300"
                    >
                      Open
                    </a>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-paper-secondary">{asset.subtitle}</p>
                  <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-background">
                    <img src={asset.href} alt={asset.title} className="h-auto w-full" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-background/30 p-8">
            <h2 className="font-serif text-2xl font-semibold tracking-[-0.02em] text-paper">
              Quick checklist
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-paper-secondary">
              <li>Favicon: readable at 16px (no tiny text).</li>
              <li>Icon: matches mobile mark (Spectral “26”, tracked “WEEKS”).</li>
              <li>OG: 1200×630, ink canvas, copper used sparingly, no gradients.</li>
              <li>All assets: consistent copper/ink/ivory palette, no random font fallbacks.</li>
            </ul>
          </section>
        </main>
      </div>
    </>
  );
}

