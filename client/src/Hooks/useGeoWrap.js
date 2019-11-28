import React from "react";
import { usePosition } from "../Hooks/useGoelocation";

export function useGeoWatcher() {
  const { latitude, longitude, errorPosition } = usePosition();
  return { latitude, longitude, errorPosition };
}

function isBigger(prev, next) {
  console.log("Prev: ", prev);
  console.log("Next: ", next);
  return true;
  //   if (prev.number > next.number) {
  //     console.log("PLATI");
  //     return true; // Not rendering
  //   }
  //   return false;
}

//export default React.memo(useGeoWatcher, isBigger);
