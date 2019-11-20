import React, { useContext, useState, useRef } from "react";
import ReactDOM from 'react-dom';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { useMutation, useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";

import { UserContext } from "../userContext";
import { usePosition } from "../Hooks/useGoelocation";
import Dropzone from "../Molecules/Dropzone";
import Spinner from "../Atoms/Spinner";
import Map from "../Atoms/Hook-map";
import InfoWindow from '../Molecules/Infowindow';

const FEW_EVENTS = gql`
query {
  fewEvents {
      _id
      name
      success
    }
  }
`;

let infoBubble;
let InfoBevent = false;
let previousMarker;
let MarkersArr

function MapPage(props) {
  const classes = useStyles();
  let history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [customMapParam, setCustomMapParam] = useState();
  const { latitude, longitude, errorPosition } = usePosition();
  //const [createEvent, { loading, error, data }] = useMutation(NEW_EVENT);
  //const { loading, error, data } = useQuery(FEW_EVENTS);

 //console.log("Few events DATA:", data)



 const dataMock = [{    
  _id: '2sdf2sdfs2sfdsdfs2',
  success: true,
  author: 'Petr Work',
  name: 'Event 111',
  geometry: {coordinates: [50.040112099, 14.428]},
  lng: 14.45,
  lat: 50,
  addressGoogle: "addressGoogle",
  addressCustom: "addressCustom",
  address: "address",
  eventType: 1,
  dateStart: "2019-10-10",
  price: 12,
  capacityMax: 20,
  BYO: true,
  imagesArr: [{caption:"No more pictures for this Event",
              src: "https://s1.at.atcdn.net/wp-content/uploads/2019/03/icebergs-800x584.jpg",
              thumbnail:"https://res.cloudinary.com/party-images-app/image/upload/v1551339472/m...",
              thumbnailHeight:10,
              thumbnailWidth:10,
              scaletwidth:100,
              marginLeft:0,
              vwidth:100
            }
          ],
  description: "Desc",
  confirmed: true ,
  hide: false
},
{    
  _id: '2sdf2sdfs2sfdsdfsdf2',
  success: true,
  author: 'Petr Work',
  name: 'Event 222',
  geometry: {coordinates: [50.050312099, 14.458]},
  lng: 14.45,
  lat: 50,
  addressGoogle: "addressGoogle",
  addressCustom: "addressCustom",
  address: "address",
  eventType: 1,
  dateStart: "2019-10-10",
  price: 12,
  capacityMax: 20,
  BYO: true,
  imagesArr: [{caption:"No more pictures for this Event",
                src: "https://s1.at.atcdn.net/wp-content/uploads/2019/03/icebergs-800x584.jpg",
                thumbnail:"https://res.cloudinary.com/party-images-app/image/upload/v1551339472/m...",
                thumbnailHeight:10,
                thumbnailWidth:10,
                scaletwidth:100,
                marginLeft:0,
                vwidth:100
              }
              ],
  description: "Desc",
  confirmed: true ,
  hide: false
}]

  const onMapMount = map => {
    console.log("onMapMount fce MapPage ");
    let uniqueArrayOfId = []
    let UniqArr = []

    if(dataMock){
      for(var i=0; i<dataMock.length; i++) {
        console.log("dataMock[i]._id: ", dataMock[i]._id)
        if (uniqueArrayOfId.indexOf(dataMock[i]._id) == -1 &&  dataMock[i].confirmed == true) {
          uniqueArrayOfId.push(dataMock[i]._id)
          UniqArr.push(dataMock[i]) 
        }
     }
    }


    map.addListener('idle', function() {
      
      var bounds =  map.getBounds();
      var center = map.getCenter();

      console.log("ZOOOM: ", map.getZoom())
      var ne = bounds.getNorthEast();
      var sw = bounds.getSouthWest();
      // console.log(ne)
      // console.log(sw)
      // console.log(JSON.stringify(ne.lng()), JSON.stringify(ne.lat()), JSON.stringify(sw.lng()) , JSON.stringify(sw.lat()))
      //  var ne1 = new Number(JSON.stringify(ne.lng()))
      //  var ne2 = new Number(JSON.stringify(ne.lat()))
      //  var sw1 = new Number(JSON.stringify(sw.lng()))
      //  var sw2 = new Number(JSON.stringify(sw.lat()))
        
      // var newPoly0 = [[sw1, sw2], [ne1, sw2], [ne1, ne2], [sw1, ne2]]  
      // var newPoly = [[sw1, sw2], [ne1, sw2], [ne1, ne2], [sw1, -33.8]]
      // var newPoly2 = [[sw1, sw2], [ne1, sw2], [ne1, ne2], [sw1, -33.9]]
      // console.log("newPoly", newPoly)

      // var SumPolyWork = SumPoly

      // console.log("...SumPolyWork")
      // console.log(...SumPolyWork)

      // SumPoly = polygon.union(...SumPolyWork , POLY_A);
      // console.log("SumPoly", SumPoly)

  //here.props.setScrolledPosition([center.lat(), center.lng()], map.getZoom())
  //here.fetchBoundariesSingle(ne,sw)
      console.log("Fetch points BoarDERS?")
})

    map.addListener('click', function(event) { 

      console.log("Listener from MAP CLICK")
      console.log("previousMarker:", previousMarker)
  
      //here.setState({confirmedPressed: false})
             
            if (previousMarker && !InfoBevent){  //close the last new location marker and window on click on map
                  console.log("EVENT from Map previousMarker && !InfoBevent")
                  infoBubble.close();
                  setTimeout(() => {
                    if (document.getElementById('infoWindow')) {
                          ReactDOM.unmountComponentAtNode(document.getElementById('infoWindow'))
                    }  
                }, 10) 
                  //infoBubble.setMap(null);
                  previousMarker = undefined;
            }  
            if (previousMarker) {
              console.log("EVENT from Map outside Infobubble")
              infoBubble.close();
              previousMarker = undefined;
            }   
    });

    infoBubble = new window.InfoBubble({
      //content: `<div id="infoWindow"> </div>`, 
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
      backgroundClassName: 'nonused',
      enableEventPropagation: false,
      arrowStyle: 0,
      minWidth: 200,
      minHeight: 220,
    })

      var AllMarkersArr = UniqArr.map((location, i) => {

        var urlNA = "https://res.cloudinary.com/party-images-app/image/upload/v1557626853/j4fot5g2fvldzh88h9u4.png"
        //var urlAttend = "https://res.cloudinary.com/party-images-app/image/upload/v1557648350/caacy89b65efjmwjiho8.png"
        var urlAttend = 'https://res.cloudinary.com/party-images-app/image/upload/v1558048597/lo7digag5hz5alymniwz.png' 
        var url = urlNA

        // location.EventGuests.map((guest, index) => {
        
        //   if (here.props.email.indexOf(guest.guest_email) !== -1 && guest.guest_confirmed == true) {
        //     url = urlAttend
        //   }
        // })

      var image = {
          url: url,
          size: new window.google.maps.Size(48, 48),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(24, 48),
          scaledSize: new window.google.maps.Size(48, 48)
        };


      var marker = new window.google.maps.Marker({
        position: {lat: location.geometry.coordinates[0],
                  lng: location.geometry.coordinates[1]}, 
        map: map,
        icon: image,
        animation: window.google.maps.Animation.DROP,
        title: location.name,
      })

      marker.addListener('click', function() {

        console.log("Marker click listener PREV MARKER: ", previousMarker)
        window.activeLocation_id = location._id

      // if (previousMarker) {
      //       infoBubble.close()
      //       previousMarker = undefined
      // } else{
          infoBubble.addListener('domready', e => {
              setTimeout(() => {
                console.log("PRING INFOW...")
          ReactDOM.render(
          //<p>Infowindow</p>
          <InfoWindow  
                                      lat={location.geometry.coordinates[1]} 
                                      lng={location.geometry.coordinates[0]} 
                                      id={location._id} 
                                      //{...here.props}
                                      location={location} 
                                      //redirectLogin={here.redirectLogin} 
                                      //forceRerender={here.forceRerender}
                                      //handleOpenModalJoinMAP={here.handleOpenModalJoinMAP}
                                      //handleShowJoinedAlertConfirm={here.handleShowJoinedAlertConfirm}
                                      //handleShowMailSent={here.handleShowMailSent}
                                      //AttendingLocationHandler={here.AttendingLocationHandler}
                                      //openGalleryMap={here.openGalleryMap}
                                       /> 
                                      , document.getElementById('infoWindow'))}, 100 ) 
            })
      infoBubble.open(map, marker);
      previousMarker = location;
     // }   
    })



      return marker


    })



  }

  const MapOptions = {
    center: { lat: latitude, lng: longitude },
    zoom: 10,
    disableDefaultUI: true,
    zoomControl: true,
    //mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    clickableIcons: false,
    gestureHandling: "cooperative"
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Party
        </Typography>
        <form className={classes.form} noValidate>
          <Map onMount={onMapMount} options={MapOptions} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => {}}
          >
            Create Party
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Charlie Party
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default MapPage;
