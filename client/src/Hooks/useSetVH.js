import React, { useState, useEffect } from "react";
export const useSet__vh = () => {
  window.addEventListener("resize", () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    console.log(
      "SET-VH document.documentElement.style. --vh setted: ",
      document
    );
  }, []);
  return { vhcko: window.innerHeight };
};

//export default Memoized;
