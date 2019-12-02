import React, { useContext } from "react";
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
import EventButtons from "../Molecules/event-buttons";
import Spinner from "../Atoms/Spinner";

const ONE_EVENT = gql`
  query getOneEvent($id: ID!) {
    getOneEvent(id: $id) {
      _id
      success
      message
      name
      author {
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

const BOOKING = gql`
  mutation bookEvent($user_id: String!, $event_id: String!) {
    bookEvent(user_id: $user_id, event_id: $event_id) {
      success
    }
  }
`;

const BOOKING_REQ = gql`
  mutation requestBookEvent(
    $event_id: String!
    $guest_id: String!
    $guest_name: String!
    $message: String!
  ) {
    requestBookEvent(
      event_id: $event_id
      guest_id: $guest_id
      guest_name: $guest_name
      message: $message
    ) {
      success
      message
    }
  }
`;
const CANCELLING = gql`
  mutation cancelBooking($user_id: String!, $event_id: String!) {
    cancelBooking(user_id: $user_id, event_id: $event_id) {
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
//     _id: "2sdf2sdfs2sfdsdfs2",
//     success: true,
//     author: {
//       name: "Petr H.",
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
  const { user, setUser } = useContext(UserContext);
  const [createBooking, bookingStates] = useMutation(BOOKING);
  const [createReqBooking, bookingReqStates] = useMutation(BOOKING_REQ);
  const [cancelBooking, cancelledState] = useMutation(CANCELLING);
  const [deleteOneEvent, deleteState] = useMutation(DELETE);
  const { loading, error, data, refetch } = useQuery(ONE_EVENT, {
    variables: { id: props.match.params.id }
    //skip: !id,
    //pollInterval: 500
  });

  console.log("RENDERING EVENT");

  console.log(
    "bookingStates, cancelledState: ",
    bookingStates,
    cancelledState,
    deleteState
  );

  // if (cancelledState.data && cancelledState.data.cancelBooking.success) {
  //   console.log("RERF cancelledState");
  //   refetch();
  // }

  // if (bookingStates.data && bookingStates.data.bookEvent.success) {
  //   console.log("RERF bookingStates");
  //   refetch();
  // }

  if (deleteState.data && deleteState.data.deleteOneEvent.success == true) {
    console.log("Yes deleted, confirmed!!");
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
          <Spinner />
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

  if (dataDB && dataDB.getOneEvent.success) {
    return (
      <ModalLayout>
        <PaperEvent>
          <Grid container alignItems="flex-start" direction="row" spacing={2}>
            <Grid item xs>
              <Button
                variant="contained"
                //color={theme.background}
                className={classes.closeButton}
                onClick={() => {
                  props.history.goBack();
                }}
              >
                Close
              </Button>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item className={classes.nameGrid} md={12}>
              <Box textAlign="center" m={1}>
                <Typography component="div">
                  {dataDB.getOneEvent.name}
                </Typography>
              </Box>
              <Divider />
            </Grid>
          </Grid>
          <Grid item>
            <Box textAlign="justify" m={1}>
              {dataDB.getOneEvent.description}
            </Box>
          </Grid>
          <Grid item className={classes.galleryGrid}>
            <Typography component="div">Gallery</Typography>
            <Gallery
              images={dataDB.getOneEvent.imagesArr}
              rowHeight={100}
              display={true}
              backdropClosesModal={true}
            />
          </Grid>
          <Grid item>
            <Typography component="div">Date</Typography>
            <Box textAlign="left" m={1}>
              {dataDB.getOneEvent.dateStart &&
                displayDate(dataDB.getOneEvent.dateStart)}
            </Box>
          </Grid>
          <Grid item>
            <Typography component="div">Price:</Typography>
            <Box textAlign="left" m={1}>
              {dataDB.getOneEvent.price}
            </Box>
          </Grid>
          <Grid item>
            <Typography component="div">BYO:</Typography>
            <Box textAlign="left" m={1}>
              {dataDB.getOneEvent.BYO ? "YES" : "NO"}
            </Box>
          </Grid>
          <Grid item>
            <Typography component="div">Confirmed guests:</Typography>
            <Box textAlign="left" m={1}>
              <Grid container direction="row">
                {dataDB.showBookings.map(booking => {
                  if (booking.confirmed && !booking.cancelled) {
                    return (
                      <Grid item>
                        <Avatar alt="Remy Sharp" src={booking.user.picture} />
                      </Grid>
                    );
                  }
                  return null;
                })}
              </Grid>
              {bookingStates.loading && <Spinner />}
            </Box>
          </Grid>
          <Grid item>
            <Typography component="div">Pending Guests:</Typography>
            <Box textAlign="left" m={1}>
              <Grid container direction="row">
                {dataDB.showBookings.map(booking => {
                  if (!booking.confirmed && !booking.cancelled) {
                    return (
                      <Grid item>
                        <Avatar alt="Remy Sharp" src={booking.user.picture} />
                        <Typography component="div">
                          {booking.message}
                        </Typography>
                      </Grid>
                    );
                  }
                  return null;
                })}
              </Grid>
              {bookingStates.loading && <Spinner />}
            </Box>
          </Grid>
          <Grid item>
            <Typography component="div">Host:</Typography>
            <Box textAlign="left" m={1}>
              {dataDB.getOneEvent.author.name}
            </Box>
          </Grid>
          <Grid item>
            <Typography component="div">Address:</Typography>
            <Box textAlign="left" m={1}>
              {dataDB.getOneEvent.address}
            </Box>
          </Grid>

          <EventButtons
            data={dataDB}
            user={user}
            createBooking={createBooking}
            cancelBooking={cancelBooking}
            createReqBooking={createReqBooking}
            deleteOneEvent={deleteOneEvent}
            match={props.match.params.id}
            ONE_EVENT={ONE_EVENT}
          />
        </PaperEvent>
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
          <Typography component="div">{dataDB.getOneEvent.message}</Typography>
        </PaperEvent>
      </ModalLayout>
    );
  }
}

const useStyles = makeStyles(theme => ({
  opaque: {
    // flexGrow: 1,
    background: "rgba(100,10,10,0.2)",
    width: "100%",
    position: "absolute",
    "z-index": 10
  },
  container: {
    height: "100vh"
  },
  paper: {
    background: "black",
    color: "white",
    marginTop: theme.spacing(8),
    padding: theme.spacing(3, 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 500,
    minWidth: 300,
    maxHeight: "80vh",
    overflow: "scroll"
  },
  closeButton: {
    background: theme.palette.violetova,
    color: "white"
  },
  nameGrid: {
    borderBottom: "solid 1px white"
  },
  galleryGrid: {
    width: "100%",
    background: "rgba(255,255,255,0.2)",
    borderRadius: 4,
    padding: theme.spacing(3, 2)
  }
}));

export default withRouter(Event);
