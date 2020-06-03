/* eslint-disable no-undef */
import ReactDOM from "react-dom";
import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  gql
} from "apollo-boost";
import { BatchHttpLink } from "apollo-link-batch-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { WebSocketLink } from "apollo-link-ws";
import { setContext } from "apollo-link-context";
import { getMainDefinition } from "apollo-utilities";
import { GeolocationMarker } from 'geolocation-marker'

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import "date-fns";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import { UserContext } from "src/userContext";
import mapSetup from "../Services/map-settings";
import { ALL_EVENTS } from "../Services/GQL";

import Map from "../Atoms/MapAtom";
import InfoWindow from "../Molecules/Infowindow";
import MapSettingsPanel from "../Molecules/MapSettingsPanel";
import DrawerWrap from 'src/Molecules/map/DrawerWrap';

let infoBubble;
let previousMarker;
let AllMarkersArr;
let MapObject;


var GQL_ENDPOINT = `http://localhost:4005/graphql`;
if (process.env.NODE_ENV == "production") {
  GQL_ENDPOINT = `https://${window.location.host}/graphql`;
}
const httpLink = new BatchHttpLink({
  uri: GQL_ENDPOINT,
  headers: {
    authorization: window.localStorage.getItem("token")
  }
});

var WS_ENDPOINT = `ws://localhost:4005/subs`;
if (process.env.NODE_ENV == "production") {
  WS_ENDPOINT = `wss://${window.location.host}/subs`;
}

const wsLink = new WebSocketLink({
  uri: WS_ENDPOINT,
  options: {
    reconnect: true
  }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = window.localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  };
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all"
    }
  }
});

