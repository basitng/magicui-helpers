import { useEffect, useRef } from "react";

function useDebounceEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList,
  delay: number
): void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [...deps, delay]);
}

export default useDebounceEffect;
