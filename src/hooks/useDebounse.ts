import { useRef, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
export function useDebounce<T extends Function>(cb: T, delay=400): T {
  const timer = useRef<NodeJS.Timeout>();
  const debounseCallback = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => cb(...args), delay);
    },
    [cb, delay]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <T>(<any>debounseCallback);
}
