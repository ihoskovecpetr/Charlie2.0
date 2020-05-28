import React, { useEffect, useRef } from "react";

let scriptAdded = false;
function Map({ options, onMount, className, styling }) {
  const ref = useRef();
  console.log("Map Atom rerender")

  useEffect(() => {
    const onLoad = () => {
      if (typeof onMount === `function` && window.google) {
        //const map = new window.google.maps.Map(ref.current, options);
        const map = new window.google.maps.Map(
          //document.getElementById("map-create"),
          ref.current,
          options
        );
        onMount(map);
      }
    };

    if (!window.google && !scriptAdded) {
      scriptAdded = true;
      const script = document.createElement(`script`);
      script.type = `text/javascript`;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=geometry,places`;

      const headScript = document.getElementsByTagName(`script`)[0];
      headScript.parentNode.insertBefore(script, headScript);
      script.addEventListener(`load`, onLoad);
      return () => {
        return script.removeEventListener(`load`, onLoad);
      }
    } else onLoad();
  }, [onMount, options]);

  return (
    <div
     style={styling}
      {...{ ref, className }}
    ></div>
  );
}

// Map.defaultProps = {
//   options: {
//     center: { lat: 50, lng: 15 },
//     zoom: 5
//   }
// };

export default React.memo(Map);
