import React, { useState, useEffect, useMemo } from "react";

export function useScrollY() {
  const [displayPlay, setDisplayPlay] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      if(window.scrollY >= 450 && !displayPlay){
        setDisplayPlay(true)
      }else if(window.scrollY <= 450 && displayPlay){
        setDisplayPlay(false)
      }
    }

    window.addEventListener("scroll", handleResize);
    return () => {
      window.removeEventListener("scroll", handleResize);
    };
  });

  const displayPlay_memo = useMemo(() => {
    return displayPlay;
  }, [displayPlay]);

  return { displayPlay_memo };
}
