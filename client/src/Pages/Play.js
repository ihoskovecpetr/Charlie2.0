import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Collapse from '@material-ui/core/Collapse';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMutation, useQuery } from "@apollo/react-hooks";

import gql from "graphql-tag";
import { useHistory, NavLink } from "react-router-dom";

import { UserContext } from "../userContext";
// import { useWindowSize } from "../Hooks/useWindowSize";

import Spinner from "src/Atoms/Spinner";

import SettingsPanel from "../Molecules/play/SettingsPanel";
import JoinSend from "../Molecules/play/JoinSend";

import PlayPageGallery from "../Molecules/play/PlayPageGallery";
import PlayPageList from "../Molecules/play/PlayPageList";
import PlayPageMap from "../Molecules/play/PlayPageMap";
import NoLocationBck from "../Molecules/play/NoLocationBck";
import TimeDistanceChips from "../Molecules/play/TimeDistanceChips";
import LoginFirstBoard from "src/Atoms/LoginFirstBoard";
import NoEventsBoard from "src/Atoms/NoEventsBoard";
import { PLAY_EVENTS } from "src/Services/GQL/PLAY_EVENTS";

function Play() {
  const classes = useStyles();
  let history = useHistory();
  const { context, setContext } = useContext(UserContext);
  const [discovered, setDiscovered] = useState(0);
  const [loadingPlay, setLoadingPlay] = useState(false);

  const [getPlayEventsMutation, { loading, error, data, refetch }] = useMutation(PLAY_EVENTS);

  useEffect(() => {
    console.log("GRAPHQL:  wndw.firstPrint: ", window.firstPrintPlay);
    if(context.geolocationObj && context.days !== null && context.radius && context.name && !context.firstPrint){
      getPlayEventsMutation({
        variables:{
          plusDays: context.filterOn ? context.days : 10000,
          lng: context.geolocationObj ? context.geolocationObj.lng : null,
          lat: context.geolocationObj ? context.geolocationObj.lat : null,
          radius: context.filterOn ? context.radius : 9999999, // playFilter.radius,
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
      context.shownEvents,
      context.name,
      context.filterOn
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



if (data) {
  console.log("Data normatXX")
    var { getPlayEvents } = data;
  }
  // else if(oneEventData.data){
  //   console.log("Data from ONEEvent: ", oneEventData.data.getOneEvent)
  //   var getPlayEvents = [oneEventData.data.getOneEvent];
  // }

  console.log("getPlayEvents: RESULT ", getPlayEvents);

  useEffect(() => {
    console.log("getPlayEvents: ", getPlayEvents, context.playEventsCount);
    if(getPlayEvents){
      if(context.shownEvents.length === 0){ // context.playEventsCount === null
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
    console.log("REPLACE URL history: ", history.location.pathname);
    if(getPlayEvents){history.replace(`/play/${getPlayEvents[0]._id}`)} 
    window.scrollTo(0, 0);
  }, [getPlayEvents && getPlayEvents[0]]);


  function discoverPlay(){
    setLoadingPlay(true)
    setTimeout(() => {
      // setDiscovered(discovered + 1)
      setContext(prev => {
        return {...prev, shownEvents: [...prev.shownEvents, getPlayEvents[0]._id]}});
      window.scrollTo(0,0);
      setLoadingPlay(false)
    }, 500)
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
        {context.name && !context.geolocationObj &&
        <NoLocationBck />}

          <SettingsPanel  getPlayEventsMutation={getPlayEventsMutation} 
                          // setPlayFilter={setPlayFilter}
                          // playFilter={playFilter}
                          loading={loading}
                          />

            {loading && (
              <Grid container justify="center" alignItems='center' className={classes.loadingGridCont}>
                <Grid item>
                  <Spinner height={100} width={100} />
                </Grid>
              </Grid>
            )}
            {!context.name && (
              <Grid container justify="center" alignItems='center' className={classes.loadingGridCont}>
                <Grid item>
                <LoginFirstBoard />
                </Grid>
              </Grid>
            )}

            {getPlayEvents && getPlayEvents.length === 0 && (
              <Grid container justify="center" alignItems='center' className={classes.loadingGridCont}>
                <Grid item>
                <NoEventsBoard />
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
               <div style={{ width: "100%", color: (index % 2 === 0) ? "lightgrey" : "black", }} >
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
                    <Grid item xs={12} style={{display: index === discovered + 1 ? "block" : "none", padding: "4px"}}>
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
              <div style={{display: index <= discovered ? "block" : "none", marginTop: index === 0 && 80}}>
              
                {/* <Grid container justify='center'>
                  <Grid item style={{ marginTop: index === 0 && 40}}>
                      <Typography variant="h4" className={classes.mainHeader}>
                        {event.name}
                        <p className={classes.thisLine}></p>
                      </Typography>
                  </Grid>
                  <TimeDistanceChips event={event} />
                </Grid> */}
                  <PlayPageGallery event={event} />
                  <PlayPageList
                    event={event}
                    bookings={event.bookings}
                    showBookings={event.bookings} //showBookings
                    // bookingStates={bookingStates}
                  />
                  <PlayPageMap
                    event={event}
                    showBookings={getPlayEvents.bookings} //showBookings
                  /> 
                   
                      <Grid container
                            className={classes.nextEventBox}
                            alignItems="center">
                        <Grid item xs={12}>
                          

                            <JoinSend event={event} getPlayEventsMutation={getPlayEventsMutation} getPlayEvents={getPlayEvents} />

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
  playWrap: {
    width: '100%',
    top: 0,
    minHeight: "100%",
    background:
    "linear-gradient(90deg, #311F26 30%, #90053B 100%)",
  },
  playContainer: {
    padding: 0,
  },
  loadingGridCont: {
    minHeight: "100vh",
  },
  paper: {
    width: "100%",
    minHeight: "100%",
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: "#242323",
    background:
    "linear-gradient(90deg, #311F26 30%, #90053B 100%)",
    color: "white"
  },
  mainHeader:{
    marginTop: '30px',
    marginBottom: '10px'
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
    paddingBottom: 20,
  },
  light: {
    backgroundColor: "lightgrey"
  },

  thisLine:{
    height: '1px',
    width: '100%',
    marginTop: '2px',
    backgroundColor: "#707070"
  },

}));

export default Play;
