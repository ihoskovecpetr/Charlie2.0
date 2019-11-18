import React from "react";

import { usePosition } from "../Hooks/useGoelocation";

import Map from "../Atoms/Hook-map";

export default function MapMolecule({}) {
  const { latitude, longitude, error } = usePosition();

  const MapOptions = {
    center: { lat: latitude, lng: longitude },
    zoom: 5,
    disableDefaultUI: true,
    zoomControl: true,
    //mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    clickableIcons: false,
    gestureHandling: "cooperative"
  };

  const onMapMount = map => {
    console.log("Print from Create..XX dumb");
    //document.getElementById("map-create");
    // marker = new window.google.maps.Marker({
    //   map: map,
    //   anchorPoint: new window.google.maps.Point(0, -29)
    // });
  };

  return (
    <>
      <Map onMount={onMapMount} options={MapOptions} />
    </>
  );
}
