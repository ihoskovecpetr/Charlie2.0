import React, { useContext, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";

import { withRouter, useHistory, NavLink } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Gallery from "react-grid-gallery";
import gql from "graphql-tag";
import { displayDate } from "../Services/transform-services";

import { UserContext } from "../userContext";

import ModalLayout from "../Layouts/ModalLayout";
import EventButtons from "../Molecules/event/event-buttons";
import RatingCard from "../Molecules/rating-card";
import Spinner from "../Atoms/Spinner";
import PendingGuest from "../Molecules/event/pending-guest";
import ConfirmedGuest from "../Molecules/event/confirmed-guest";
import UserCard from "../Molecules/event/user-card";

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
// dataMock = {
//   getOneEvent: {
//     _id: "12321",
//     success: true,
//     author: {
//       _id: "12321",
//       name: "Petr H. McOcker",
//       picture:
//         "https://scontent-prg1-1.xx.fbcdn.net/v/t1.0-9/61950201_2397914480420841_8357957627317059584_n.jpg?_nc_cat=108&_nc_oc=AQnV7_8s9Q3H0-hAymHvaGXLt-97aDdy46ODFVxEtKOsUJ_LaKdLA7KV-8HQqKodG40&_nc_ht=scontent-prg1-1.xx&oh=43eb25b5ccd547e3e0ebc377dd31adb0&oe=5E87BF91"
//     },
//     name: "Mock data Party",
//     geometry: { coordinates: [50.040112099, 14.428] },
//     lng: 14.45,
//     lat: 50,
//     addressGoogle: "addressGoogle",
//     addressCustom: "addressCustom",
//     address: "address",
//     eventType: 1,
//     dateStart: "2019-10-10",
//     price: 12,
//     capacityMax: 20,
//     BYO: true,
//     imagesArr: [
//       {
//         caption: "No more pictures for this Event",
//         src:
//           "https://s1.at.atcdn.net/wp-content/uploads/2019/03/icebergs-800x584.jpg",
//         thumbnail:
//           "https://s1.at.atcdn.net/wp-content/uploads/2019/03/icebergs-800x584.jpg",
//         thumbnailHeight: 10,
//         thumbnailWidth: 10,
//         scaletwidth: 100,
//         marginLeft: 0,
//         vwidth: 100,
//         isSelected: false
//       }
//     ],
//     description: "Desc Mocks data",
//     confirmed: true,
//     hide: false
//   },
//   showBookings: [
//     {
//       confrimed: true,
//       user: {
//         name: "Mock Guy",
//         email: "mock@email.com",
//         picture:
//           "https://www.ixxiyourworld.com/media/2389064/ixxi-paul-fuentes-pink-rocket.jpg?mode=crop&width=562&height=832",
//         _id: "232hj23h24h234"
//       }
//     }
//   ]
// };

function Event(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
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
  }, []);

  useEffect(() => {
    if (document.getElementById("paper_scrollable")) {
      document
        .getElementById("paper_scrollable")
        .addEventListener("scroll", () => {
          console.log("Parent scroll");
        });
      document
        .getElementById("paper_scrollable")
        .addEventListener("click", () => {
          console.log("Parent click");
        });
    }
  });

  if (deleteState.data && deleteState.data.deleteOneEvent.success == true) {
    history.push("/map");
  }

  let dataDB;

  const PaperEvent = props => {
    return <Paper className={classes.paper}>{props.children}</Paper>;
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

  if (loading) {
    return (
      <ModalLayout>
        <PaperEvent>
          <Spinner height={100} width={100} />
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

  console.log("DATA EVENT jsou tady: ", dataDB);
  console.log("RATING data: ", ratings.data);

  if (dataDB && dataDB.getOneEvent.success) {
    return (
      <ModalLayout>
        <div id="paper_scrollable">
          <PaperEvent>
            <Grid item className={classes.nameGrid} md={12}>
              <Box textAlign="center" m={1}>
                <Typography component="h5" variant="h5">
                  {dataDB.getOneEvent.name}
                </Typography>
              </Box>
              <Divider />
            </Grid>

            <Grid
              container
              justify="flex-start"
              alignItems="flex-start"
              alignContent="flex-start"
              direction="column"
              spacing={2}
            >
              <Grid item className={classes.galleryGrid}>
                <Gallery
                  images={dataDB.getOneEvent.imagesArr}
                  rowHeight={100}
                  display={true}
                  backdropClosesModal={true}
                />
              </Grid>
              <Grid item>
                <Typography component="div" className={classes.standardHeading}>
                  DESCRIPTION
                </Typography>
                <Box textAlign="justify" m={1}>
                  <Typography component="p" className={classes.standardContent}>
                    {dataDB.getOneEvent.description}
                  </Typography>
                </Box>
              </Grid>

              <Grid item>
                <Typography component="div" className={classes.standardHeading}>
                  DATE
                </Typography>
                <Box textAlign="left" m={1}>
                  <Typography component="p" className={classes.standardContent}>
                    {dataDB.getOneEvent.dateStart &&
                      displayDate(dataDB.getOneEvent.dateStart)}
                  </Typography>
                </Box>
              </Grid>
              <Typography component="div" className={classes.standardHeading}>
                PRICE
              </Typography>
              <Grid item>
                <Box textAlign="left" m={1}>
                  <Typography component="p" className={classes.standardContent}>
                    {dataDB.getOneEvent.price}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Typography component="div" className={classes.standardHeading}>
                  BYO
                </Typography>
                <Box textAlign="left" m={1}>
                  <Typography component="p" className={classes.standardContent}>
                    {dataDB.getOneEvent.BYO ? "YES" : "NO"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Typography component="div" className={classes.standardHeading}>
                  ATTENDEES
                </Typography>
                <Box textAlign="left" m={1}>
                  <ConfirmedGuest
                    bookings={dataDB.showBookings}
                    cancelBooking={cancelBooking}
                    cancelledState={cancelledState}
                    event={dataDB.getOneEvent}
                    ONE_EVENT={ONE_EVENT}
                  />

                  {bookingStates.loading && (
                    <Spinner height={100} width={100} />
                  )}
                </Box>
              </Grid>
              <Grid item>
                {dataDB.getOneEvent.areYouAuthor && (
                  <>
                    <Typography
                      component="div"
                      className={classes.standardHeading}
                    >
                      PENDING
                    </Typography>
                    <Grid container>
                      <Box textAlign="left" m={1}>
                        <Grid container direction="row">
                          {dataDB.showBookings.map(booking => {
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
                          <Spinner height={100} width={100} />
                        )}
                      </Box>
                    </Grid>
                  </>
                )}
              </Grid>
              <Typography component="div" className={classes.standardHeading}>
                AUTHOR
              </Typography>
              <Grid
                container
                justify="center"
                className={classes.authorContainer}
              >
                <Grid item>
                  <UserCard author={dataDB.getOneEvent.author} />
                </Grid>
              </Grid>
              <Typography component="div" className={classes.standardHeading}>
                ADDRESS
              </Typography>
              <Grid item>
                <Box textAlign="left" m={1}>
                  <Typography component="p" className={classes.standardContent}>
                    {dataDB.getOneEvent.address}
                  </Typography>
                </Box>
              </Grid>
              <Typography component="div" className={classes.standardHeading}>
                RATING
              </Typography>

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
            data={dataDB}
            user={context}
            createBooking={createBooking}
            cancelBooking={cancelBooking}
            deleteOneEvent={deleteOneEvent}
            match={props.match.params.id}
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
        <Spinner height={100} width={100} />
      </PaperEvent>
    </ModalLayout>
  );;
}

const useStyles = makeStyles(theme => ({
  paper: {
    background: "black",
    color: "white",
    marginTop: "10vh",
    padding: theme.spacing(3, 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //width: 300,
    maxHeight: "70vh",
    minHeight: "50vh",
    overflow: "scroll",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  gridClose: {
    position: "absolute",
    top: "10vh",
    height: 0,
    color: "white",
    margin: "0 !important",
    padding: 0,
    width: "100%"
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
    borderBottom: "solid 1px white",
    marginBottom: 15
  },
  galleryGrid: {
    width: "100%",
    background: "rgba(255,255,255,0.2)",
    borderRadius: 4,
    padding: theme.spacing(3, 2)
  },
  standardHeading: {
    //borderBottom: "solid 1px grey",
    fontWeight: 500,
    color: "lightgrey"
  },
  standardContent: {
    fontWeight: 400,
    color: "white"
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
