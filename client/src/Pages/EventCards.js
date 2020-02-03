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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Badge from "@material-ui/core/Badge";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";

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
  const { user, setUser } = useContext(UserContext);
  const [createBooking, bookingStates] = useMutation(BOOKING);
  //const [createReqBooking, bookingReqStates] = useMutation(BOOKING_REQ);
  const [cancelBooking, cancelledState] = useMutation(CANCELLING);
  const [deleteOneEvent, deleteState] = useMutation(DELETE);
  const { loading, error, data, refetch } = useQuery(ONE_EVENT, {
    variables: { id: props.match.params.id }
    //skip: !id,
    //pollInterval: 500
  });
  const [value, setValue] = React.useState(0);
  const ratings = useQuery(EVENT_RATINGS, {
    variables: { event_id: props.match.params.id }
    //skip: !id,
    //pollInterval: 500
  });

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
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

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`
    };
  }

  if (dataDB && dataDB.getOneEvent.success) {
    return (
      <ModalLayout>
        <div id="paper_scrollable">
          <PaperEvent>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Galery" {...a11yProps(0)} />
              <Tab label="Info" {...a11yProps(1)} />
            </Tabs>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
              style={{ width: "100%" }}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
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
                  style={{ width: "100%", color: "green" }}
                >
                  Tab 1
                  {dataDB && (
                    <Grid item className={classes.galleryGrid}>
                      <Gallery
                        images={dataDB.getOneEvent.imagesArr}
                        rowHeight={180}
                        display={true}
                        backdropClosesModal={true}
                      />
                    </Grid>
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                {loading && <Spinner />}
                <Grid
                  container
                  justify="center"
                  direction="column"
                  alignItems="center"
                  alignContent="center"
                >
                  Tab 3
                </Grid>
              </TabPanel>
              <TabPanel
                value={value}
                index={2}
                dir={theme.direction}
                style={{ width: "100%" }}
              >
                Ratings...
                {loading && <Spinner height={100} width={100} />}
                tab 3
              </TabPanel>
            </SwipeableViews>
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
            user={user}
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
  return <p>Reload please</p>;
}

const useStyles = makeStyles(theme => ({
  paper: {
    background: "black",
    color: "white",
    marginTop: "10vh",

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
    width: "100%"
    //background: "rgba(255,255,255,0.2)",
    //borderRadius: 4,
    //padding: theme.spacing(3, 2)
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
