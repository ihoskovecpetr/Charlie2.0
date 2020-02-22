import React, { useContext, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import RedoIcon from "@material-ui/icons/Redo";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import PropTypes from "prop-types";
import gql from "graphql-tag";

import { withRouter, useHistory, NavLink } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { UserContext } from "../userContext";
import { useWindowSize } from "../Hooks/useWindowSize";

import CarouselWrap from "../Molecules/play/Carousel/CarouselWrap";
import PlayPageGallery from "../Molecules/play/play_page_gallery";
import PlayPageList from "../Molecules/play/play_page_list";
import PlayPageMap from "../Molecules/play/play_page_map";

import Spinner from "../Atoms/Spinner";

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

// showBookings(id: $id) {
//   confirmed
//   cancelled
//   message
//   user {
//     _id
//     name
//     email
//     picture
//   }
// }

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
//       },
//       {
//         caption: "No more pictures for this Event",
//         src:
//           "https://res.cloudinary.com/party-images-app/image/upload/v1580823218/ahenvnazw6wm44o5fqvr.jpg",
//         thumbnail:
//           "https://res.cloudinary.com/party-images-app/image/upload/v1580823218/ahenvnazw6wm44o5fqvr.jpg",
//         thumbnailHeight: 10,
//         thumbnailWidth: 10,
//         scaletwidth: 100,
//         marginLeft: 0,
//         vwidth: 100,
//         isSelected: false
//       },
//       {
//         caption: "No more pictures for this Event",
//         src:
//           "https://res.cloudinary.com/party-images-app/image/upload/v1580823217/kvcjvh7bokf2oameodtm.png",
//         thumbnail:
//           "https://res.cloudinary.com/party-images-app/image/upload/v1580823217/kvcjvh7bokf2oameodtm.png",
//         thumbnailHeight: 5,
//         thumbnailWidth: 10,
//         scaletwidth: 100,
//         marginLeft: 0,
//         vwidth: 100,
//         isSelected: false
//       },
//       {
//         caption: "No more pictures for this Event",
//         src:
//           "https://res.cloudinary.com/party-images-app/image/upload/v1580823218/b0lqrn5nrnaeafhfv0rk.png",
//         thumbnail:
//           "https://res.cloudinary.com/party-images-app/image/upload/v1580823218/b0lqrn5nrnaeafhfv0rk.png",
//         thumbnailHeight: 15,
//         thumbnailWidth: 7,
//         scaletwidth: 100,
//         marginLeft: 0,
//         vwidth: 100,
//         isSelected: false
//       }

//     ],
//     description: "Desc Mocks data. Desc Mocks data. Desc Mocks data asdf asd asd asdas das dasdsas d.asd .asd .asd ",
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

function Play(props) {
  const classes = useStyles();
  // const theme = useTheme();
  let history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const windowSize = useWindowSize();

  const [createBooking, bookingStates] = useMutation(BOOKING);
  const [cancelBooking, cancelledState] = useMutation(CANCELLING);
  const [deleteOneEvent, deleteState] = useMutation(DELETE);
  const [getPlayEventsMutation, { loading, error, data, refetch }] = useMutation(PLAY_EVENTS, {
    variables: { id: props.match.params.id }
    //skip: !id,
    //pollInterval: 500
  });
  const [playIndex, setPlayIndex] = React.useState(0);
  const ratings = useQuery(EVENT_RATINGS, {
    variables: { event_id: props.match.params.id }
    //skip: !id,
    //pollInterval: 500
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getPlayEventsMutation()
  }, []);

  if (deleteState.data && deleteState.data.deleteOneEvent.success == true) {
    history.push("/map");
  }

  const PaperEvent = props => {
    return (
      <div
        component="main"
        id="paperEvent"
        className={classes.PaperEvent}
        style={{ height: windowSize.height }}
      >
        <Container 
          maxWidth="xs"
          className={classes.PaperEventContainer}
        >
          {props.children}
        </Container>
      </div>
    );
  };

  let dataDB;

  if (dataMock) {
    dataDB = dataMock;
  } else if (data) {
    dataDB = data;
    var { getPlayEvents } = dataDB;
  }

  console.log("getPlayEvents: ", getPlayEvents);

  if (loading) {
    return (
      <PaperEvent>
        <Paper
          className={classes.paper}
          style={{
            height: windowSize.height
          }}
        >
          <Grid container justify="center">
            <Grid item>
              <Spinner height={100} width={100} />
            </Grid>
          </Grid>
        </Paper>
      </PaperEvent>
    );
  }



  if (data && getPlayEvents) {


    return (
      <>
        <PaperEvent>
          <Paper
            className={classes.paper}
            style={{
              //marginTop: 0.12 * windowSize.height,
              //height: windowSize.height
            }}
          >
            <CarouselWrap getPlayEventsMutation={getPlayEventsMutation} >
            {/* <Grid container justify="center" xs={12}>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      props.history.push("/signin");
                    }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    Reload
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item>
                  <Typography component="div">
                    No More upcomming events
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid> */}

           {getPlayEvents.map(event => {
             console.log("ITERACE??")
             return (<div>
                <PlayPageGallery event={event} />
                <PlayPageList
                  event={event}
                  showBookings={null} //showBookings
                  ONE_EVENT={PLAY_EVENTS}
                  cancelBooking={cancelBooking}
                  cancelledState={cancelledState}
                  bookingStates={bookingStates}
                />
                              <PlayPageMap
                  event={event}
                  showBookings={null} //showBookings
                  ratings={ratings}
                />
              </div>)
           } )}

            </CarouselWrap>
          </Paper>
          <Container maxWidth="xs">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
              className={classes.gridButtons}
            >
              <Grid
                item
                xs={4}

              >
                <Grid container justify="center">
                  <Grid item className={classes.actionClose}>
                    <CloseIcon
                      style={{ height: "40px", width: "40px", margin: "5px" }}
                      onClick={() => {
                        history.push("/");
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container justify="center">
                  <Grid item className={classes.actionJoin}>
                    <CheckCircleOutlineIcon
                      style={{ height: "40px", width: "40px", margin: "18px" }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={4}
              >
                <Grid container justify="center">
                  <Grid item className={classes.actionNext}>
                    <RedoIcon
                      style={{ height: "30px", width: "30px", margin: "10px" }}
                      onClick={() => {
                        setPlayIndex(prev => prev + 1);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </PaperEvent>
      </>
    );
  }
  if (dataDB && !getPlayEvents[playIndex]) {
    return (
      <PaperEvent>
        <Paper
          className={classes.paper}
          style={{
            //marginTop: 0.12 * windowSize.height,
            height: windowSize.height
          }}
        >
          <Grid container justify="center" xs={12}>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      props.history.push("/signin");
                    }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    Reload
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item>
                  <Typography component="div">
                    No More upcomming events
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Container maxWidth="xs">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            alignContent="center"
            className={classes.gridButtons}
          >
            <Grid
              item
              xs={4}
              onClick={() => {
                history.push("/");
              }}
            >
              <Grid container justify="center">
                <Grid item className={classes.actionClose}>
                  <CloseIcon
                    style={{ height: "40px", width: "40px", margin: "5px" }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </PaperEvent>
    );
  }
  return <p>Reload please</p>;
}

const useStyles = makeStyles(theme => ({
  PaperEvent: {
    backgroundColor: "black",
    width: "100%",
    //position: "fixed",
    top: 0
  },
  PaperEventContainer: {
    padding: 0
  },
  paper: {
    background: "#454242", // "#FCCD30",
    color: "black",
    display: "fixed",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    //borderRadius: 20
  },
  gridButtons: {
    color: "white",
    marginTop: "0 !important",
    display: "flex",
    position: "relative",
    top: "-40px",
    height: "0px",
    // borderBottomRightRadius: 20,
    // borderBottomLeftRadius: 20
    //boxShadow: "0px -2px 5px 0px rgba(200,200,200,0.3)"
  },
  eventButtons: {
    position: "absolute",
    bottom: 0,
    overflow: "visible"
  },
  actionClose: {
    backgroundColor: "#600328",
    // "&:hover": {
    //   backgroundColor: "#7C2849"
    // },
    alignContent: "center",
    height: "50px",
    width: "50px",
    borderRadius: "25px",
    position: "relative",
    top: "10px",
    boxShadow: "5px 5px 10px 0px rgba(0,0,0,0.7)"
  },
  actionJoin: {
    backgroundColor: "#F50057",
    alignContent: "center",
    height: "76px",
    width: "76px",
    borderRadius: "40px",
    boxShadow: "5px 5px 10px 0px rgba(0,0,0,0.7)"
  },
  actionNext: {
    backgroundColor: "#696565",
    // "&:hover": {
    //   backgroundColor: "#242323"
    // },
    alignContent: "center",
    height: "50px",
    width: "50px",
    borderRadius: "25px",
    position: "relative",
    top: "10px",
    boxShadow: "5px 5px 10px 0px rgba(0,0,0,0.7)"
  }
}));

export default withRouter(Play);
