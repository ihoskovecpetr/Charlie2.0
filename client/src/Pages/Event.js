import React, { useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

import { withRouter, NavLink } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import Gallery from "react-grid-gallery";
import gql from "graphql-tag";
import { UserContext } from "../userContext";

import EventButtons from "../Molecules/event-buttons";
import Spinner from "../Atoms/Spinner";

const ONE_EVENT = gql`
  query getOneEvent($id: ID!) {
    getOneEvent(id: $id) {
      _id
      success
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
      _id
      success
      confirmed
      cancelled
    }
  }
`;
const CANCELLING = gql`
  mutation cancelBooking($user_id: String!, $event_id: String!) {
    cancelBooking(user_id: $user_id, event_id: $event_id)
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
  root: {
    padding: theme.spacing(3, 2)
  }
}));

function Event(props) {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const [createBooking, bookingStates] = useMutation(BOOKING);
  const [cancelBooking, cancelledState] = useMutation(CANCELLING);
  const { loading, error, data, refetch } = useQuery(ONE_EVENT, {
    variables: { id: props.match.params.id }
    //skip: !id,
    //pollInterval: 500
  });

  let dataDB;

  const BaseAndPaper = props => {
    console.log("BaseAndPaper: props, childern ", props);
    return (
      <div className={classes.opaque}>
        <Container maxWidth="lg" fixed={true}>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.container}
          >
            <Paper className={classes.root}>{props.children}</Paper>
          </Grid>
        </Container>
      </div>
    );
  };

  console.log("bookingStates: ", bookingStates);
  // if (bookingStates.loading) {
  //   return <>Creating Booking</>;
  // }

  if (bookingStates.data) {
    refetch();
  }

  if (data) {
    console.log("DATA EVENT jsou tady: ", data);
  }

  if (dataMock) {
    dataDB = dataMock;
  } else if (data) {
    dataDB = data;
  }

  if (loading) {
    return (
      <BaseAndPaper>
        <Spinner />
      </BaseAndPaper>
    );
  }
  if (error) {
    return (
      <BaseAndPaper>
        <p>Error...</p>
      </BaseAndPaper>
    );
  }

  if (dataDB && dataDB.getOneEvent.success) {
    return (
      <BaseAndPaper>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              props.history.goBack();
            }}
          >
            Back
          </Button>
          <NavLink to={{ pathname: `/`, state: { justGoBack: true } }}>
            <Button variant="contained" color="secondary">
              Close
            </Button>
          </NavLink>
        </Grid>
        <Grid item>
          <Box textAlign="center" m={1}>
            <Typography component="div">{dataDB.getOneEvent.name}</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box textAlign="justify" m={1}>
            {dataDB.getOneEvent.description}
          </Box>
        </Grid>
        <Grid item>
          <Gallery
            images={dataDB.getOneEvent.imagesArr}
            rowHeight={100}
            display={true}
            backdropClosesModal={true}
          />
        </Grid>
        <Grid item>
          <Box textAlign="left" m={1}>
            Date:
            {dataDB.getOneEvent.dateStart}
          </Box>
        </Grid>
        <Grid item>
          <Box textAlign="left" m={1}>
            Price:
            {dataDB.getOneEvent.price}
          </Box>
        </Grid>
        <Grid item>
          <Box textAlign="left" m={1}>
            BYO:
            {dataDB.getOneEvent.BYO ? "YES" : "NO"}
          </Box>
        </Grid>
        <Grid item>
          <Box textAlign="left" m={1}>
            Guests:
            {dataDB.showBookings.map(booking => {
              return <Avatar alt="Remy Sharp" src={booking.user.picture} />;
            })}
            {bookingStates.loading && <Spinner />}
          </Box>
        </Grid>
        <Grid item>
          <Box textAlign="left" m={1}>
            Host:
            {dataDB.getOneEvent.author.name}
          </Box>
        </Grid>
        <Grid item>
          <Box textAlign="left" m={1}>
            Address
            {dataDB.getOneEvent.address}
          </Box>
        </Grid>

        <EventButtons
          data={dataDB}
          user={user}
          createBooking={createBooking}
          cancelBooking={cancelBooking}
        />
      </BaseAndPaper>
    );
  }
  if (dataDB && dataDB.getOneEvent.success == false) {
    return (
      <BaseAndPaper>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            props.history.goBack();
          }}
        >
          Back
        </Button>
        <>Login first</>
      </BaseAndPaper>
    );
  }
}

export default withRouter(Event);
