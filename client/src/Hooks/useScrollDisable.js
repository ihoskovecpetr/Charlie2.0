import { useEffect, useContext } from "react";
import { UserContext } from "../userContext";

export const useScrollDisable = id => {
  const { user, setUser } = useContext(UserContext);

  const stopPropagation = e => {
    console.log("Hook event type: ", e.type);
    e = e || window.event;
    if (e.stopPropagation()) {
      console.log("Hooks stopPropagation");
      e.stopPropagation();
    }
    e.returnValue = false;
  };

  const preventDefault = e => {
    e = e || window.event;
    if (e.preventDefault()) {
      console.log("Hooks stopPropagation");
      e.preventDefault();
    }
    e.returnValue = false;
  };

  var events = [
    "mousewheel",
    "DOMMouseScroll",
    "touchstart",
    "touchend",
    "touchmove",
    "dblclick",
    "contextmenu",
    "wheel",
    "scroll"
  ];
  useEffect(() => {
    console.log("disable Scroll FreezApp ", id);
    // const el = document.getElementById(id);
    // if (el) {
    //   // for (let i = 0; i == events.length; i++) {
    //   //   console.log("Events: ", events[i]);
    //   //   el.addEventListener(events[i], stopPropagation, false);
    //   //   //el.addEventListener("scroll", preventDefault, false);
    //   // }

    //   // el.addEventListener("wheel", stopPropagation, false);
    //   // el.addEventListener("scroll", stopPropagation, false);

    //   events.map(item => {
    //     el.addEventListener(item, stopPropagation, false);
    //   });
    // }

    setUser(prev => {
      return { ...prev, freezScroll: false };
    });
    //document.addEventListener("wheel", preventDefault, { passive: false });
    return () => {
      setUser(prev => {
        return { ...prev, freezScroll: true };
      });
      //window.removeEventListener("DOMMouseScroll", preventDefault, false);
      // if (el) {
      //   //   el.removeEventListener("wheel", stopPropagation, false);
      //   //   el.removeEventListener("scroll", stopPropagation, false);
      //   events.map(item => {
      //     el.removeEventListener(item, stopPropagation, false);
      //   });
      // }
      //document.removeEventListener("wheel", preventDefault, { passive: false });
    };
  }, []);
};
