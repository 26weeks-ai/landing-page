import { useEffect, useState } from 'react';
import WaitlistForm from '@/components/waitlist-form';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
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
    <section className="min-h-[90vh] bg-gradient-to-br from-neutral-900/80 via-neutral-800/80 to-neutral-900/80 relative overflow-hidden flex items-center backdrop-blur-sm">
      {/* Background Pattern - static to improve performance */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_#FF6B00_0,_transparent_50%)] opacity-10" />

      <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content with CSS transitions instead of Framer Motion */}
          <div 
            className={`flex-1 text-center lg:text-left transition-opacity duration-500 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {hero.title.prefix}{' '}
              <span className="text-orange-500">{hero.title.highlight}</span>,{' '}
              {hero.title.suffix}{' '}
              <span className="text-orange-500">{hero.title.highlightNumber}</span>{' '}
              {hero.title.suffixWeeks}
            </h1>

            <p 
              className={`text-xl text-neutral-300 mb-8 max-w-2xl mx-auto lg:mx-0 transition-opacity duration-500 ease-out delay-150 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
              style={{ 
                transitionDelay: '150ms' 
              }}
            >
              {hero.subtitle}
            </p>

            <div 
              className={`flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start transition-opacity duration-500 ease-out delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
              style={{ 
                transitionDelay: '300ms' 
              }}
            >
              <WaitlistForm />

              <Button 
                variant="outline" 
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 sm:w-auto"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}