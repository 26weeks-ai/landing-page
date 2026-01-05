import { Check, Clock, Lock } from 'lucide-react';
import WaitlistForm from '@/components/waitlist-form';
import { guarantee, trustPoints } from "@/content/brand";

const trustPointIcons = {
  "30-Day Trial": Clock,
  "No Contract": Check,
  "Secure Payment": Lock,
} as const;

export default function Guarantee() {
  return (
    <section 
      id="guarantee"
      className="py-24 bg-background scroll-mt-24"
      aria-label="Money-back guarantee and trust indicators"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div 
            className="bg-card border border-border rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 shadow-elev-2"
          >
            <div className="relative z-10 text-center">
              <div 
                className="w-20 h-20 bg-ring/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse"
              >
                <Check className="w-10 h-10 text-ring" aria-hidden="true" />
              </div>
              
              <h2 className="text-4xl font-semibold text-foreground mb-6">
                {guarantee.title}
              </h2>
              
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {guarantee.description}
              </p>
              
              <WaitlistForm />
            </div>
          </div>

          <div 
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          >
            {trustPoints.map((point) => {
              const Icon =
                trustPointIcons[point.title as keyof typeof trustPointIcons] ?? Check;

              return (
                <div
                  key={point.title}
                  className="bg-card border border-border rounded-2xl p-6 text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-elev-3"
                >
                  <div className="w-16 h-16 bg-secondary/12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-chart-4" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{point.title}</h3>
                  <p className="text-muted-foreground">{point.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
