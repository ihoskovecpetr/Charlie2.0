import React, { useState, useContext, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

import { withRouter, useHistory, NavLink } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Gallery from "react-grid-gallery";
import { displayDate } from "../Services/transform-services";

import { UserContext } from "../userContext";

import PlayPageList from "../Molecules/play/PlayPageList";
import PlayPageGallery from "../Molecules/play/PlayPageGallery";
import PlayPageMap from "../Molecules/play/PlayPageMap";

import {GET_ONE_EVENT} from "src/Services/GQL/GET_ONE_EVENT";
import { EVENT_RATINGS } from "src/Services/GQL/EVENT_RATINGS";
import ModalLayout from "../Layouts/ModalLayout";
import EventButtons from "../Molecules/event/EventButtons";
import RatingCard from "../Molecules/rating-card";
import Spinner from "../Atoms/Spinner";


let dataMock;

function Event(props) {
  const classes = useStyles();
  const [windowHeight, setWindowHeight] = useState(0);
  const { loading, error, data, refetch } = useQuery(GET_ONE_EVENT, {
    variables: { event_id: props.match.params.id }
  });
  const ratings = useQuery(EVENT_RATINGS, {
    variables: { event_id: props.match.params.id }
  });

  console.log("Event modal print")
  useEffect(() => {
    window.scrollTo(0, 0);
    setWindowHeight(window.innerHeight)
  }, []);

  useEffect(() => {
    if (document.getElementById("paper_scrollable")) {
      document
        .getElementById("paper_scrollable")
        .addEventListener("scroll", () => {
          console.log("Parent scroll");
        });
    }
  });

  let dataDB;

  const PaperEvent = props => {
    return <Paper 
                  className={classes.paper}
                  style={{marginTop: window.eventId ? "8vh" : "10vh", height: 0.85 * windowHeight}}
                  >
              {props.children}
          </Paper>;
  };


  if (dataMock) {
    dataDB = dataMock;
  } else if (data) {
    dataDB = data;
  }


  if (dataDB && dataDB.getOneEvent.success) {
    return (
      <ModalLayout>
        <div id="paper_scrollable">
          <PaperEvent>


            <Grid
              container
              justify="center"
            >
              <Grid item className={classes.nameGrid}>
                {/* <Typography component="h4" variant="h4" className={classes.name}>
                  {dataDB.getOneEvent.name}
                  <p className={classes.thisLineHeader}></p>
                </Typography> */}
                {dataDB.getOneEvent.hide && <Typography component="h3" variant="h3" className={classes.name}>
                  CANCELLED
                </Typography>}
              </Grid>
              <PlayPageGallery event={dataDB.getOneEvent} />
              <PlayPageList
                    event={dataDB.getOneEvent}
                    bookings={dataDB.getOneEvent.bookings}
                    GQL_refetch={GET_ONE_EVENT}
                    refetchVariables={{ id: props.match.params.id }}
                  />
              <PlayPageMap
                    event={dataDB.getOneEvent}
                    showBookings={dataDB.getOneEvent.bookings} //showBookings
                  /> 

              <Grid
                container
                justify="center"
                alignItems="center"
                alignContent="center"
                direction="column"
                className={classes.ratingContainer}
              >
                {ratings.data &&
                  ratings.data.showRatings.map((rating, index) => (
                    <Grid item>
                      <RatingCard rating={rating} key={index} />
                    </Grid>
                  ))}
              </Grid>
              <EventButtons
                event={dataDB && dataDB.getOneEvent}
              />
            </Grid>
          </PaperEvent>
        </div>
        {/* <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          alignContent="center"
          className={classes.gridButtons}
        >
          <EventButtons
            event={dataDB && dataDB.getOneEvent}
            bookings={dataDB && dataDB.getOneEvent.bookings}
            createBooking={createBooking}
            cancelBooking={cancelBooking}
            deleteOneEvent={deleteOneEvent}
            eventId={props.match.params.id}
            ONE_EVENT={GET_ONE_EVENT}
            EVENT_RATINGS={EVENT_RATINGS}
            className={classes.eventButtons}
          />

        </Grid> */}
      </ModalLayout>
    );
  }
  if (dataDB && dataDB.getOneEvent.success == false) {
    return (
      <ModalLayout>
        <PaperEvent>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              props.history.goBack();
            }}
          >
            Back
          </Button>
          <Paper>
            <Typography component="div">
              {dataDB.getOneEvent.message}
            </Typography>
          </Paper>
        </PaperEvent>
      </ModalLayout>
    );
  }
  return(
    <ModalLayout>
      <PaperEvent>
          <Grid container justify="center" alignItems="center" style={{width: "100%", height: 300}}>
            <Grid item>
              <Spinner height={100} width={100} />
            </Grid>
          </Grid>
      </PaperEvent>
    </ModalLayout>
  );;
}

const useStyles = makeStyles(theme => ({
  paper: {
    background: "#242323",
    color: "white",
    overflow: "scroll",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  gridButtons: {
    background: "black",
    color: "white",
    marginTop: "0 !important",
    //padding: theme.spacing(3, 2),
    display: "flex",
    //width: 300,
    overflow: "scroll",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    boxShadow: "0px -2px 5px 0px rgba(200,200,200,0.3)"
  },
  closeButton: {
    background: theme.palette.violetova,
    color: "white"
  },
  nameGrid: {
    margin: 15
  },
  name: {
    textAlign: "center"
  },
  thisLineHeader:{
    height: '1px',
    width: '100%',
    marginTop: '2px',
    backgroundColor: "#707070"
  },
  galleryGrid: {
    width: "100%",
    background: "rgba(255,255,255,0.2)",
    borderRadius: 4,
    padding: theme.spacing(3, 2)
  },
  listRow:{
    width: '100%',
    marginTop: 2,
    marginBottom: 2,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  standardHeading: {
    width: '100%',
    fontWeight: 500,
    textAlign: 'left',
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 10,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  standardContent: {
    fontWeight: 400,
    textAlign: 'right',
    color: '#29FFF7',
    padding: 10
  },
  authorContainer: {
    width: "100%"
  },
  ratingContainer: {
    width: "100%",
    overflow: "scroll"
  },
}));

export default withRouter(Event);
