import { useState, useEffect } from 'react';

export function useIntersectionObserver({ ref, ...options }) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    function onObservation([entry]) {
      setIsIntersecting(entry.isIntersecting);
    }

    if (ref.current) {
      if (window.IntersectionObserver) {
        const observer = new IntersectionObserver(onObservation, {
          rootMargin: '50% 0px',
          ...options,
        });

        observer.observe(ref.current);

        return () => observer.disconnect();
      } else {
        setIsIntersecting(true);
      }
    }
  }, [ref, options]);

  return isIntersecting;
}
