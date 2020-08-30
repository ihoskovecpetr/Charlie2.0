import { useEffect, useContext } from "react";
import { UserContext } from "src/Contexts/userContext";

export const useScrollDisable = id => {
  const { setContext } = useContext(UserContext);

  useEffect(() => {
    setContext(prev => {
      return { ...prev, freezScroll: true };
    });
    //document.addEventListener("wheel", preventDefault, { passive: false });
    return () => {
      setContext(prev => {
        return { ...prev, freezScroll: false };
      });
    };
  }, []);
};
