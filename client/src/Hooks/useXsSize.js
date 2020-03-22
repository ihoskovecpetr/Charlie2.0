import React, { useState, useEffect, useMemo } from "react";

export function useXsSize() {
  const [xs_size, setXs_size] = useState(false);
  const [md_size, setMd_size] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 585) {
      setXs_size(true);
    }
    if (window.innerWidth <= 960) {
      setMd_size(true);
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

      if (window.innerWidth <= 960) {
        if (!md_size) {
          setMd_size(true);
        }
      } else {
        if (md_size) {
          setMd_size(false);
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

  const md_size_memo = useMemo(() => {
    return md_size;
  }, [md_size]);

  return { xs_size_memo, md_size_memo };
}
