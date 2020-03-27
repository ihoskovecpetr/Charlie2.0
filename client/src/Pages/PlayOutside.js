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


const ONE_EVENT = gql`
  query getOneEvent($id: ID!) {
    getOneEvent(id: $id) {
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
    }
    showBookings(id: $id) {
      confirmed
      cancelled
      message
      user {
        _id
        name
        email
        picture
      }
    }
  }
`;



function PlayOutside() {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  // const windowSize = useWindowSize();
  const { context, setContext } = useContext(UserContext);
  const [loadingPlay, setLoadingPlay] = useState(false);


  const oneEventData = useQuery(ONE_EVENT, {
    variables: { id: history.location.pathname.split("/")[2] },
    // skip: !context.firstPrint,
    //pollInterval: 500
  });

  console.log("Play Other:  wndw.firstPrint: ", window.firstPrintPlay);
  console.log("Data normatXX oneEventData> ", oneEventData.error);

if (oneEventData.data) {
    var getPlayEvents = oneEventData.data.getOneEvent;
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
                  <Grid item >
                      <Typography variant="h4" className={classes.mainHeader}>
                    {getPlayEvents.name}
                    <p className={classes.thisLine}></p>

                      </Typography>
                  </Grid>
                  <TimeDistanceChips event={getPlayEvents} />
                </Grid>
                  <PlayPageGallery event={getPlayEvents} />
                  <PlayPageList
                    event={getPlayEvents}
                    showBookings={getPlayEvents.bookings} //showBookings
                    // ONE_EVENT={PLAY_EVENTS}
                    // cancelBooking={cancelBooking}
                    // cancelledState={cancelledState}
                    // bookingStates={bookingStates}
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

export default PlayOutside;
