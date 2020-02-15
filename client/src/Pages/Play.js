import React, { useContext, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CloseIcon from '@material-ui/icons/Close';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import RedoIcon from '@material-ui/icons/Redo';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import PropTypes from "prop-types";

import { withRouter, useHistory, NavLink } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { UserContext } from "../userContext";

import CarouselWrap from "../Molecules/play/Carousel/CarouselWrap";
import PlayLayout from "../Layouts/PlayLayout";
import PlayPageGallery from "../Molecules/play/play_page_gallery";
import PlayPageList from "../Molecules/play/play_page_list";
import PlayPageMap from "../Molecules/play/play_page_map";

import EventButtons from "../Molecules/event/event-buttons";
import Spinner from "../Atoms/Spinner";


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
  const theme = useTheme();
  let history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [createBooking, bookingStates] = useMutation(BOOKING);
  const [cancelBooking, cancelledState] = useMutation(CANCELLING);
  const [deleteOneEvent, deleteState] = useMutation(DELETE);
  const { loading, error, data, refetch } = useQuery(ONE_EVENT, {
    variables: { id: props.match.params.id }
    //skip: !id,
    //pollInterval: 500
  });
  const [position, setPosition] = React.useState(1);
  const ratings = useQuery(EVENT_RATINGS, {
    variables: { event_id: props.match.params.id }
    //skip: !id,
    //pollInterval: 500
  });

  console.log("PLAY render");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <PlayLayout>
        <PaperEvent>
          <Spinner height={100} width={100} />
        </PaperEvent>
      </PlayLayout>
    );
  }

  if (dataDB && dataDB.getOneEvent.success) {
    return (
      <PlayLayout>
          <PaperEvent>
          <CarouselWrap setPosition={setPosition} >

            <PlayPageMap dataDB={dataDB} ratings={ratings}  />

            <PlayPageGallery dataDB={dataDB}  />

            <PlayPageList 
              dataDB={dataDB}  
              ONE_EVENT={ONE_EVENT}
              cancelBooking={cancelBooking}
              cancelledState={cancelledState}
              bookingStates={bookingStates}
                />

          </CarouselWrap>

          </PaperEvent>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          alignContent="center"
          className={classes.gridButtons}
        >
          <Grid item xs={4} onClick={() => {history.push('/')}}>
            <Grid container justify="center">
              <Grid item className={classes.actionClose}>
                <CloseIcon style={{height: "40px", width: "40px", margin: "5px"}} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container justify="center">
              <Grid item className={classes.actionJoin}>
                <CheckCircleOutlineIcon style={{height: "40px", width: "40px", margin: "18px"}} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container justify="center">
              <Grid item className={classes.actionNext}>
                <RedoIcon style={{height: "40px", width: "40px", margin: "5px"}} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PlayLayout>
    );
  }
  if (dataDB && dataDB.getOneEvent.success == false) {
    return (
      <PlayLayout>
        <PaperEvent>
        <Button
            variant="contained"
            color="primary"
            onClick={() => {
              props.history.push('/signin');
            }}
          >
            Login
            </Button>
          <Paper>
            <Typography component="div">
              {dataDB.getOneEvent.message}
            </Typography>
          </Paper>
        </PaperEvent>
      </PlayLayout>
    );
  }
  return <p>Reload please</p>;
}

const useStyles = makeStyles(theme => ({
  paper: {
    background: "#454242", // "#FCCD30",
    color: "black",
    marginTop: "10vh",
    //paddingBottom: "80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "80vh",
    overflow: "scroll",
    borderRadius: 20,
  },
  gridButtons: {
    //background: "#707070",
    color: "white",
    marginTop: "0 !important",
    //padding: theme.spacing(3, 2),
    display: "flex",
    position: "relative",
    top: "-80px",
    height: "80px",
    overflow: "scroll",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    //boxShadow: "0px -2px 5px 0px rgba(200,200,200,0.3)"
  },
  eventButtons: {
    position: "absolute",
    bottom: 0,
    overflow: "visible"
  },
  actionClose: {
    backgroundColor: "#600328",
    '&:hover': {
      backgroundColor: "#7C2849",
    },
    alignContent: "center",
    height: "50px",
    width: "50px",
    borderRadius: "25px",
    position: "relative",
    top: "10px",

  },
  actionJoin: {
    backgroundColor: "#F50057",
    alignContent: "center",
    height: "76px",
    width: "76px",
    borderRadius: "40px",
  },
  actionNext: {
    backgroundColor: "#B9B6B6",
    alignContent: "center",
    height: "50px",
    width: "50px",
    borderRadius: "25px",
    position: "relative",
    top: "10px",
  }
}));

export default withRouter(Play);
