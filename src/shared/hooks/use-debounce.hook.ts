import { useRef } from 'react';

export const useDebounce = (func: (...args: any) => void, delay: number = 1000) => {
  const timeoutRef = useRef<number>();

  const debounced = (...args: any) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => func(...args), delay);
  };

  return debounced;
};
