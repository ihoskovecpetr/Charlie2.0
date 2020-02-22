import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Paper from "@material-ui/core/Paper";
import Chip from '@material-ui/core/Chip';
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import RedoIcon from "@material-ui/icons/Redo";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import clsx from "clsx";

import SwipeableViews from "react-swipeable-views";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory, NavLink } from "react-router-dom";

import { UserContext } from "../userContext";
// import { useWindowSize } from "../Hooks/useWindowSize";

import Copyright from "../Atoms/copyright";
import Spinner from "../Atoms/Spinner";

import EventCard from "../Molecules/event-card";
import RatingCard from "../Molecules/rating-card";
import SettingsPanel from "../Molecules/play/Carousel/SettingsPanel";
import JoinPanel from "../Molecules/play/Carousel/JoinPanel";


import PlayPageGallery from "../Molecules/play/play_page_gallery";
import PlayPageList from "../Molecules/play/play_page_list";
import PlayPageMap from "../Molecules/play/play_page_map";

const PLAY_EVENTS = gql`
  mutation getPlayEvents($event_id: ID) {
    getPlayEvents(event_id: $event_id) {
      _id
      success
      message
      name
      author {
        _id
        name
        picture
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
    }
  }
`;

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



function Profile() {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  // const windowSize = useWindowSize();
  const { user, setUser } = useContext(UserContext);
  const [discovered, setDiscovered] = React.useState(0);
  const [getPlayEventsMutation, { loading, error, data, refetch }] = useMutation(PLAY_EVENTS, {
    variables: { id: "props.match.params.id" }
    //skip: !id,
    //pollInterval: 500
  });
  const ratings = useQuery(EVENT_RATINGS, {
    variables: { event_id: "props.match.params.id" }
    //skip: !id,
    //pollInterval: 500
  });


  useEffect(() => {
    // document.documentElement.style.overflow = "auto"
    console.log("METATE PROIFILE")
    getPlayEventsMutation()
    // window.addEventListener('load', () => {
    //   window.scrollTo(0, 100);
    // });
    return () => {
    } 
  }, []);

  useEffect(() => {

    window.scrollBy({
      top: 50,
      left: 0,
      behavior: 'smooth'
    });

  }, [data]);


let dataDB;

if (data) {
    dataDB = data;
    var { getPlayEvents } = dataDB;
  }

  function discoverPlay(){
    setDiscovered(discovered + 1)
  }



  console.log(
    "getPlayEvents PROFILE: ",
    // hostingStates.data,
    // bookingStates.data,
    getPlayEvents,
    data
  );
  return (
    <div
      className={classes.profileWrap}
      style={{ position: user.freezScroll ? "fixed" : "absolute" }}
    >
    <Container
      maxWidth="xs"
      className={classes.playContainer}
    >
      <Paper className={classes.paper}>

          <SettingsPanel getPlayEventsMutation={getPlayEventsMutation} numItems={5} />
          {/* <JoinPanel /> */}

            {loading && (
              <Grid container justify="center">
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
            {getPlayEvents && getPlayEvents.map((event, index) => 
            <div style={{display: index <= discovered ? "block" : "none"}}>
                  <PlayPageGallery event={event} />
                  <PlayPageList
                    event={event}
                    showBookings={null} //showBookings
                    ONE_EVENT={PLAY_EVENTS}
                    // cancelBooking={cancelBooking}
                    // cancelledState={cancelledState}
                    // bookingStates={bookingStates}
                  />
                                <PlayPageMap
                    event={event}
                    showBookings={null} //showBookings
                    ratings={ratings}
                  /> 
                   
                      <Grid container
                            className={classes.nextEventBox}
                            alignItem="center">
                        <Grid item xs={8}>
                          
                          <Chip label={`JOIN`} 
                                variant="outlined" 
                                color="secondary" 
                                style={{width: "100%"}} 
                                onClick={discoverPlay}
                                />
                        </Grid>
                        <Grid item xs={4}>
                          
                          <Chip label={`NEXT`} 
                                variant="outlined" 
                                color="primary" 
                                style={{width: "100%"}} 
                                onClick={discoverPlay} />
                        </Grid>
                        <Grid container 
                              justify="center" 
                              style={{display: index === discovered ? "flex" : "none", margin: "30px"}}>
                            <Grid item>
                              <Spinner height={100} width={100} />
                            </Grid>
                        </Grid>
                      </Grid>
                  </div>)}
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
  profileWrap: {
    width: '100%',
    top: 0,
    backgroundColor: "black",
    minHeight: "100%",
  },
  paper: {
    width: "100%",
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "rgba(255,255,255,0.5)"
  },
  avatar: {
    height: 80,
    width: 80,
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  appBar: {
    zIndex: 1
  },
  buttonNavi: {
    marginBottom: 10
  },
  nextEventBox: {
    width: "100%",
    backgroundColor: "white",
    paddingBottom: 50,
    paddingTop: 50,
  }
}));

export default Profile;
