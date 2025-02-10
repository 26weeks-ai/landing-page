import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RunningFigure = () => (
  <motion.svg
    width="50"
    height="50"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <motion.path
      d="M4 17l6-3m-3-3l3-7m5 13v-5.5l-2.5-2.5M14 17l-2-3"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
    <motion.circle cx="9" cy="6" r="1" />
  </motion.svg>
);

export default function Demo() {
  const [isRunning, setIsRunning] = useState(false);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const runnerControls = useAnimation();
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
        setDistance(prev => prev + 0.1); // 0.1km per second for demo
      }, 1000);
      
      // Animate runner
      runnerControls.start({
        x: ["0%", "100%"],
        transition: {
          duration: 3,
          ease: "linear",
          repeat: Infinity,
        }
      });
    } else {
      runnerControls.stop();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, runnerControls]);
  
  const handleReset = () => {
    setIsRunning(false);
    setDistance(0);
    setTime(0);
    runnerControls.stop();
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <section id="demo" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Experience Your Journey
            </h2>
            <p className="text-xl text-neutral-600">
              Watch your progress unfold in real-time with our interactive demo
            </p>
          </motion.div>

          <Card className="bg-neutral-50 border-2">
            <CardHeader>
              <CardTitle>Running Simulation</CardTitle>
              <CardDescription>See how far you can go</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-32 bg-gradient-to-r from-blue-100 to-orange-100 rounded-lg mb-8 overflow-hidden">
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 text-orange-500"
                  animate={runnerControls}
                >
                  <RunningFigure />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-2xl font-bold text-neutral-500 mix-blend-multiply">
                    {distance.toFixed(1)} km
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-sm text-neutral-600">Distance</p>
                  <p className="text-2xl font-bold text-orange-500">{distance.toFixed(1)} km</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-neutral-600">Time</p>
                  <p className="text-2xl font-bold text-orange-500">{formatTime(time)}</p>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsRunning(!isRunning)}
                  className="w-32"
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleReset}
                  className="w-32"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
