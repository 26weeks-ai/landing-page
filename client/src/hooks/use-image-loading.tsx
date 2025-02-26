import React, { useState, useEffect, createRef, RefObject } from 'react';

interface ImageLoaderOptions {
  lazy?: boolean;
  threshold?: number;
}

interface UseImageLoaderReturn {
  loaded: boolean;
  error: boolean;
  imageRef: RefObject<HTMLImageElement>;
  onLoad: () => void;
  onError: () => void;
}

/**
 * Custom hook for optimized image loading with lazy loading support
 */
export function useImageLoader(
  src: string,
  options: ImageLoaderOptions = {}
): UseImageLoaderReturn {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imageRef = createRef<HTMLImageElement>();
  
  const { lazy = true, threshold = 0.1 } = options;

  const onLoad = () => {
    setLoaded(true);
  };

  const onError = () => {
    setError(true);
    console.error(`Failed to load image: ${src}`);
  };

  useEffect(() => {
    // Reset state when src changes
    setLoaded(false);
    setError(false);

    if (!lazy) return;

    // Use IntersectionObserver for lazy loading if supported
    if ('IntersectionObserver' in window && imageRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && imageRef.current) {
              // Start loading the image
              imageRef.current.src = src;
              // Stop observing once triggered
              observer.unobserve(imageRef.current);
            }
          });
        },
        { threshold }
      );

      observer.observe(imageRef.current);

      return () => {
        if (imageRef.current) {
          observer.unobserve(imageRef.current);
        }
      };
    } else {
      // Fallback for browsers without IntersectionObserver
      return undefined;
    }
  }, [src, lazy, threshold, imageRef]);

  return {
    loaded,
    error,
    imageRef,
    onLoad,
    onError
  };
}

/**
 * Optimized image component with lazy loading
 */
interface OptimizedImageProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  src: string;
  alt: string;
  lazySrc?: string; // Optional placeholder image
  lazyLoad?: boolean;
  fallback?: React.ReactNode;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  lazySrc,
  lazyLoad = true,
  fallback,
  ...props
}) => {
  const { loaded, error, imageRef, onLoad, onError } = useImageLoader(src, {
    lazy: lazyLoad
  });

  if (error && fallback) {
    return <>{fallback}</>;
  }

  return (
    <img
      ref={imageRef}
      src={lazyLoad ? lazySrc || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' : src}
      data-src={lazyLoad ? src : undefined}
      alt={alt}
      onLoad={onLoad}
      onError={onError}
      style={{
        transition: 'opacity 0.3s ease-in-out',
        opacity: loaded ? 1 : 0.3,
      }}
      {...props}
    />
  );
};