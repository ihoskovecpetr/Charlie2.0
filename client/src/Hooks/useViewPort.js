import { useEffect } from "react";
export const useViewPort = element => {
  //   window.addEventListener("scroll", () => {
  //     let vh = window.innerHeight * 0.01;
  //     document.documentElement.style.setProperty("--vh", `${vh}px`);
  //   });

  const ro = () => {
    console.log("XX -> o");
  };

  useEffect(() => {
    // window.addEventListener(
    //   "scroll",
    //   () => {
    //     console.log("Print useViewPort");
    //   },
    //   false
    // );
    //document.addEventListener("wheel", preventDefault, { passive: false });
    return () => {
      //window.removeEventListener("scroll", ro(), false);
      //document.removeEventListener("wheel", preventDefault, { passive: false });
    };
  }, []);

  return {};
};
