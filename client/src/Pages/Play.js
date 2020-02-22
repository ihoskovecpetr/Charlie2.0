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
import { useWindowSize } from "../Hooks/useWindowSize";

import Copyright from "../Atoms/copyright";
import Spinner from "../Atoms/Spinner";

import EventCard from "../Molecules/event-card";
import RatingCard from "../Molecules/rating-card";
import SettingsPanel from "../Molecules/play/Carousel/SettingsPanel";


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
  const windowSize = useWindowSize();

  const { user, setUser } = useContext(UserContext);
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



  console.log(
    "getPlayEvents PROFILE: ",
    // hostingStates.data,
    // bookingStates.data,
    getPlayEvents,
    data
  );
console.log("Height: ", `${windowSize.height-40}px`)
  return (
    <div
      className={classes.profileWrap}
      style={{ position: user.freezScroll ? "fixed" : "absolute" }}
    >
    <Container
      maxWidth="sm"
      className={classes.playContainer}
    >
      <Paper className={classes.paper}>

          <SettingsPanel getPlayEventsMutation={getPlayEventsMutation} numItems={5} />
          <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
              className={classes.gridButtons}
              style={{top: `${windowSize.height-40}px`}}
            >
              <Grid item xs={8}>
                <Grid container justify="center">
                  <Grid item xs={12} className={classes.actionJoin}>
                  <Chip label={`JOIN ${0}`} variant="outlined" color="secondary" style={{width: "100%"}} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={4}
              >
                <Grid container justify="center">
                  <Grid item className={classes.actionNext}>
                    <Chip label={`PASS`} variant="outlined" color="primary" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

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
            {getPlayEvents && getPlayEvents.map((event) => <>
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
                  </>)}
                  


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
    backgroundColor: "black"

  },
  paper: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
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
  gridButtons: {
    color: "white",
    marginTop: "0 !important",
    display: "flex",
    position: "fixed",
    height: 40,
    zIndex: 100,
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  actionJoin: {
    alignContent: "center",
  },
  actionNext: {
    backgroundColor: "lightGrey",
    alignContent: "center",
    borderRadius: "25px",
    position: "relative",
    boxShadow: "5px 5px 10px 0px rgba(0,0,0,0.7)"
  }
}));

export default Profile;
