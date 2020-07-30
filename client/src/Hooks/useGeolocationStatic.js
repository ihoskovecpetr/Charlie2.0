import React, { useState, useEffect } from "react";

export const usePositionStatic = () => {
  const [state, setState] = useState({
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: Date.now(),
  });
  let mounted = true;
  let watchId;

  const onEvent = (event) => {
    console.log("I got geolocation: ", event);
    if (mounted) {
      setState({
        accuracy: event.coords.accuracy,
        altitude: event.coords.altitude,
        altitudeAccuracy: event.coords.altitudeAccuracy,
        heading: event.coords.heading,
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed,
        timestamp: event.timestamp,
      });
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onEvent);
    watchId = navigator.geolocation.watchPosition(onEvent);

    return () => {
      mounted = false;
      navigator.geolocation.clearWatch(watchId);
    };
  }, [0]);

  return state;
};
