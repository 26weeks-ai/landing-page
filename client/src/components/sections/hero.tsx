import { motion } from 'framer-motion';
import WaitlistForm from '@/components/waitlist-form';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const RunnerAnimation = () => {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full max-w-[400px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Runner Figure */}
        <motion.g
          initial={{ x: -10 }}
          animate={{ 
            x: 10,
            y: [0, -5, 0],
          }}
          transition={{ 
            x: { duration: 0.5, repeat: Infinity, repeatType: "reverse" },
            y: { duration: 0.5, repeat: Infinity, repeatType: "reverse" }
          }}
        >
          {/* Body */}
          <motion.path
            d="M100 70 L100 120"
            stroke="#FF6B00"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Head */}
          <motion.circle
            cx="100"
            cy="60"
            r="12"
            fill="#FF6B00"
          />
          {/* Arms */}
          <motion.path
            d="M100 80 L80 100 M100 80 L120 100"
            stroke="#FF6B00"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{ 
              d: [
                "M100 80 L80 100 M100 80 L120 100",
                "M100 80 L120 100 M100 80 L80 100",
              ]
            }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          />
          {/* Legs */}
          <motion.path
            d="M100 120 L80 150 M100 120 L120 150"
            stroke="#FF6B00"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{ 
              d: [
                "M100 120 L80 150 M100 120 L120 150",
                "M100 120 L120 150 M100 120 L80 150",
              ]
            }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          />
        </motion.g>

        {/* Track Line */}
        <motion.path
          d="M40 160 H160"
          stroke="#E5E5E5"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Distance Markers */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <circle cx="40" cy="160" r="3" fill="#FF6B00" />
          <circle cx="160" cy="160" r="3" fill="#FF6B00" />
        </motion.g>

        {/* Progress Effect */}
        <motion.circle
          cx="100"
          cy="160"
          r="4"
          fill="#FF6B00"
          initial={{ x: -60 }}
          animate={{ x: 60 }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>
    </motion.div>
  );
};

export default function Hero() {
  return (
    <section className="min-h-[90vh] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 relative overflow-hidden flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_#FF6B00_0,_transparent_50%)] opacity-10" />

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
              From Couch Potato to{' '}
              <span className="text-orange-500">Marathon Finisher</span>
              <br />in 26 Weeks
            </h1>

            <motion.p 
              className="text-xl text-neutral-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Personalized AI-powered coaching that adapts to your progress,
              <br className="hidden lg:block" />
              making your marathon dream a reality.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <WaitlistForm />

              <Button 
                variant="outline" 
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="relative w-full h-[400px] bg-gradient-to-br from-blue-600/20 to-orange-500/20 rounded-2xl backdrop-blur-sm border border-neutral-700">
              <RunnerAnimation />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,149.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}