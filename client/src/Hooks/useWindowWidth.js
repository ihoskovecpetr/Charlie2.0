import React, { useState, useEffect, useMemo } from "react";

export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  const [xs_size, setXs_size] = useState();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      if(window.innerWidth <= 600){
        if(!xs_size) {
          console.log("CHANGE TO XS_SIZE TRUE")
          setXs_size(true)
        }
      }else{
        if(xs_size){
        console.log("CHANGE TO XS_SIZE false")
        setXs_size(false)
      }
      }
      
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const xs_size_memo = useMemo(() => {
    return xs_size
  }, [xs_size])


  return { width, xs_size_memo };
}
