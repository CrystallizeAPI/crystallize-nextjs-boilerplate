import { useRef, useEffect } from 'react';

export default function useScrollEnded(ref, onEnd) {
  const timeoutRef = useRef();

  useEffect(() => {
    const el = ref.current;

    function onScroll() {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => onEnd(), 100);
    }

    if (el) {
      el.addEventListener('scroll', onScroll, false);

      return () => el.removeEventListener('scroll', onScroll, false);
    }
  }, [ref, onEnd]);

  return null;
}
