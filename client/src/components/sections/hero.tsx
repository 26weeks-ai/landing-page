import { useEffect, useState } from 'react';
import WaitlistForm from '@/components/waitlist-form';
import { hero } from '@/content/copy';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Hero() {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Simple CSS animations instead of heavy framer-motion
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section 
      className="min-h-[90vh] bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden flex items-center justify-center"
      role="banner"
      aria-label="Hero section - AI Marathon Coach introduction"
    >
      {/* Enhanced orange gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_#FF6B00_0,_transparent_60%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_#FF6B00_0,_transparent_50%)] opacity-10" />

      <div className="container mx-auto px-4 py-16 relative z-10 flex justify-center">
        <div className="max-w-3xl w-full">
          {/* Text Content with CSS transitions instead of Framer Motion */}
          <div 
            className={`text-center transition-opacity duration-500 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md">
              {hero.title.prefix}{' '}
              <span className="text-orange-500 inline-block">{hero.title.highlight}</span>,{' '}
              {hero.title.suffix}{' '}
              <span className="text-orange-500 inline-block">{hero.title.highlightNumber}</span>{' '}
              {hero.title.suffixWeeks}
            </h1>

            <p 
              className={`text-xl text-neutral-200 mb-8 max-w-2xl mx-auto transition-opacity duration-500 ease-out delay-150 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'} drop-shadow-sm`}
              style={{ 
                transitionDelay: '150ms' 
              }}
            >
              {hero.subtitle}
            </p>

            <div 
              className={`flex flex-col sm:flex-row items-center gap-4 justify-center transition-opacity duration-500 ease-out delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
              style={{ 
                transitionDelay: '300ms' 
              }}
            >
              <WaitlistForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
