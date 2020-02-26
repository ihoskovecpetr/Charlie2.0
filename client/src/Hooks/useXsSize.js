import React, { useState, useEffect, useMemo } from "react";

export function useXsSize() {
  const [xs_size, setXs_size] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 585) {
      setXs_size(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 585) {
        if (!xs_size) {
          setXs_size(true);
        }
      } else {
        if (xs_size) {
          setXs_size(false);
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const xs_size_memo = useMemo(() => {
    return xs_size;
  }, [xs_size]);

  return { xs_size_memo };
}