function MapPage(props) {
  const classes = useStyles();
  let history = useHistory();
  // const windowSize = useWindowSize()
  const [windowHeight, setWindowHeight] = useState(0);
  const [mapOptions, setMapOptions] = useState({
                                          center: props.workingPosition && props.workingPosition.geometry ? props.workingPosition.geometry : { lat: 50.068645, lng: 14.457364 },// ,
                                          zoom: props.workingPosition && props.workingPosition.zoom ? props.workingPosition.zoom : 10,
                                          disableDefaultUI: true,
                                          zoomControl: true,
                                          //mapTypeId: window.google.maps.MapTypeId.ROADMAP,
                                          clickableIcons: false,
                                          gestureHandling: "cooperative",
                                          backgroundColor: "#242323",
                                          styles: mapSetup
                                        });
  const [openDrawer, setOpenDrawer] = useState(false)
  const { context, setContext } = useContext(UserContext);
  const { loading, error, data, fetchMore } = useQuery(ALL_EVENTS, {
    variables: {  date: props.workingPosition && props.workingPosition.date ? props.workingPosition.date : new Date().toISOString().split("T")[0], 
                  offset: 1,
                  limit: 1 
              },
      fetchPolicy: "cache-and-network"
  });

  console.log("RERENDER MAP PAGE: openDrawer", openDrawer)


  useEffect(() => {
    // if (!window.AppHistory) {
    //   window.AppHistory = history;
    // }
    console.log("Map.js rerendering")
    setWindowHeight(window.innerHeight)
  }, []);


  const clearMarkers = () => {
    for (let i = 0; i < AllMarkersArr.length; i++) {
      AllMarkersArr[i].setMap(null);
    }
  };

  const redirectLogin = () => {
    history.push("/signin");
  };

  if (error) {
    alert("Unable to load Events...");
  }

  const handleScrollLocTime = isoDate => {
    let center = MapObject.getCenter();
    console.log("Setting Working Position from hndleScroll", center.lng())
    props.setWorkingPosition(prev => {return({
      ...prev,
      geometry: { lng: center.lng(), lat: center.lat() },
      zoom: MapObject.getZoom(),
      date: isoDate
      })
    });
  };

  const onMapMount = useCallback(map => {
    let uniqueArrayOfId = [];
    let UniqArr = [];
    // let dataDB;
    console.log("Map Mounted:: ", google);
    // declare var google;
    MapObject = map;

    var GeoMarker = new window.GeolocationMarker(map);

    if (data && data.eventGeoDay) {
      for (var i = 0; i < data.eventGeoDay.length; i++) {
        if (
          uniqueArrayOfId.indexOf(data.eventGeoDay[i]._id) == -1 &&
          data.eventGeoDay[i].confirmed == true
        ) {
          uniqueArrayOfId.push(data.eventGeoDay[i]._id);
          UniqArr.push(data.eventGeoDay[i]);
        }
      }
    }

    map.addListener("idle", function() {
      console.log("Mapa Idle map: ", map)
      var bounds = map.getBounds();
      var center = map.getCenter();

    //   //console.log("ZOOOM1: ", bounds);
    //   //console.log("ZOOOM2: ", bounds.getNorthEast());
    //   //var ne = bounds.getNorthEast();
    //   //var sw = bounds.getSouthWest();
    //   //console.log("ne, ", ne);
    //   // console.log(sw)
    //   // console.log(JSON.stringify(ne.lng()), JSON.stringify(ne.lat()), JSON.stringify(sw.lng()) , JSON.stringify(sw.lat()))
    //   //  var ne1 = new Number(JSON.stringify(ne.lng()))
    //   //  var ne2 = new Number(JSON.stringify(ne.lat()))
    //   //  var sw1 = new Number(JSON.stringify(sw.lng()))
    //   //  var sw2 = new Number(JSON.stringify(sw.lat()))

    //   // var newPoly0 = [[sw1, sw2], [ne1, sw2], [ne1, ne2], [sw1, ne2]]
    //   // var newPoly = [[sw1, sw2], [ne1, sw2], [ne1, ne2], [sw1, -33.8]]
    //   // var newPoly2 = [[sw1, sw2], [ne1, sw2], [ne1, ne2], [sw1, -33.9]]
    //   // console.log("newPoly", newPoly)

    //   // var SumPolyWork = SumPoly

    //   // console.log("...SumPolyWork")
    //   // console.log(...SumPolyWork)

    //   // SumPoly = polygon.union(...SumPolyWork , POLY_A);
    //   // console.log("SumPoly", SumPoly)
    //   //console.log("Setting current: ");

    //   //   if(props.workingPosition.zoom != map.getZoom() || props.workingPosition.geolocation.lat != center.lat()){
         console.log("Set new Idle zoom: ", center.lat(), center.lng())
        //  if(center){
        //     props.setWorkingPosition(prev => {return({
        //       ...prev,
        //       geolocation: { lat: center.lat(), lng: center.lng() },
        //       zoom: map.getZoom()
        //     })});
        //  }

    //   //   }




    //   //here.fetchBoundariesSingle(ne,sw)
    //   //console.log("Fetch points BoarDERS?");
    });

    map.addListener("click", function(event) {

      // here.setState({confirmedPressed: false})
      if (previousMarker) {
        infoBubble.close();
        setTimeout(() => {
          if (document.getElementById("infoWindow")) {
            ReactDOM.unmountComponentAtNode(
              document.getElementById("infoWindow")
            );
          }
        }, 10);
        //infoBubble.setMap(null);
        previousMarker = undefined;
      }
    });

    infoBubble = new window.InfoBubble({
      content: `<div id="infoWindow"> </div>`,
      shadowStyle: 1,
      padding: 0,
      backgroundColor: "#242323",
      borderRadius: 0,
      arrowSize: 10,
      borderWidth: 0,
      borderColor: "#ffffff",
      disableAutoPan: true,
      hideCloseButton: true,
      arrowPosition: 50,
      backgroundClassName: "nonused",
      enableEventPropagation: false,
      arrowStyle: 0,
      minWidth: 200,
      minHeight: 160
    });
    {
      if (!loading) {
        AllMarkersArr = UniqArr.map((location, i) => {
          var urlNA = "https://res.cloudinary.com/party-images-app/image/upload/v1583692669/ijy8dorejsarudzkauma.png" // {BasicMarker}
          var urlAttend = "https://res.cloudinary.com/party-images-app/image/upload/v1583692624/nwvqlicffptzqpwha5no.png" // {CharlieMarker} 
          var url = urlNA;

          location.bookings &&
            location.bookings.map((guest, index) => {
              //console.log("User indexOf: ", guest.user._id, user._id);
              // if (guest.user._id == context._id) {
              //   //console.log("Yes, GUEST");
              //   {
              //     !guest.cancelled && guest.confirmed && (url = urlAttend);
              //   }
              // } else {
              //   //console.log("No, GUEST");
              // }
              // if (here.props.email.indexOf(guest.guest_email) !== -1 && guest.guest_confirmed == true) {
              //   url = urlAttend
              // }
            });
          var image = {
            url: url,
            size: new window.google.maps.Size(48, 48),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(24, 48),
            scaledSize: new window.google.maps.Size(48, 48)
          };

          var marker = new window.google.maps.Marker({
            position: {
              lat: location.geometry.coordinates[1],
              lng: location.geometry.coordinates[0]
            },
            map: map,
            icon: image,
            // animation: window.google.maps.Animation.DROP,
            title: location.name
          });

          marker.addListener("click", function() {
            console.log("Marker Click", infoBubble)

            if (previousMarker) {
              infoBubble.close()
              previousMarker = undefined
            } else{
            infoBubble.addListener("domready", e => {
                setTimeout(() => {
                ReactDOM.render(
                  <>
                  <ApolloProvider client={client}>
                    <UserContext.Provider value={() => {}} >
                      <Router>
                        <DrawerWrap open={true} event={location} context={context} setContext={setContext} />
                      </Router>
                    </UserContext.Provider>
                  </ApolloProvider>
                  <InfoWindow
                      lat={location.geometry.coordinates[0]}
                      lng={location.geometry.coordinates[1]}
                      id={location._id}
                      location={location}
                      context={context}
                      setContext={setContext}
                      setOpenDrawer={setOpenDrawer}
                      openDrawer={openDrawer}
                      redirectLogin={redirectLogin} />
                  </>
                  ,
                  document.getElementById("infoWindow")
                );
              }, 100);
            });
            infoBubble.open(map, marker);
            previousMarker = location
          }
          });

          return marker;
        });
      }
    }
  });

  useEffect(() => {
    
    console.log("Context Map Geo rewrite from actual!!")
    if (context.geolocationObj && !props.workingPosition.geolocation) {
      console.log("Settig LngLat from CONTEXT  ", context.geolocationObj)

      setMapOptions(prev => {
        return({
          ...prev,
          center: context.geolocationObj
        })
      })
    }
  }, [context.geolocationObj])

  useEffect(() => {
    console.log("props.workingPosition: ", props.workingPosition)
    if (props.workingPosition && props.workingPosition.geometry) {
      console.log("Settig lngLat prop.workingLoc ", props.workingPosition)

      setMapOptions(prev => {
        return({
          ...prev,
          center: props.workingPosition.geometry
        })
      })
    }
  }, [props.workingPosition])



  const MapAtom = useMemo(
    () => (
      <div style={{ 
            width: "100%",
            height: `${1*windowHeight}px`,
            top: 0,
            position: "absolute",
            background: "black"
            }}>
      <Map
        onMount={onMapMount}
        options={mapOptions}
        className="main-map"
        styling={{
          width: "100%", 
          position: 'absolute', 
          height: `${1*windowHeight}px`,
          top: 0,
          bottom: 0}}
      />
      </div>
    ),
    [onMapMount, mapOptions]
  );


  return (
    <div component="main" className={classes.container}>
      <CssBaseline />
      <MapSettingsPanel
        //dateState={workDate}
        dateState={props.workingPosition && props.workingPosition.date ? props.workingPosition.date : 0}
        positionState={props.workingPosition && props.workingPosition.geometry}
        setWorkDate={props.setWorkingPosition}
        handleScrollLocTime={handleScrollLocTime}
        clearMarkers={clearMarkers}
        loading={loading}
      />
      {MapAtom}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  container: {
    padding: 0
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default MapPage;
