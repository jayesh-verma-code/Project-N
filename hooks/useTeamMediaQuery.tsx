import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    // Initial check
    setMatches(mediaQuery.matches);
    
    // Update matches state whenever the media query changes
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add event listener with modern API
    mediaQuery.addEventListener('change', handler);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);
  
  return matches;
}