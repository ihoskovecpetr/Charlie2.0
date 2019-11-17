import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    // width: `100%`,
    // height: `100%`,
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  }
}));

export default function CreateMap() {
  const classes = useStyles();

  initMap = () => {
    console.log("initialisation of map props: ", this.props);

    var LandL;
    var Zoom;

    if (this.props.isUpdating) {
      console.log("LandL from isUpdating!!");
      LandL = [
        this.props.updatingValues.geometry.coordinates[1],
        this.props.updatingValues.geometry.coordinates[0]
      ];
    } else {
      if (this.props.workingLocationGate[0] == undefined) {
        //loading this location on  backgrould of Jumbo
        LandL = [-33.81, 151.2];
        Zoom = 10;
        console.log("GENERAL location");
      } else {
        LandL = [
          this.props.workingLocationGate[0],
          this.props.workingLocationGate[1]
        ];
        Zoom = 11;
      }
    }

    map = new window.google.maps.Map(document.getElementById("map-create"), {
      center: { lat: LandL[0], lng: LandL[1] },
      zoom: Zoom,
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      clickableIcons: false,
      gestureHandling: "cooperative"
    });

    geocoder = new window.google.maps.Geocoder();
    var GeoMarker = new window.GeolocationMarker(map);

    var input = document.getElementById("input-location");
    var autocomplete = new window.google.maps.places.Autocomplete(input);
    var infowindow = new window.google.maps.InfoWindow();

    autocomplete.bindTo("bounds", map);

    marker = new window.google.maps.Marker({
      map: map,
      anchorPoint: new window.google.maps.Point(0, -29)
    });

    var here = this;

    if (this.state.location[0]) {
      console.log("we do have location");
      marker.setPosition({
        lat: this.state.location[1],
        lng: this.state.location[0]
      });
      marker.setVisible(true);
    } else {
      console.log("we do NOT have location");
    }

    autocomplete.addListener("place_changed", function() {
      console.log("place_changed LISTENER AUTOCOMPL");
      infowindow.close();
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
        map.setZoom(17); // Why 17? Because it looks good.
      }
      console.log("LOCATION  FORM: ", place.geometry.location);
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      var address = "";

      console.log("place.address_components");
      console.log(place);

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

      //here.validateField('timezone', place.utc_offset)

      here.setState(
        {
          address: address,
          addressCustom: document.getElementById("input-location").value,
          location: [
            place.geometry.location.lat(),
            place.geometry.location.lng()
          ]
          //venueTimeOffset: place.utc_offset,
        },
        () => {
          console.log("VALID from initMap");
          here.validateField("location", here.state.location);
        }
      );
    });

    map.addListener("click", e => {
      console.log("CLIKC to MAP");

      document.getElementById("input-location").value = "";

      // marker.setVisible(false);
      // marker.setPosition(e.latLng);
      // marker.setVisible(true);

      console.log(e.latLng.lat());
      console.log(e.latLng.lng());
      this.setState(
        {
          location: [e.latLng.lat(), e.latLng.lng()],
          addrOff: false,
          address: document.getElementById("input-location").value
        },
        () => {
          this.geocodeLatLng(geocoder, map, e.latLng.lat(), e.latLng.lng());
        }
      );
    });
  };

  return (
    <div className={classes.root}>
      <div id="map-create"> </div>
    </div>
  );
}
