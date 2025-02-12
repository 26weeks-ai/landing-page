import { motion } from 'framer-motion';
import WaitlistForm from '@/components/waitlist-form';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { hero, colors } from '@/content/copy';
import { AnimatedSphere } from './AnimatedSphere';

export default function Hero() {
  return (
    <section className="min-h-[90vh] relative overflow-hidden flex items-center">
      {/* Dark overlay for readability */}
      <div className="absolute inset-0" style={{ backgroundColor: colors.background.darkTransparent }} />

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_#FF6B00_0,_transparent_50%)] opacity-10" />

      {/* Animated Background */}
      <AnimatedSphere />

      <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="flex flex-col items-center justify-center gap-12">
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {hero.title.prefix}{' '}
              <span className="text-orange-500">{hero.title.highlight}</span>{' '}
              {hero.title.suffix}{' '}
              <span className="text-orange-500">{hero.title.highlightNumber}</span>{' '}
              {hero.title.suffixWeeks}
            </h1>

            <motion.p 
              className="text-xl text-neutral-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {hero.subtitle}
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-4 justify-center"
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