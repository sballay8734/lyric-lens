import { useState, useEffect } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    windowCenterX: window.innerWidth / 2,
    windowCenterY: window.innerHeight / 2,
    rootNodeCenterY: window.innerHeight / 3.5,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        windowCenterX: window.innerWidth / 2,
        windowCenterY: window.innerHeight / 2,
        rootNodeCenterY: window.innerHeight / 3.5,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
