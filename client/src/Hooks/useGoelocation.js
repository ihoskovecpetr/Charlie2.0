import React, { useState, useEffect } from "react";
export const usePosition = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  };
  const onError = error => {
    setError(error.message);
  };
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }
    let watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);
  console.log("GOE SUPPERTED");
  return { ...position, error };
};

function isBigger(prev, next) {
  console.log("Prev: ", prev);
  console.log("Next: ", next);

  return prev.number === next.number || prev.number >= next.number;
  //   if (prev.number > next.number) {
  //     console.log("PLATI");
  //     return true; // Not rendering
  //   }
  //   return false;
}
export const Memoized = React.memo(usePosition, isBigger);
//export default Memoized;
