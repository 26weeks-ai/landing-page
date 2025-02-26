import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for mobile on initial load
    checkIfMobile();
    
    // Update on window resize
    function handleResize() {
      checkIfMobile();
    }
    
    // Function to check if the device is mobile
    function checkIfMobile() {
      const userAgent = 
        typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      
      const mobile = Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      );
      
      // Also check screen width as a fallback for desktop browsers in small windows
      const isSmallScreen = window.innerWidth < 768;
      
      setIsMobile(mobile || isSmallScreen);
    }
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}