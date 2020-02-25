import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Paper from "@material-ui/core/Paper";
import Chip from '@material-ui/core/Chip';
import Typography from "@material-ui/core/Typography";
import Collapse from '@material-ui/core/Collapse';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { makeStyles, useTheme } from "@material-ui/core/styles";

import clsx from "clsx";

import SwipeableViews from "react-swipeable-views";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory, NavLink } from "react-router-dom";

import { UserContext } from "../userContext";
// import { useWindowSize } from "../Hooks/useWindowSize";

import Spinner from "../Atoms/Spinner";

import SettingsPanel from "../Molecules/play/SettingsPanel";

import PlayPageGallery from "../Molecules/play/play_page_gallery";
import PlayPageList from "../Molecules/play/play_page_list";
import PlayPageMap from "../Molecules/play/play_page_map";

const PLAY_EVENTS = gql`
  mutation getPlayEvents(
    $plusDays: Int!
    $lng: Float
    $lat: Float
    $radius: Int
  ) {
    getPlayEvents(
      playInput: {
        plusDays: $plusDays
        lng: $lng
        lat: $lat
        radius: $radius
      }
    ) {
      _id
      success
      message
      name
      author {
        _id
        name
        picture
        description
      }
      dateStart
      geometry {
        coordinates
      }
      address
      capacityMax
      price
      description
      BYO
      currency
      freeSnack
      imagesArr {
        caption
        src
        thumbnail
        thumbnailHeight
        thumbnailWidth
        scaletwidth
        marginLeft
        vwidth
      }
      confirmed
      areYouAuthor
      bookings{
        _id
        confirmed
        user{
          _id
          name
          picture
        }
      }
    }

  }
`;

// showBookings(id: $id) {
//   confirmed
//   cancelled
//   message
//   user {
//     _id
//     name
//     email
//     picture
//   }
// }

const EVENT_RATINGS = gql`
  query showRatings($event_id: ID!) {
    showRatings(event_id: $event_id) {
      guest {
        picture
        name
      }
      message
      ratingValue
      createdAt
    }
  }
`;


const BOOKING = gql`
  mutation bookEvent($user_id: String!, $event_id: String!) {
    bookEvent(user_id: $user_id, event_id: $event_id) {
      success
    }
  }
`;

const CANCELLING = gql`
  mutation cancelBooking($user_id: String!, $event_id: String!) {
    cancelBooking(user_id: $user_id, event_id: $event_id) {
      _id
      success
    }
  }
`;



function Play() {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  // const windowSize = useWindowSize();
  const { context, setContext } = useContext(UserContext);
  const [discovered, setDiscovered] = useState(0);
  const [loadingPlay, setLoadingPlay] = useState(false);
  const [playFilter, setPlayFilter] = useState({
    days: 2,
    radius: 20,
  });

  const [getPlayEventsMutation, { loading, error, data, refetch }] = useMutation(PLAY_EVENTS);
  const ratings = useQuery(EVENT_RATINGS, {
    variables: { event_id: "props.match.params.id" }
    //skip: !id,
    //pollInterval: 500
  });
    const [cancelBooking, cancelledState] = useMutation(CANCELLING);
    // const [deleteOneEvent, deleteState] = useMutation(DELETE);
    const [createBooking, bookingStates] = useMutation(BOOKING);

  useEffect(() => {
    console.log("GRAPHQL: ", playFilter.days, context.geolocationObj, playFilter.radius);
    alert(`${playFilter.days} , ${context.geolocationObj ? context.geolocationObj.lng : "No Location"}`)
    if(context.geolocationObj && playFilter.days && playFilter.radius){
      getPlayEventsMutation({variables:{
          plusDays: playFilter.days,
          lng: context.geolocationObj ? context.geolocationObj.lng : null,
          lat: context.geolocationObj ? context.geolocationObj.lat : null,
          radius: playFilter.radius
    }})
    }

    return () => {
    } 
  }, [playFilter, context]);

  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [playFilter]);


  useEffect(() => {
    if(!context.geolocationObj){
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     setContext(prev => {return {...prev, geolocationObj: {lat: position.coords.latitude, lng: position.coords.longitude}}});
    // });
    }
  }, []);


