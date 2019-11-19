import React, { useState , useEffect } from "react";
//import GeolocationMarker from 'geolocation-marker'
import { usePosition } from "../Hooks/useGoelocation";
import TextField from "@material-ui/core/TextField";

import Map from "../Atoms/Hook-map";


export default function MapMolecule(props) {
  const { latitude, longitude, error } = usePosition();
  const [customAddress, setCustomAddress] = useState(`Praha`);
  const [markerGeoloc, setMarkerGeoloc] = useState("oj lng lat");
  console.log("RENDER..........................................Render: ", props )
  var marker;
  var markerGeoLoc = { lat: latitude, lng: longitude };

  useEffect(() => {
    // Update the document title using the browser API
    console.log("useEffect []")
    setMarkerGeoloc({ lat: latitude, lng: longitude })
  }, [latitude, longitude]);


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

    console.log("onMapMount fce ");
    //document.getElementById("map-create");
    
      marker = new window.google.maps.Marker({
      map: map,
      anchorPoint: new window.google.maps.Point(0, -29)
    });

    var input = document.getElementById('input-location');
    var autocomplete = new window.google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    if(props.customMapParam){
      console.log("MArker CL")
      marker.setPosition({ lng: props.customMapParam.lng, lat: props.customMapParam.lat});
      map.setZoom(props.customMapParam.zoom);
    }else if(markerGeoLoc){
      console.log("MArker MGL")
      marker.setPosition(markerGeoLoc);
    }


    map.addListener("click", (e)=> {
      console.log("CLIKC to MAP")
      document.getElementById('input-location').value = ''
      marker.setVisible(false);
      marker.setPosition(e.latLng);
      marker.setVisible(true);
    
      //console.log(e.latLng.lat())
      //console.log(e.latLng.lng())
      // this.setState({ location: [e.latLng.lat(), e.latLng.lng()], 
      //                 addrOff: false, 
      //                 address: document.getElementById('input-location').value}, () => {
      //     //this.geocodeLatLng(geocoder, map, e.latLng.lat(), e.latLng.lng())
      
      // })
    })

    autocomplete.addListener('place_changed', function() {
      //console.log('place_changed LISTENER AUTOCOMPL')
      //infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }

      markerGeoLoc = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
      props.setCustomMapParam({lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), zoom: 14})
      //marker.setPosition(markerGeoLoc);
      marker.setVisible(true);

      var address = '';

      //console.log("place.address_components")
      console.log(place)


      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }

      //here.validateField('timezone', place.utc_offset)

      //setCustomAddress(address)

      // here.setState({ address: address, 
      //                 addressCustom: document.getElementById('input-location').value, 
      //                 location: [place.geometry.location.lat(),place.geometry.location.lng()],
      //                 //venueTimeOffset: place.utc_offset, 
      //                           }, () => {
      //   console.log("VALID from initMap")
      //   here.validateField('location', here.state.location)
      // })
})




  };

  return (
    <>
<p>Lng Lat: {latitude} : {longitude}</p>
<TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="input-location"
            value={customAddress}
            onChange={(e) => { setCustomAddress(e.target.value)}}
            label="Event Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
      <Map onMount={onMapMount} options={MapOptions} />
    </>
  );
}
