import React, { useEffect, useRef } from "react";

export default function Map({ options, onMount, className, styling }) {
  const ref = useRef();

  useEffect(() => {
    const onLoad = () => {
      if (typeof onMount === `function`) {
        //const map = new window.google.maps.Map(ref.current, options);
        const map = new window.google.maps.Map(
          //document.getElementById("map-create"),
          ref.current,
          options
        );

        onMount(map);
      }
    };
    if (!window.google) {
      const script = document.createElement(`script`);
      script.type = `text/javascript`;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=geometry,places`;
      //`https://maps.googleapis.com/maps/api/js?key=` +
      //process.env.GOOGLE_MAPS_API_KEY;
      const headScript = document.getElementsByTagName(`script`)[0];
      headScript.parentNode.insertBefore(script, headScript);
      script.addEventListener(`load`, onLoad);
      return () => script.removeEventListener(`load`, onLoad);
    } else onLoad();
  }, [onMount, options]);

  return (
    <div
      style={styling}
      //id="map-create"
      //css="height: 60vh; width: 60vh; margin: 1em 0; border-radius: 0.5em;"
      {...{ ref, className }}
    ></div>
  );
}

Map.defaultProps = {
  options: {
    center: { lat: 50, lng: 15 },
    zoom: 5
  }
};
