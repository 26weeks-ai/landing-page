import { Star } from 'lucide-react';
import { testimonials, type Testimonial } from '@/content/brand';

export default function Testimonials() {
  return (
    <section 
      id="testimonials" 
      className="py-20 bg-neutral-50 scroll-mt-24"
      aria-label="Customer testimonials and reviews"
    >
      <div className="container mx-auto px-4">
        <div 
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            {testimonials.title}
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            {testimonials.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.reviews.map((testimonial: Testimonial, index: number) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name}, ${testimonial.role}`}
                  className="w-16 h-16 rounded-full mr-4"
                  loading="lazy"
                />
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-neutral-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4" role="img" aria-label={`${testimonial.stars} out of 5 stars rating`}>
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" aria-hidden="true" />
                ))}
              </div>

              <p className="text-neutral-700 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
