import React, { useContext, useState, useMemo, useCallback } from "react";
//import GeolocationMarker from 'geolocation-marker'
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import { UserContext } from "../userContext";

import Map from "../Atoms/Hook-map";

let LngLatCenter = { lat: 50.068645, lng: 14.457364 };

function MapCreate(props) {
  //const { latitude, longitude, error } = usePosition();
  const { context } = useContext(UserContext);
  const [addressTxt, setAddressTxt] = useState("Write address");
  let marker;
  //let markerGeoLoc = { lat: latitude, lng: longitude };
  let geocoder;

  //console.log("RENDER CREATE MAP: position: ", markerGeoLoc);

  if (context.geolocationObj) {
    LngLatCenter = context.geolocationObj;
  }

  const MapOptions = useMemo(() => {
    return {
      center: LngLatCenter,
      zoom: 10,
      disableDefaultUI: true,
      zoomControl: true,
      //mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      clickableIcons: false,
      gestureHandling: "cooperative"
    };
  }, [LngLatCenter]);

  const onMapMount = useCallback(map => {

    marker = new window.google.maps.Marker({
      map: map,
      anchorPoint: new window.google.maps.Point(0, -29)
    });

    var input = document.getElementById("input-location");
    var autocomplete = new window.google.maps.places.Autocomplete(input);
    geocoder = new window.google.maps.Geocoder();
    autocomplete.bindTo("bounds", map);

    if (props.customMapParam) {
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
    } else if (LngLatCenter) {
      marker.setPosition(LngLatCenter);
      map.panTo(LngLatCenter);
      geocodeLatLng(geocoder, map, LngLatCenter.lat, LngLatCenter.lng);
    }
    map.addListener("zoom_changed", function() {
      props.setCustomMapParam(prev => {
        return {
          ...prev,
          zoom: map.zoom
        };
      });
    });

    map.addListener("click", e => {
      document.getElementById("input-location").value = "";
      marker.setVisible(false);
      marker.setPosition(e.latLng);
      marker.setVisible(true);

      geocodeLatLng(geocoder, map, e.latLng.lat(), e.latLng.lng());
    });

    autocomplete.addListener("place_changed", function() {
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        //window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
      } else {
        //console.log("Setting here center: ", place.geometry.location);
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      LngLatCenter = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };

      let address = "";

      if (place.address_components) {
        // console.log(
        //   "Tohle place ma addresu: ",
        //   place.address_components[0].short_name
        // );
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
          zoom: map.zoom,
          uncontrolledAdr: false
        };
      });
    });
  }, []);

  const geocodeLatLng = (geocoder, map, lat, lng) => {
    geocoder.geocode({ location: { lat: lat, lng: lng } }, function(
      results,
      status,
      error_message
    ) {
      //console.log("results: ", results, status, error_message);
      var shortAddress;
      if (results) {
        var spl = results[0].formatted_address.split(" ");
        shortAddress = [spl[0], spl[1], spl[2], spl[3]].join(" ");
      } else {
        shortAddress = "Just decide please!!";
      }

      status &&
        props.setCustomMapParam(prev => {
          return {
            ...prev,
            address: shortAddress,
            lat: lat,
            lng: lng,
            zoom: map.zoom,
            uncontrolledAdr: false
          };
        });
      if (error_message) {
        window.alert("Geocoder failed due to: " + status);
        //this.setState({addressOffer: "No address in your location"})
        // props.setCustomMapParam(prev => {
        //   return { ...prev, address: "Failed to localize you" };
        // });
      }
    });
  };

  const MapAtom = useMemo(
    () => (
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
    ),
    [onMapMount, MapOptions]
  );

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
            name="address"
            autoComplete="address"
            style={{
              marginBottom: 0,
              display:
                props.customMapParam && props.customMapParam.uncontrolledAdr
                  ? "block"
                  : "none"
            }}
            onKeyPress={e => {
              if (e.key === "Enter") e.preventDefault();
            }}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="input-location-controlled"
            value={
              props.customMapParam && props.customMapParam.address
                ? props.customMapParam.address
                : "no address yet"
            }
            //label="Enter a location"
            //placeholder="Enter a location"
            name="address"
            style={{
              marginBottom: 0,
              display:
                props.customMapParam &&
                props.customMapParam.uncontrolledAdr &&
                "none"
            }}
            disabled
            onKeyPress={e => {
              if (e.key === "Enter") e.preventDefault();
            }}
            onClick={() => {
              props.setCustomMapParam(prev => {
                return {
                  ...prev,
                  uncontrolledAdr: true
                };
              });
            }}
            autoFocus
          />
        </Grid>
      </Grid>
      {MapAtom}
    </>
  );
}

export default React.memo(MapCreate);