let dataDB;

if (data) {
    dataDB = data;
    var { getPlayEvents } = dataDB;
  }

  function discoverPlay(){
    setLoadingPlay(true)
    setTimeout(() => {
      setDiscovered(discovered + 1)
      setLoadingPlay(false)
    }, 500)
    setTimeout(() => {
      window.scrollBy({
        top: 200,
        left: 0,
        behavior: 'smooth'
      });
      }, 800)

  }

  return (
    <div
      className={classes.playWrap}
      style={{ position: context.freezScroll ? "fixed" : "absolute" }}
    >
    <Container
      maxWidth="xs"
      className={classes.playContainer}
    >
      <Paper className={classes.paper}>

          <SettingsPanel  getPlayEventsMutation={getPlayEventsMutation} 
                          setPlayFilter={setPlayFilter}
                          playFilter={playFilter}
                          loading={loading}
                          numItems={getPlayEvents ? getPlayEvents.length : 0} />
          {/* <JoinPanel /> */}

            {loading && (
              <Grid container justify="center" alignItems='center' className={classes.loadingGridCont}>
                <Grid item>
                  <Spinner height={100} width={100} />
                </Grid>
              </Grid>
            )}
            <Grid
              container
              justify="center"
              direction="column"
              alignItems="center"
              alignContent="center"
              style={{ width: "100%" }}
            >
            {getPlayEvents && getPlayEvents.map((event, index) => {

              return (
               <div style={{ backgroundColor: (index % 2 === 0) ? "#242323" : "#908E8E", width: "100%", color: (index % 2 === 0) ? "lightgrey" : "black", }} >
              {index != 0 && index <= discovered + 1 && 
              <Grid container
                    className={classes.nextEventBox}
                    justify="center" 
                    onClick={discoverPlay}
                    style={{display: (index === discovered + 1) ? "flex" : "flex"}}>
                   <Grid item style={{ margin: "30px"}}>
                      {!loadingPlay && <ArrowDownwardIcon color="secondary" style={{ fontSize: 100 }} />}
                      {loadingPlay && <Spinner height={100} width={100} />}
                    </Grid>
              </Grid>}
              <Collapse in={index <= discovered }>
              <div style={{display: index <= discovered ? "block" : "none"}}>
              
                <Grid container justify='center'>
                  <Grid item>
                      <Typography variant="h4" className={classes.mainHeader}>
                      {event.name}
                      </Typography>
                  </Grid>
                </Grid>
                  <PlayPageGallery event={event} />
                  <PlayPageList
                    event={event}
                    showBookings={getPlayEvents.bookings} //showBookings
                    ONE_EVENT={PLAY_EVENTS}
                    cancelBooking={cancelBooking}
                    cancelledState={cancelledState}
                    bookingStates={bookingStates}
                  />
                  <PlayPageMap
                    event={event}
                    showBookings={getPlayEvents.bookings} //showBookings
                    ratings={ratings}
                  /> 
                   
                      <Grid container
                            className={classes.nextEventBox}
                            alignItems="center">
                        <Grid item xs={12}>
                          
                          <Chip label={`JOIN`} 
                                //variant="outlined" 
                                color="secondary" 
                                style={{width: "90%", fontWeight: 500, fontSize: 25, padding: 20, margin: "5%"}} 
                                onClick={discoverPlay}
                                />
                        </Grid>
                      </Grid>
                  </div>
               
              </Collapse> 
              </div>
             ) 
            }
             )}
            </Grid>

      </Paper>
    </Container>
    </div>
  );
}
const useStyles = makeStyles(theme => ({
  playContainer: {
    padding: 0,
  },
  loadingGridCont: {
    minHeight: "100vh",
  },
  playWrap: {
    width: '100%',
    top: 0,
    minHeight: "100%",
  },
  paper: {
    width: "100%",
    minHeight: "100%",
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#242323",
    color: "white"
  },
  mainHeader:{
    marginTop: '50px',
    marginBottom: '20px'
  },
  nextEventBox: {
    width: "100%",
    backgroundColor: "transparent",
    paddingBottom: 20,
    paddingTop: 50,
  },
  light: {
    backgroundColor: "lightgrey"
  }
}));

export default Play;
