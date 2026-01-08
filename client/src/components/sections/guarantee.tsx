import { Check, Clock, Lock } from 'lucide-react';
import WaitlistForm from '@/components/waitlist-form';
import { guarantee, trustPoints } from "@/content/brand";
import { Masthead } from "@/components/editorial/masthead";
import { Hairline } from "@/components/editorial/hairline";

const trustPointIcons = {
  "30-Day Trial": Clock,
  "No Contract": Check,
  "Secure Payment": Lock,
} as const;

export default function Guarantee() {
  return (
    <section 
      id="guarantee"
      className="py-20 scroll-mt-28"
      aria-label="Money-back guarantee and trust indicators"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Masthead
          kicker="GUARANTEE"
          stamp="CHAPTER 03"
          title={
            <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.08]">
              {guarantee.title}
            </h2>
          }
          subtitle={guarantee.description}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-secondary">
                The simple promise
              </p>
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold tracking-[0.18em] text-paper-secondary">
                30 DAYS
              </span>
            </div>

            <Hairline className="my-5 opacity-70" />

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                <Check className="h-5 w-5 text-copper-500" aria-hidden="true" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-base font-semibold text-paper">{guarantee.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-paper-secondary">
                  Train with us for 30 days. If you’re not satisfied, we refund every penny. No hoops. No negotiations.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <WaitlistForm label="Join the waitlist" />
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-secondary">
                Trust notes
              </p>
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold tracking-[0.18em] text-paper-secondary">
                DETAILS
              </span>
            </div>

            <Hairline className="my-5 opacity-70" />

            <div className="space-y-5">
              {trustPoints.map((point) => {
                const Icon =
                  trustPointIcons[point.title as keyof typeof trustPointIcons] ?? Check;

                return (
                  <div key={point.title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                      <Icon className="h-5 w-5 text-midnight-300" aria-hidden="true" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-paper">{point.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-paper-secondary">{point.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
