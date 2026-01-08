import { Star } from 'lucide-react';
import { testimonials, type Testimonial } from '@/content/brand';
import { Masthead } from "@/components/editorial/masthead";

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

export default function Testimonials() {
  return (
    <section 
      id="testimonials"
      className="py-20 scroll-mt-28"
      aria-label="Customer testimonials and reviews"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Masthead
          kicker="SUCCESS STORIES"
          stamp="CHAPTER 05"
          title={
            <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.08]">
              {testimonials.title}
            </h2>
          }
          subtitle={testimonials.subtitle}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {testimonials.reviews.map((testimonial: Testimonial, index: number) => (
            <div
              key={index}
              className="rounded-3xl border border-border bg-card p-6 sm:p-8 transition-colors hover:border-copper-500/70"
            >
              <div className="flex items-center mb-6">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name}, ${testimonial.role}`}
                    className="w-16 h-16 rounded-full mr-4 border border-border"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded-full mr-4 bg-background text-paper flex items-center justify-center font-semibold border border-border"
                    aria-hidden="true"
                  >
                    {getInitials(testimonial.name)}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg text-paper">{testimonial.name}</h3>
                  <p className="text-paper-secondary">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4" role="img" aria-label={`${testimonial.stars} out of 5 stars rating`}>
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-sand-500 fill-current" aria-hidden="true" strokeWidth={1.75} />
                ))}
              </div>

              <p className="font-serif text-lg leading-relaxed text-paper-secondary">“{testimonial.quote}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
