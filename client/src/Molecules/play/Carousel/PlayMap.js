import React, { useMemo, useCallback } from "react"
import Map from "../../../Atoms/Hook-map";
import mapSetup from "../../../Services/map-settings";
import CharlieMarker from "../../../Images/charlie-marker.png";

const PlayMap = ({event}) => {
  //{ options, onMount, className, styling }
  const LngLatCenter = {
    lng: event.geometry.coordinates[0],
    lat: event.geometry.coordinates[1]
  }
  let marker;


    const MapOptions = useMemo(() => {
        return {
          center: LngLatCenter,
          zoom: 12,
          disableDefaultUI: true,
          zoomControl: true,
          //mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          clickableIcons: false,
          gestureHandling: "cooperative",
          backgroundColor: "#242323",
          styles: mapSetup
        };
      }, [LngLatCenter]);

  
      const onMapMount = useCallback(map => {
    
        marker = new window.google.maps.Marker({
          map: map,
          anchorPoint: new window.google.maps.Point(0, -29),
          icon: {
            url: "https://res.cloudinary.com/party-images-app/image/upload/v1583692624/nwvqlicffptzqpwha5no.png", // {CharlieMarker},
            size: new window.google.maps.Size(48, 48),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(24, 48),
            scaledSize: new window.google.maps.Size(48, 48)
          },
          animation: window.google.maps.Animation.DROP,
          title: event.name
        });    
  
        if (event.geometry) {
          marker.setPosition({
            lng: event.geometry.coordinates[0],
            lat: event.geometry.coordinates[1]
          });
          map.panTo({
            lng: event.geometry.coordinates[0],
            lat: event.geometry.coordinates[1]
          });
          //map.setZoom(event.customMapParam.zoom);
        }

      }, []);

    return (
      <>
      {event && <Map
        onMount={onMapMount}
        options={MapOptions}
        className="Play-map-className"
        styling={{
            height: "300px",
            width: "100%",
            marginBottom: 20
          }} />} 
        </>
    )

}
export default PlayMap
