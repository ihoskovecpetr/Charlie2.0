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
import NoLocationBck from "../Molecules/play/NoLocationBck";
import JoinBackdrop from "../Molecules/play/JoinBackdrop";

const PLAY_EVENTS = gql`
  mutation getPlayEvents(
    $plusDays: Int!
    $lng: Float
    $lat: Float
    $radius: Int
    $shownEvents: [ID]
  ) {
    getPlayEvents(
      playInput: {
        plusDays: $plusDays
        lng: $lng
        lat: $lat
        radius: $radius
        shownEvents: $shownEvents
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
  const [firstArrCount, setFirstArrCount] = useState(0);
  // const [playFilter, setPlayFilter] = useState({
  //   days: 2,
  //   radius: 20,
  // });

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
    console.log("GRAPHQL: ", context.days, context.geolocationObj, context.radius);
    // alert(`${playFilter.days} , ${context.geolocationObj ? context.geolocationObj.lng : "No Location"}`)
    if(context.geolocationObj && context.days && context.radius){
      getPlayEventsMutation({variables:{
          plusDays: context.days,
          lng: context.geolocationObj ? context.geolocationObj.lng : null,
          lat: context.geolocationObj ? context.geolocationObj.lat : null,
          radius: context.radius, // playFilter.radius,
          shownEvents: context.shownEvents
    }})
    }
    return () => {
    } 
  }, [
      context.geolocationObj && context.geolocationObj.lng, 
      context.geolocationObj && context.geolocationObj.lat, 
      context.radius, 
      context.days,
      context.shownEvents
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [context]);

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

  useEffect(() => {
    console.log("getPlayEvents: ", getPlayEvents, context.playEventsCount);
    if(getPlayEvents){
      if(context.playEventsCount === null){
        console.log("Pass if null")
        setContext(prev => {return {...prev, playEventsCount: getPlayEvents.length}});
      }
    }
  }, [getPlayEvents]);

  // useEffect(() => {
  //   console.log("NEW FILTER", getPlayEvents)
  //   if(getPlayEvents){
  
  //       setContext(prev => {return {...prev, playEventsCount: getPlayEvents.length}});

  //   }

  // }, [context.radius, context.days, getPlayEvents]);


  useEffect(() => {
    console.log("REPLACE URL")
    getPlayEvents && history.replace(`/play/${getPlayEvents[0]._id}`)
    window.scrollTo(0, 0);
  }, [getPlayEvents && getPlayEvents[0]]);


  function discoverPlay(){
    setLoadingPlay(true)
    setTimeout(() => {
      // setDiscovered(discovered + 1)
      setContext(prev => {
        console.log("prev.shownEvents, getPlayEvents[0] ", getPlayEvents[0]._id);
        return {...prev, shownEvents: [...prev.shownEvents, getPlayEvents[0]._id]}});
      window.scrollTo(0,0);
      setLoadingPlay(false)
    }, 500)
    // setTimeout(() => {
    //   window.scrollBy({
    //     top: 200,
    //     left: 0,
    //     behavior: 'smooth'
    //   });
    //   }, 800)

  }

  console.log("History: ", history)

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
        {!context.geolocationObj &&
        <NoLocationBck />}

          <SettingsPanel  getPlayEventsMutation={getPlayEventsMutation} 
                          // setPlayFilter={setPlayFilter}
                          // playFilter={playFilter}
                          loading={loading}
                          numItems={getPlayEvents ? getPlayEvents.length : 0} />
          <JoinBackdrop />

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
                   <Grid item xs={12} style={{ margin: "30px"}}>
                      <Grid container justify="center">
                          {!loadingPlay && index === discovered + 1 && <Grid item><ArrowDownwardIcon color="secondary" style={{ fontSize: 100 }} /></Grid>}
                          {!loadingPlay && index <= discovered && <Grid item><Typography variant="h4">{index + 1}/{getPlayEvents ? getPlayEvents.length : 0}</Typography></Grid>}
                          {loadingPlay && <Grid item><Spinner height={100} width={100} /></Grid>}
                      </Grid>
                    </Grid>
                    <Grid item xs={12} style={{display: index === discovered + 1 ? "block" : "none"}}>
                      <Grid container justify="center" alignItems='center' className={classes.mainHeaderFake}>
                      <Grid item>
                        {loadingPlay && <Spinner height={30} width={30} />}
                      </Grid>
                      </Grid>
                      <Grid container justify="center" alignItems='center' className={classes.mainGalleryFake}>
                      <Grid item>
                        {loadingPlay && <Spinner height={40} width={40} />}
                      </Grid>
                      </Grid>
                    </Grid>
              </Grid>}
              <Collapse in={index <= discovered }>
              <div style={{display: index <= discovered ? "block" : "none"}}>
              
                <Grid container justify='center'>
                  <Grid item style={{ marginTop: index === 0 && "30px"}}>
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
                                // onClick={discoverPlay}
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
    marginTop: '30px',
    marginBottom: '20px'
  },
  mainHeaderFake: {
    backgroundColor: "#6F6F6F",
    height: "40px",
    width: "80%",
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: 30
  },
  mainGalleryFake: {
    backgroundColor: "#2F2F2F",
    height: "60px",
    width: "100%",
  },
  nextEventBox: {
    width: "100%",
    backgroundColor: "transparent",
    paddingTop: 20,
  },
  light: {
    backgroundColor: "lightgrey"
  },
}));

export default Play;
