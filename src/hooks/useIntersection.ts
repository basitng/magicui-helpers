import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  root?: Element | null;
  threshold?: number | number[];
  rootMarginTop?: string;
  rootMarginRight?: string;
  rootMarginBottom?: string;
  rootMarginLeft?: string;
}

function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<HTMLElement>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const {
      root,
      threshold,
      rootMarginTop = "0px",
      rootMarginRight = "0px",
      rootMarginBottom = "0px",
      rootMarginLeft = "0px",
    } = options;

    const rootMargin = `${rootMarginTop} ${rootMarginRight} ${rootMarginBottom} ${rootMarginLeft}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [elementRef, isIntersecting];
}

export default useIntersectionObserver;
