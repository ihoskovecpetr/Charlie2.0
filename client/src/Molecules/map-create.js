import React, { useState, useEffect } from "react";
//import GeolocationMarker from 'geolocation-marker'
import { usePosition } from "../Hooks/useGeolocation";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import Map from "../Atoms/Hook-map";

function MapCreate(props) {
  const { latitude, longitude, error } = usePosition();

  let marker;
  let markerGeoLoc = { lat: latitude, lng: longitude };
  let geocoder;

  console.log("RENDER CREATE MAP: position: ", markerGeoLoc)

  const MapOptions = {
    center: { lat: latitude, lng: longitude },
    zoom: 10,
    disableDefaultUI: true,
    zoomControl: true,
    //mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    clickableIcons: false,
    gestureHandling: "cooperative"
  };

  const onMapMount = map => {
    console.log("onMapMount fce ");

    marker = new window.google.maps.Marker({
      map: map,
      anchorPoint: new window.google.maps.Point(0, -29)
    });

    var input = document.getElementById("input-location");
    var autocomplete = new window.google.maps.places.Autocomplete(input);
    geocoder = new window.google.maps.Geocoder();
    autocomplete.bindTo("bounds", map);

    if (props.customMapParam) {
      console.log("MArker CL: ", props.customMapParam);
      marker.setPosition({
        lng: props.customMapParam.lng,
        lat: props.customMapParam.lat
      });
      map.panTo({
        lng: props.customMapParam.lng,
        lat: props.customMapParam.lat
      });
      map.setZoom(props.customMapParam.zoom);
      document.getElementById("input-location").value =
        props.customMapParam.address;
    } else if (markerGeoLoc) {
      console.log("MArker MGL");
      marker.setPosition(markerGeoLoc);
      map.panTo(markerGeoLoc);
      geocodeLatLng(geocoder, map, markerGeoLoc.lat, markerGeoLoc.lng);
    }
    map.addListener('zoom_changed', function () {
      console.log("ZOOM: ", map.zoom)
      props.setCustomMapParam(prev => {
        return {
          ...prev,
          zoom: map.zoom
        };
      })
    });

    map.addListener("click", e => {
      document.getElementById("input-location").value = "";
      marker.setVisible(false);
      marker.setPosition(e.latLng);
      marker.setVisible(true);

      geocodeLatLng(geocoder, map, e.latLng.lat(), e.latLng.lng());
    });

    autocomplete.addListener("place_changed", function () {
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        //window.alert("No details available for input: '" + place.name + "'");
        console.log(`No details available for input:  ${place.name}`);
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      markerGeoLoc = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };

      marker.setVisible(true);

      let address = "";

      if (place.address_components) {
        address = [
          (place.address_components[0] &&
            place.address_components[0].short_name) ||
          "",
          (place.address_components[1] &&
            place.address_components[1].short_name) ||
          "",
          (place.address_components[2] &&
            place.address_components[2].short_name) ||
          ""
        ].join(" ");
      }

      props.setCustomMapParam(prev => {
        return {
          ...prev,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: address,
          //zoom: map.zoom
          zoom: 16
        };
      });
    });
  };

  const geocodeLatLng = (geocoder, map, lat, lng) => {
    geocoder.geocode({ location: { lat: lat, lng: lng } }, function (
      results,
      status,
      error_message
    ) {
      var spl = results[0].formatted_address.split(" ");
      var shortAddress = [spl[0], spl[1], spl[2], spl[3]].join(" ");
      status &&
        props.setCustomMapParam(prev => {
          return {
            ...prev,
            address: shortAddress,
            lat: lat,
            lng: lng,
            zoom: map.zoom
          };
        });
      if (error_message) {
        window.alert("Geocoder failed due to: " + status);
        console.log("results: ", results);
        //this.setState({addressOffer: "No address in your location"})
        props.setCustomMapParam(prev => {
          return { ...prev, address: "Failed to localize you" };
        });
      }
    });
  };

  return (
    <>
      <Grid container>
        <Grid item style={{ width: "100%" }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="input-location"
            //value={props.customMapParam && props.customMapParam.address}
            //label="Enter a location"
            //placeholder="Enter a location"
            name="name"
            autoComplete="name"
            style={{ marginBottom: 0 }}
            onKeyPress={e => {
              if (e.key === "Enter") e.preventDefault();
            }}
            autoFocus
          />
        </Grid>
      </Grid>
      <Map
        onMount={onMapMount}
        options={MapOptions}
        className="Create-hell-of-a-party"
        styling={{
          height: "200px",
          width: "100%",
          marginBottom: 20
        }}
      />
    </>
  );
}

export default React.memo(MapCreate)
