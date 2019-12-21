import React, { useState, useEffect } from "react";
export const useSet__vh = () => {
  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    console.log("SET-VH document.documentElement.style. --vh setted: ");
  }, []);
  return { message: "SETTED --vh" };
};

//export default Memoized;
