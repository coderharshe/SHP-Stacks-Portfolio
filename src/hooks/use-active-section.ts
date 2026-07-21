import { useEffect, useState } from 'react';

export const useActiveSection = (sectionIds: string[], options?: IntersectionObserverInit) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observerOptions = options || {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the middle portion of viewport
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    const sectionKey = sectionIds.join(',');

    return () => {
      sectionKey.split(',').forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [sectionIds.join(','), options]);

  return activeSection;
};
