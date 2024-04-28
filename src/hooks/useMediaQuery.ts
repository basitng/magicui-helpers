import { useState, useEffect } from "react";

interface MediaQueryResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

function useMediaQuery(): MediaQueryResult {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 600px)");
    const tabletQuery = window.matchMedia(
      "(min-width: 601px) and (max-width: 1024px)"
    );
    const desktopQuery = window.matchMedia("(min-width: 1025px)");

    const handleMobileChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    const handleTabletChange = (event: MediaQueryListEvent) => {
      setIsTablet(event.matches);
    };

    const handleDesktopChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    mobileQuery.addListener(handleMobileChange);
    tabletQuery.addListener(handleTabletChange);
    desktopQuery.addListener(handleDesktopChange);

    // Set initial values
    setIsMobile(mobileQuery.matches);
    setIsTablet(tabletQuery.matches);
    setIsDesktop(desktopQuery.matches);

    return () => {
      mobileQuery.removeListener(handleMobileChange);
      tabletQuery.removeListener(handleTabletChange);
      desktopQuery.removeListener(handleDesktopChange);
    };
  }, []);

  return { isMobile, isTablet, isDesktop };
}

export default useMediaQuery;
