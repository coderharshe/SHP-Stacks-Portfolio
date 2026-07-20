import { useEffect, useRef, useState } from 'react';

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  // Keep a ref to the latest setter so the handler closure stays stable
  const setterRef = useRef(setScrollPosition);
  setterRef.current = setScrollPosition;

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      // Throttle via rAF to avoid flooding React scheduler
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setterRef.current(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Capture current position once after mount (outside the event loop)
    rafId = requestAnimationFrame(() => {
      setterRef.current(window.scrollY);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []); // empty deps — listener is attached once, never re-registered

  return scrollPosition;
};
