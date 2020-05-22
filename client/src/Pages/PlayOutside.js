import React, { useState, useContext, useEffect } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMutation, useQuery } from "@apollo/react-hooks";

import gql from "graphql-tag";
import { useHistory, NavLink } from "react-router-dom";

import { UserContext } from "../userContext";

import Spinner from "../Atoms/Spinner";

import PlayPageGallery from "../Molecules/play/PlayPageGallery";
import PlayPageList from "../Molecules/play/PlayPageList";
import PlayPageMap from "../Molecules/play/PlayPageMap";
import PlayGoToApp from "../Molecules/play/PlayGoToApp";
import TimeDistanceChips from "../Molecules/play/TimeDistanceChips";
import Lost from "../Images/lost.png"
import { GET_ONE_EVENT } from "src/Services/GQL/GET_ONE_EVENT";


export default function PlayOutside() {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  const { context, setContext } = useContext(UserContext);
  const [loadingPlay, setLoadingPlay] = useState(false);


  const oneEventData = useQuery(GET_ONE_EVENT, {
    variables: { event_id: history.location.pathname.split("/")[2] },
  });

  console.log("Play Other:  wndw.firstPrint: ", window.firstPrintPlay);
  console.log("Data normatXX oneEventData> ERR ", oneEventData.error);
  console.log("Data normatXX oneEventData> DATA ", oneEventData.data);

if (oneEventData.data) {
    var getPlayEvents = oneEventData.data.getOneEvent;
    var bookings = oneEventData.data.showBookings;
  }

  const gointToApp = () => {
    window.eventId = history.location.pathname.split("/")[2]
    history.push("/signin")
  }

  return (
    <div
      className={classes.playWrap}
      style={{ position: context.freezScroll ? "fixed" : "absolute", }}
    >
    
    <Container
      maxWidth="xs"
      className={classes.playContainer}
    >
      <Paper className={classes.paper}>

            {oneEventData.loading && (
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

            <PlayGoToApp />
      
          {getPlayEvents && getPlayEvents.success === true && <>
                <Grid container justify='center'>
                  {/* <Grid item >
                      <Typography variant="h4" className={classes.mainHeader}>
                    {getPlayEvents.name}
                    <p className={classes.thisLine}></p>

                      </Typography>
                  </Grid>
                  <TimeDistanceChips event={getPlayEvents} /> */}
                </Grid>
                  <PlayPageGallery event={getPlayEvents} />
                  <PlayPageList
                    event={getPlayEvents}
                    bookings={getPlayEvents.bookings}
                  />
                  <PlayPageMap
                    event={getPlayEvents}
                    showBookings={getPlayEvents.bookings} //showBookings
                  /> 
                   
                      <Grid container
                            className={classes.nextEventBox}
                            alignItems="center">
                        <Grid item xs={12}>
                          
                            {/* <JoinSend event={event} getPlayEventsMutation={getPlayEventsMutation} /> */}
                       

                    <PlayGoToApp />

                        </Grid>
                      </Grid>
                  </>
              }

          {getPlayEvents && getPlayEvents.success === false && <>
          <p>There are no data for this event....<img src={Lost} className={classes.lostPng} /></p>

          </>}
          {oneEventData && oneEventData.error && <>
          <p>There are no data for this event....<img src={Lost} className={classes.lostPng} /></p>

          </>}
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#242323",
    color: "lightGrey"
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
  },
  light: {
    backgroundColor: "lightgrey"
  },
  sendJoinContainer: {
    backgroundColor: "white",
    height: 0,
    overflow: 'hidden',
    transition: 'height 0.6s',
    transitionTimingFunction: 'ease-out'
  },
  openSend: {
    height: 220,
    padding: 5,
  },
  thisLine:{
    height: '1px',
    width: '100%',
    marginTop: '2px',
    backgroundColor: "#707070"
  },
  lostPng: {
    height: 100,
    width: 100
  }

}));
