import React, { useState, useEffect } from "react";
export const usePosition = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);
  const [address, setAddress] = useState('')
  let geocoder;

  const onChange = ({ coords }) => {
    console.log("Found your New Location: ", coords.latitude, coords.longitude)

// Find Address:

  geocoder = new window.google.maps.Geocoder();

  geocoder.geocode({ location: { lat: coords.latitude, lng: coords.longitude } }, function(
    results,
    status,
    error_message
  ){
    if (results) {
      var spl = results[0].formatted_address.split(" ");
      setAddress(`${spl[(spl.length-2)]} ${spl[(spl.length-1)]}`)
    } else {
      console.log("NOOOO Setting address to context: ")
    }
  }
  )
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude
    });


  };


  const onError = error => {
    setError(error.message);
  };


  useEffect(() => {
    const geo = window.navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }
    //let watcher = geo.watchPosition(onChange, onError);
    let watcher = geo.getCurrentPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);
  return { ...position, address, error };
};

export const Memoized = React.memo(usePosition);
//export default Memoized;
