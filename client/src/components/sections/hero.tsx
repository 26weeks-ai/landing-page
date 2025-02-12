import { motion } from 'framer-motion';
import WaitlistForm from '@/components/waitlist-form';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { hero } from '@/content/copy';

export default function Hero() {
  return (
    <section className="min-h-[90vh] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 relative overflow-hidden flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_#FF6B00_0,_transparent_50%)] opacity-10" />

      {/* Curved Orange Bottom Design */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 200"
          className="w-full h-auto transform translate-y-1"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 200V100C240 33.3333 480 0 720 0C960 0 1200 33.3333 1440 100V200H0Z"
            className="fill-orange-500/10"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {hero.title.prefix}{' '}
              <span className="text-orange-500">{hero.title.highlight}</span>,{' '}
              {hero.title.suffix}{' '}
              <span className="text-orange-500">{hero.title.highlightNumber}</span>{' '}
              {hero.title.suffixWeeks}
            </h1>

            <motion.p 
              className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {hero.subtitle}
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}