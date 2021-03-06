import React, { useState, useEffect, useMemo } from "react";

let limit;

export function useScrollY({ y }) {
  const [displayPlay, setDisplayPlay] = useState(false);

  useEffect(() => {
    limit = y ? y : 450;
  }, [y]);

  useEffect(() => {
    const handleResize = () => {
      if (window.scrollY >= limit && !displayPlay) {
        setDisplayPlay(true);
      } else if (window.scrollY <= limit && displayPlay) {
        setDisplayPlay(false);
      }
    };

    window.addEventListener("scroll", handleResize);
    return () => {
      window.removeEventListener("scroll", handleResize);
    };
  }, []);

  const displayPlay_memo = useMemo(() => {
    return displayPlay;
  }, [displayPlay]);

  return { displayPlay_memo };
}
