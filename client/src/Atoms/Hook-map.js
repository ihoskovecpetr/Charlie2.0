import React, { useEffect, useRef } from "react";

export default function Map({ options, onMount, className }) {
  const ref = useRef();

  useEffect(() => {
    const onLoad = () => {
      console.log("Map loaded: have a look: ", window);
      console.log(".env: ", process.env.GOOGLE_MAPS_API_KEY);
      if (typeof onMount === `function`) {
        //const map = new window.google.maps.Map(ref.current, options);
        const map = new window.google.maps.Map(
          document.getElementById("map-create"),
          options
        );

        onMount(map);
      }
    };
    if (!window.google) {
      const script = document.createElement(`script`);
      script.type = `text/javascript`;
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyADHzQ7cTn3uwDBUMoROC2JFdzZ_gEAzvI&libraries=geometry,places`;
      //`https://maps.googleapis.com/maps/api/js?key=` +
      //process.env.GOOGLE_MAPS_API_KEY;
      const headScript = document.getElementsByTagName(`script`)[0];
      headScript.parentNode.insertBefore(script, headScript);
      script.addEventListener(`load`, onLoad);
      return () => script.removeEventListener(`load`, onLoad);
    } else onLoad();
  }, [onMount, options]);

  const divStyle = {
    height: "400px",
    width: "100%"
  };
  return (
    <div
      style={divStyle}
      id="map-create"
      //css="height: 60vh; width: 60vh; margin: 1em 0; border-radius: 0.5em;"
      //{...{ ref, className }}
    ></div>
  );
}

Map.defaultProps = {
  options: {
    center: { lat: 48, lng: 8 },
    zoom: 5
  }
};
