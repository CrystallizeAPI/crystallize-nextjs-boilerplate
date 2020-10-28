import { useEffect } from 'react';

export function useDebounce(fn, delay) {
  let timeout;

  useEffect(() => {
    return () => clearTimeout(timeout);
  });

  return (args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => fn(args), delay);
  };
}
