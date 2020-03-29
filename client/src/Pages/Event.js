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
import gql from "graphql-tag";
import { displayDate } from "../Services/transform-services";

import { UserContext } from "../userContext";

import PlayPageList from "../Molecules/play/PlayPageList";
import PlayPageGallery from "../Molecules/play/PlayPageGallery";
import PlayPageMap from "../Molecules/play/PlayPageMap";

import ModalLayout from "../Layouts/ModalLayout";
import EventButtons from "../Molecules/event/EventButtons";
import RatingCard from "../Molecules/rating-card";
import Spinner from "../Atoms/Spinner";
import PendingGuest from "../Molecules/event/PendingGuest";

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
      hide
      areYouAuthor
      bookings{
        _id
        confirmed
        cancelled
        user{
          _id
          name
          picture
        }
      }
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
const DELETE = gql`
  mutation deleteOneEvent($delete_id: ID!) {
    deleteOneEvent(delete_id: $delete_id) {
      success
    }
  }
`;
let dataMock;

function Event(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();

  const [windowHeight, setWindowHeight] = useState(0);
  const { context } = useContext(UserContext);

  const [createBooking, bookingStates] = useMutation(BOOKING);
  //const [createReqBooking, bookingReqStates] = useMutation(BOOKING_REQ);
  const [cancelBooking, cancelledState] = useMutation(CANCELLING);
  const [deleteOneEvent, deleteState] = useMutation(DELETE);
  const { loading, error, data, refetch } = useQuery(ONE_EVENT, {
    variables: { id: props.match.params.id }
    //skip: !id,
    //pollInterval: 500
  });
  const ratings = useQuery(EVENT_RATINGS, {
    variables: { event_id: props.match.params.id }
    //skip: !id,
    //pollInterval: 500
  });

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
      // document
      //   .getElementById("paper_scrollable")
      //   .addEventListener("click", () => {
      //     console.log("Parent click");
      //   });
    }
  });

  if (deleteState.data && deleteState.data.deleteOneEvent.success == true) {
    history.push("/map");
  }

  let dataDB;

  const PaperEvent = props => {
    return <Paper 
                  className={classes.paper}
                  style={{marginTop: window.eventId ? "8vh" : "10vh", height: 0.7 * windowHeight}}
                  >
              {props.children}
          </Paper>;
  };

  // if (bookingStates.loading) {
  //   return <>Creating Booking</>;
  // }

  // if (bookingStates.data) {
  //   refetch();
  // }

  if (dataMock) {
    dataDB = dataMock;
  } else if (data) {
    dataDB = data;
  }

  if (bookingStates.loading) {
    return (
      <ModalLayout>
        <PaperEvent>
        <Grid container justify="center" alignItems="center" style={{width: "100%", height: 300}}>
            <Grid item>
              <Spinner height={100} width={100} />
            </Grid>
          </Grid>
        </PaperEvent>
      </ModalLayout>
    );
  }
  // if (error) {
  //   return (
  //     <BaseAndPaper>
  //       <p>Error...</p>
  //     </BaseAndPaper>
  //   );
  // }

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
                <Typography component="h4" variant="h4" className={classes.name}>
                  {dataDB.getOneEvent.name}
                  <p className={classes.thisLineHeader}></p>
                </Typography>
                {dataDB.getOneEvent.hide && <Typography component="h3" variant="h3" className={classes.name}>
                  CANCELLED
                </Typography>}
              </Grid>
              {/* <Grid item className={classes.galleryGrid}>
                <Gallery
                  images={dataDB.getOneEvent.imagesArr}
                  rowHeight={100}
                  display={true}
                  backdropClosesModal={true}
                />
              </Grid> */}
              <PlayPageGallery event={dataDB.getOneEvent} />

              
              <PlayPageList
                    event={dataDB.getOneEvent}
                    bookings={dataDB.getOneEvent.bookings}
                    GQL_refetch={ONE_EVENT}
                    refetchVariables={{ id: props.match.params.id }}
                  />

              <Grid container className={classes.containerPending}>
                {dataDB.getOneEvent.areYouAuthor && (
                  <>
                    <Grid item xs={12} className={classes.listRow}>
                      <Grid container item xs={12}>
                        <Grid item xs={4}>
                          <Typography component="div" className={classes.standardHeading}>
                            PENDING
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography component="div" className={classes.standardContent}>
                                <Grid container>
                                  <Box textAlign="left" m={1}>
                                    <Grid container direction="row">
                                      {dataDB.getOneEvent.bookings.map(booking => {
                                        if (!booking.confirmed && !booking.cancelled) {
                                          return (
                                            <Grid item>
                                              <PendingGuest
                                                booking={booking}
                                                event={dataDB.getOneEvent}
                                                ONE_EVENT={ONE_EVENT}
                                              />
                                            </Grid>
                                          );
                                        }
                                        return null;
                                      })}
                                    </Grid>
                                    {bookingStates.loading && (
                                    <Grid container justify="center" alignItems="center" style={{width: "100%", height: 300}}>
                                      <Grid item>
                                        <Spinner height={100} width={100} />
                                      </Grid>
                                    </Grid>
                                    )}
                                  </Box>
                                </Grid>
                            </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Grid>

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
            </Grid>
          </PaperEvent>
        </div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          alignContent="center"
          className={classes.gridButtons}
        >
          <EventButtons
            event={dataDB && dataDB.getOneEvent}
            bookings={dataDB && dataDB.showBookings}
            user={context}
            createBooking={createBooking}
            cancelBooking={cancelBooking}
            deleteOneEvent={deleteOneEvent}
            eventId={props.match.params.id}
            ONE_EVENT={ONE_EVENT}
            EVENT_RATINGS={EVENT_RATINGS}
            className={classes.eventButtons}
          />

        </Grid>
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
  containerPending:{
    paddingLeft: 20,
    paddingRight: 20
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
  eventButtons: {
    position: "absolute",
    bottom: 0
  }
}));

export default withRouter(Event);
