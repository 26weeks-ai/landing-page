import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface AnimatedBackgroundProps {
  className?: string;
  density?: number; // Number of particles per 1000 square pixels
  theme?: 'runner' | 'energy' | 'minimal';
  interactive?: boolean;
  performance?: 'high' | 'medium' | 'low';
}

export function AnimatedBackground({
  className = '',
  density = 0.08,
  theme = 'runner',
  interactive = true,
  performance = 'medium'
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const isMobile = useIsMobile();
  
  // Adjust performance settings based on mobile and performance prop
  const particleDensityMultiplier = 
    isMobile ? 0.5 : 
    performance === 'high' ? 1.2 : 
    performance === 'low' ? 0.4 : 1;
  
  const actualDensity = density * particleDensityMultiplier;
  
  // Theme configurations
  const themeConfig = {
    runner: {
      colors: ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c', '#9b59b6'],
      sizeRange: { min: 1, max: 5 },
      speedRange: { min: 0.5, max: 2 },
      lifeRange: { min: 100, max: 300 },
      movementPattern: 'flow' // curved paths like running track
    },
    energy: {
      colors: ['#f39c12', '#d35400', '#e74c3c', '#3498db'],
      sizeRange: { min: 2, max: 6 },
      speedRange: { min: 0.8, max: 3 },
      lifeRange: { min: 80, max: 220 },
      movementPattern: 'pulse' // expands and contracts
    },
    minimal: {
      colors: ['#bdc3c7', '#95a5a6', '#7f8c8d'],
      sizeRange: { min: 1, max: 3 },
      speedRange: { min: 0.2, max: 1 },
      lifeRange: { min: 150, max: 400 },
      movementPattern: 'drift' // gentle floating
    }
  };
  
  const currentTheme = themeConfig[theme];
  
  // Initialize dimensions
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Get the true display size of the canvas
    const updateDimensions = () => {
      if (!canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      
      // Set canvas dimensions to match display size
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
  
  // Create initial particles
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    const totalArea = dimensions.width * dimensions.height;
    const particleCount = Math.floor((totalArea / 1000) * actualDensity);
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(dimensions.width, dimensions.height, currentTheme));
    }
    
    particlesRef.current = particles;
  }, [dimensions, actualDensity, theme]);
  
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
      
      setIsMouseMoving(true);
      
      // Create particles at mouse position occasionally
      if (Math.random() > 0.6) {
        const newParticle = createParticle(
          dimensions.width, 
          dimensions.height, 
          currentTheme,
          e.clientX - rect.left,
          e.clientY - rect.top
        );
        particlesRef.current.push(newParticle);
      }
      
      // Reset mouse movement detection after a delay
      setTimeout(() => setIsMouseMoving(false), 100);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactive, dimensions, currentTheme]);
  
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
      
      setIsMouseMoving(true);
      
      // Create multiple particles at touch position
      for (let i = 0; i < 3; i++) {
        const newParticle = createParticle(
          dimensions.width, 
          dimensions.height, 
          currentTheme,
          touch.clientX - rect.left,
          touch.clientY - rect.top
        );
        particlesRef.current.push(newParticle);
      }
      
      // Reset touch movement detection after a delay
      setTimeout(() => setIsMouseMoving(false), 100);
    };
    
    window.addEventListener('touchmove', handleTouch);
    window.addEventListener('touchstart', handleTouch);
    
    return () => {
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [interactive, isMobile, dimensions, currentTheme]);
  
  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Update particle properties
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;
        p.opacity = (p.life / p.maxLife) * 0.8;
        
        // Apply movement patterns
        applyMovementPattern(p, currentTheme.movementPattern, isMouseMoving, mousePosition);
        
        // Remove dead particles
        if (p.life <= 0) {
          particles.splice(i, 1);
          particles.push(createParticle(dimensions.width, dimensions.height, currentTheme));
          continue;
        }
        
        // Draw the particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [dimensions, currentTheme, isMouseMoving, mousePosition]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full -z-10 ${className}`}
    />
  );
}

// Helper function to create a particle
function createParticle(
  width: number, 
  height: number, 
  theme: any,
  x?: number,
  y?: number
): Particle {
  const size = Math.random() * (theme.sizeRange.max - theme.sizeRange.min) + theme.sizeRange.min;
  const color = theme.colors[Math.floor(Math.random() * theme.colors.length)];
  const speedX = (Math.random() - 0.5) * theme.speedRange.max;
  const speedY = (Math.random() - 0.5) * theme.speedRange.max;
  const life = Math.random() * (theme.lifeRange.max - theme.lifeRange.min) + theme.lifeRange.min;
  
  return {
    x: x !== undefined ? x : Math.random() * width,
    y: y !== undefined ? y : Math.random() * height,
    size,
    color,
    speedX,
    speedY,
    opacity: 1,
    life,
    maxLife: life
  };
}

// Apply different movement patterns based on theme
function applyMovementPattern(
  particle: Particle, 
  pattern: string, 
  isMouseMoving: boolean, 
  mousePosition: { x: number, y: number }
) {
  switch(pattern) {
    case 'flow':
      // Create flowing path similar to a running track
      particle.speedX += Math.sin(particle.y / 50) * 0.03;
      particle.speedY += Math.cos(particle.x / 50) * 0.03;
      
      // Mouse influence
      if (isMouseMoving) {
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          particle.speedX += dx / distance * 0.2;
          particle.speedY += dy / distance * 0.2;
        }
      }
      break;
      
    case 'pulse':
      // Pulsing effect - expand and contract
      const pulseRate = particle.life % 60;
      if (pulseRate < 30) {
        particle.speedX *= 1.01;
        particle.speedY *= 1.01;
      } else {
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;
      }
      break;
      
    case 'drift':
      // Gentle floating
      particle.speedX += (Math.random() - 0.5) * 0.02;
      particle.speedY += (Math.random() - 0.5) * 0.02;
      
      // Dampen speed to keep it gentle
      particle.speedX *= 0.99;
      particle.speedY *= 0.99;
      break;
      
    default:
      // Default behavior
      particle.speedX += (Math.random() - 0.5) * 0.01;
      particle.speedY += (Math.random() - 0.5) * 0.01;
  }
  
  // Cap the maximum speed to prevent particles from moving too fast
  const maxSpeed = 3;
  const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
  
  if (currentSpeed > maxSpeed) {
    particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
    particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
  }
}