import React, { useState, useContext, useEffect } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { useHistory, NavLink } from "react-router-dom";

import { UserContext } from "../userContext";
// import { useWindowSize } from "../Hooks/useWindowSize";

import Spinner from "src/Atoms/Spinner";

import SettingsPanel2 from "src/Molecules/play/SettingsPanel";

import PlayPageGallery from "src/Molecules/play/PlayPageGallery";
import PlayPageList from "src/Molecules/play/PlayPageList";
import PlayPageMap from "src/Molecules/play/PlayPageMap";
import NoLocationBck from "src/Molecules/play/NoLocationBck";
import LoginFirstBoard from "src/Atoms/LoginFirstBoard";
import NoEventsBoard from "src/Atoms/NoEventsBoard";
import EventButtons from "src/Molecules/event/EventButtons";

import { PLAY_EVENTS } from "src/Services/GQL/PLAY_EVENTS";
import { PLAY_EVENTS_QUERY } from "src/Services/GQL/PLAY_EVENTS_QUERY";

function Play() {
  const classes = useStyles();
  let history = useHistory();
  const { context, setContext } = useContext(UserContext);
  const [loadingPlay, setLoadingPlay] = useState(false);

  const { loading, error, data, refetch } = useQuery(PLAY_EVENTS_QUERY, {
    variables: {
      plusDays: context.playFilterObj.filterOn ? context.playFilterObj.plusDays : 10000,
      lng: context.playFilterObj.geolocationPlay ? context.playFilterObj.geolocationPlay.lng : null,
      lat: context.playFilterObj.geolocationPlay ? context.playFilterObj.geolocationPlay.lat : null,
      radius: context.playFilterObj.filterOn ? context.playFilterObj.radius : 9999999,
      shownEvents: context.playFilterObj.shownEvents
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [context.playFilterObj]);


  useEffect(() => {

    return (() => {
      console.log("Going out of Play")
        setContext(prev => {return {
          ...prev, 
          playFilterObj: {
            ...prev.playFilterObj,
            shownEvents: []
          }
        }});
    })
  },[])




  useEffect(() => {
    if(data && data.getJoinEvents){
      if(context.playFilterObj.shownEvents.length === 0){ // context.playEventsCount === null
        console.log("Pass if null")
        setContext(prev => {return {
          ...prev, 
          playFilterObj: {
            ...prev.playFilterObj,
            playEventsCount: data.getJoinEvents.length
          }
          }});
      }
    }
  }, [data]);

  useEffect(() => {
    if(data && data.getJoinEvents[0]){history.replace(`/play/${data.getJoinEvents[0]._id}`)} 
    window.scrollTo(0, 0);
  }, [data, data && data.getJoinEvents[0]]);

  function discoverPlay(){
    setLoadingPlay(true)
    setTimeout(() => {
      // setDiscovered(discovered + 1)
      setContext(prev => {
        return {
          ...prev, 
          playFilterObj: {
            ...prev.playFilterObj,
          shownEvents: [...prev.playFilterObj.shownEvents, data.getJoinEvents[0]._id]
        }
      }});
      window.scrollTo(0,0);
      setLoadingPlay(false)
    }, 500)
  }

  
  return (
    <div
      className={classes.playWrap}
      style={{ position: context.freezScroll ? "fixed" : "absolute", color: "white" }}
    >
    <Container maxWidth="xs">

      <SettingsPanel2  //getPlayEventsMutation={getPlayEventsMutation} 
        loading={loading}
          />
    </Container>

    <Container
      maxWidth="xs"
      className={classes.playContainer}
    >
        {context.name && !context.playFilterObj.geolocationPlay &&
        <NoLocationBck />}

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

            {data && data.getJoinEvents && data.getJoinEvents.length === 0 && (
              <Grid container justify="center" alignItems='center' className={classes.loadingGridCont}>
                <Grid item>
                <NoEventsBoard />
                </Grid>
              </Grid>
            )}
            {data && data.getJoinEvents && data.getJoinEvents.length != 0 && (
            <Grid
              container
              justify="center"
              direction="column"
              alignItems="center"
              alignContent="center"
              style={{ width: "100%" }}
            >
              <div style={{width: "100%", display: "block", marginTop: 80}}>

                  <PlayPageGallery event={data.getJoinEvents[0]} />
                  <PlayPageList
                    event={data.getJoinEvents[0]}
                    bookings={data.getJoinEvents[0].bookings}
                    showBookings={data.getJoinEvents[0].bookings} //showBookings
                    // bookingStates={bookingStates}
                  />
                  <PlayPageMap
                    event={data.getJoinEvents[0]}
                    showBookings={data.getJoinEvents.bookings} //showBookings
                  /> 
                   
                  <Grid container
                        className={classes.nextEventBox}
                        alignItems="center">
                    <Grid item xs={12}>
                        {/* <JoinSend event={getJoinEvents[0]} getPlayEventsMutation={getPlayEventsMutation} /> */}
                        <EventButtons event={data.getJoinEvents[0]} />
                    </Grid>
                  </Grid>
                  <Grid container
                    className={classes.nextEventBox}
                    justify="center">
                      <Grid item xs={12} style={{ margin: "30px"}}>
                          <Grid container justify="center">
                              {!loadingPlay && data.getJoinEvents.length >= 0 &&
                                  <Grid item onClick={discoverPlay}>
                                    <ArrowDownwardIcon color="secondary" style={{ fontSize: 100 }} />
                                  </Grid>
                              }
                              {loadingPlay && <Grid item><Spinner height={100} width={100} /></Grid>}
                          </Grid>
                        </Grid>
                  </Grid>
              </div>
            </Grid>

            )}
  
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
