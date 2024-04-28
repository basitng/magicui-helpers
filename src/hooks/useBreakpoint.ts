import { useState, useEffect } from "react";

interface Breakpoints {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
}

function useBreakpoints(): Breakpoints {
  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
  });

  useEffect(() => {
    const handleResize = () => {
      setBreakpoints({
        xs: window.innerWidth < 576,
        sm: window.innerWidth >= 576 && window.innerWidth < 768,
        md: window.innerWidth >= 768 && window.innerWidth < 992,
        lg: window.innerWidth >= 992 && window.innerWidth < 1200,
        xl: window.innerWidth >= 1200,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakpoints;
}

export default useBreakpoints;
