import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface RunningFigure {
  x: number;
  y: number;
  size: number;
  speed: number;
  stride: number;
  phase: number;
  color: string;
}

interface RunningTrail {
  points: { x: number; y: number }[];
  life: number;
  maxLife: number;
  width: number;
  color: string;
}

interface RunningAnimationProps {
  className?: string;
  density?: number; // Number of runners
  interactive?: boolean;
  performance?: 'high' | 'medium' | 'low';
}

export function RunningAnimation({
  className = '',
  density = 0.02,
  interactive = true,
  performance = 'medium'
}: RunningAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseActive, setIsMouseActive] = useState(false);
  const runnersRef = useRef<RunningFigure[]>([]);
  const trailsRef = useRef<RunningTrail[]>([]);
  const animationFrameRef = useRef<number>(0);
  const isMobile = useIsMobile();
  
  // Adjust performance settings
  const runnerDensityMultiplier = 
    isMobile ? 0.3 : 
    performance === 'high' ? 1.2 : 
    performance === 'low' ? 0.3 : 1;
  
  const actualDensity = density * runnerDensityMultiplier;
  const trailLifeMultiplier = performance === 'high' ? 1.2 : performance === 'low' ? 0.6 : 1;
  
  // Color themes for runners
  const colors = [
    '#3498db', // blue
    '#2ecc71', // green
    '#f1c40f', // yellow
    '#e74c3c', // red
    '#9b59b6'  // purple
  ];
  
  // Initialize dimensions
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const updateDimensions = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      setDimensions({
        width: rect.width,
        height: rect.height
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Create initial runners
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    const totalArea = dimensions.width * dimensions.height;
    const runnerCount = Math.floor((totalArea / 10000) * actualDensity);
    const runners: RunningFigure[] = [];
    
    for (let i = 0; i < runnerCount; i++) {
      runners.push(createRunner(dimensions.width, dimensions.height, colors));
    }
    
    runnersRef.current = runners;
    trailsRef.current = [];
  }, [dimensions, actualDensity]);
  
  // Handle mouse interaction
  useEffect(() => {
    if (!interactive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      
      setIsMouseActive(true);
      
      // Create special runner at mouse position occasionally
      if (Math.random() > 0.95) {
        const newRunner = createRunner(
          dimensions.width, 
          dimensions.height, 
          colors,
          e.clientX - rect.left,
          e.clientY - rect.top,
          true // Special runner (faster)
        );
        runnersRef.current.push(newRunner);
      }
    };
    
    const handleMouseLeave = () => {
      setIsMouseActive(false);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [interactive, dimensions]);
  
  // Touch events for mobile
  useEffect(() => {
    if (!interactive || !isMobile) return;
    
    const handleTouch = (e: TouchEvent) => {
      if (!canvasRef.current || e.touches.length === 0) return;
      
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      
      setMousePosition({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });
      
      setIsMouseActive(true);
      
      // Create runner at touch position
      if (Math.random() > 0.8) {
        const newRunner = createRunner(
          dimensions.width, 
          dimensions.height, 
          colors,
          touch.clientX - rect.left,
          touch.clientY - rect.top,
          true
        );
        runnersRef.current.push(newRunner);
      }
    };
    
    const handleTouchEnd = () => {
      setIsMouseActive(false);
    };
    
    window.addEventListener('touchmove', handleTouch);
    window.addEventListener('touchstart', handleTouch);
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [interactive, isMobile, dimensions]);
  
  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw trails first (so they appear behind runners)
      const trails = trailsRef.current;
      for (let i = trails.length - 1; i >= 0; i--) {
        const trail = trails[i];
        
        // Update trail life
        trail.life--;
        
        // Remove dead trails
        if (trail.life <= 0) {
          trails.splice(i, 1);
          continue;
        }
        
        // Draw the trail
        const opacity = (trail.life / trail.maxLife) * 0.5;
        ctx.beginPath();
        
        if (trail.points.length > 1) {
          ctx.moveTo(trail.points[0].x, trail.points[0].y);
          
          for (let j = 1; j < trail.points.length; j++) {
            ctx.lineTo(trail.points[j].x, trail.points[j].y);
          }
          
          ctx.strokeStyle = trail.color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
          ctx.lineWidth = trail.width;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
      }
      
      // Update and draw runners
      const runners = runnersRef.current;
      for (let i = runners.length - 1; i >= 0; i--) {
        const runner = runners[i];
        
        // Update runner position
        runner.x += runner.speed;
        runner.phase += runner.stride;
        
        // If runner goes off-screen, reposition
        if (runner.x - runner.size > canvas.width) {
          runner.x = -runner.size;
          runner.y = Math.random() * canvas.height;
        }
        
        // Create trail occasionally
        if (Math.random() > 0.6) {
          const trail: RunningTrail = {
            points: [{ x: runner.x, y: runner.y }],
            life: Math.floor(30 * trailLifeMultiplier),
            maxLife: Math.floor(30 * trailLifeMultiplier),
            width: runner.size / 4,
            color: runner.color
          };
          
          trailsRef.current.push(trail);
        } else if (trailsRef.current.length > 0) {
          // Add point to existing trail
          for (let j = 0; j < trailsRef.current.length; j++) {
            if (trailsRef.current[j].color === runner.color && trailsRef.current[j].points.length < 10) {
              trailsRef.current[j].points.push({ x: runner.x, y: runner.y });
              break;
            }
          }
        }
        
        // Apply mouse/touch influence when active
        if (isMouseActive) {
          const dx = mousePosition.x - runner.x;
          const dy = mousePosition.y - runner.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            // Runners are attracted to mouse/touch
            runner.x += (dx / distance) * 0.5;
            runner.y += (dy / distance) * 0.5;
          }
        }
        
        // Draw the runner figure
        drawRunnerFigure(ctx, runner);
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [dimensions, isMouseActive, mousePosition, trailLifeMultiplier]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full -z-10 ${className}`}
    />
  );
}

// Helper function to create a runner
function createRunner(
  width: number, 
  height: number, 
  colors: string[],
  x?: number,
  y?: number,
  isSpecial = false
): RunningFigure {
  const size = Math.random() * 8 + (isSpecial ? 15 : 12);
  const color = colors[Math.floor(Math.random() * colors.length)];
  const speed = (Math.random() * 1 + 2) * (isSpecial ? 2 : 1);
  const stride = Math.random() * 0.2 + 0.1;
  
  return {
    x: x !== undefined ? x : Math.random() * width,
    y: y !== undefined ? y : Math.random() * height,
    size,
    speed,
    stride,
    phase: Math.random() * Math.PI * 2,
    color
  };
}

// Draw runner stick figure
function drawRunnerFigure(ctx: CanvasRenderingContext2D, runner: RunningFigure) {
  const { x, y, size, phase, color } = runner;
  
  // Save context state
  ctx.save();
  
  // Set line styles
  ctx.strokeStyle = color;
  ctx.lineWidth = size / 5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  // Draw head
  ctx.beginPath();
  ctx.arc(x, y - size * 0.5, size * 0.25, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  
  // Draw body
  ctx.beginPath();
  ctx.moveTo(x, y - size * 0.25);
  ctx.lineTo(x, y + size * 0.3);
  ctx.stroke();
  
  // Draw arms
  const armPhase = Math.sin(phase) * 0.5;
  
  // Left arm
  ctx.beginPath();
  ctx.moveTo(x, y - size * 0.1);
  ctx.lineTo(x - size * 0.3, y - size * 0.1 + size * armPhase);
  ctx.stroke();
  
  // Right arm
  ctx.beginPath();
  ctx.moveTo(x, y - size * 0.1);
  ctx.lineTo(x + size * 0.3, y - size * 0.1 - size * armPhase);
  ctx.stroke();
  
  // Draw legs
  const legPhase = Math.sin(phase);
  
  // Left leg
  ctx.beginPath();
  ctx.moveTo(x, y + size * 0.3);
  ctx.lineTo(x - size * 0.2, y + size * 0.6 + size * legPhase * 0.2);
  ctx.stroke();
  
  // Right leg
  ctx.beginPath();
  ctx.moveTo(x, y + size * 0.3);
  ctx.lineTo(x + size * 0.2, y + size * 0.6 - size * legPhase * 0.2);
  ctx.stroke();
  
  // Restore context state
  ctx.restore();
}