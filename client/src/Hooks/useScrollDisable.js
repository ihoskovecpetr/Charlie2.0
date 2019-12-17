import React, { useState, useEffect } from "react";

export const useScrollDisable = () => {
  const preventDefault = e => {
    console.log("S!");
    e = e || window.event;
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
  };
  useEffect(() => {
    window.addEventListener("DOMMouseScroll", preventDefault, false);
    document.addEventListener("wheel", preventDefault, { passive: false });
    return () => {
      window.removeEventListener("DOMMouseScroll", preventDefault, false);
      document.removeEventListener("wheel", preventDefault, { passive: false });
    };
  });
};
