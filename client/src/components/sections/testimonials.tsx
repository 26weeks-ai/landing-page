import { Star } from 'lucide-react';
import { testimonials, type Testimonial } from '@/content/brand';

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
      className="py-24 bg-background scroll-mt-24"
      aria-label="Customer testimonials and reviews"
    >
      <div className="container mx-auto px-4">
        <div 
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-semibold text-foreground mb-4">
            {testimonials.title}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {testimonials.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.reviews.map((testimonial: Testimonial, index: number) => (
            <div
              key={index}
              className="bg-card border border-border rounded-3xl shadow-elev-2 p-8 transition-transform duration-200 hover:-translate-y-1 hover:shadow-elev-3"
            >
              <div className="flex items-center mb-6">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name}, ${testimonial.role}`}
                    className="w-16 h-16 rounded-full mr-4"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded-full mr-4 bg-background/40 border border-border text-foreground flex items-center justify-center font-semibold"
                    aria-hidden="true"
                  >
                    {getInitials(testimonial.name)}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{testimonial.name}</h3>
                  <p className="text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4" role="img" aria-label={`${testimonial.stars} out of 5 stars rating`}>
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-chart-2 fill-current" aria-hidden="true" />
                ))}
              </div>

              <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
