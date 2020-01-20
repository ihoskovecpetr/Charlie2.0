import React, { useState, useEffect, useMemo } from "react";

export function useXsSize() {
  const [xs_size, setXs_size] = useState(false);

  useEffect(() => {
    if(window.innerWidth <= 600){
      setXs_size(true)
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {

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


  return { xs_size_memo };
}
