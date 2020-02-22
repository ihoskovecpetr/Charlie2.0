import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import clsx from "clsx";

import SwipeableViews from "react-swipeable-views";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory, NavLink } from "react-router-dom";

import { UserContext } from "../userContext";

import Copyright from "../Atoms/copyright";
import Spinner from "../Atoms/Spinner";

import EventCard from "../Molecules/event-card";
import RatingCard from "../Molecules/rating-card";

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

function Profile() {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [value, setValue] = React.useState(0);
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
    window.scrollTo(0, 0);
    console.log("METATE PROIFILE")
    getPlayEventsMutation()
    return () => {
    } 
  }, []);


let dataDB;

if (data) {
    dataDB = data;
    var { getPlayEvents } = dataDB;
  }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

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
      maxWidth="sm"
      className={classes.playContainer}
    >
      <Paper className={classes.paper}>
        <AppBar position="static" color="default" className={classes.appBar}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              label={
                <Badge
                  className={classes.padding}
                  color="secondary"
                  badgeContent={"data && data.showUserBookings.length"}
                >
                  ATTENDING
                </Badge>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Badge
                  className={classes.padding}
                  color="secondary"
                  badgeContent={"data && data.userEvents.length"}
                >
                  HOSTING
                </Badge>
              }
              {...a11yProps(1)}
            />

            <Tab
              label={
                <Badge
                  className={classes.padding}
                  color="secondary"
                  badgeContent={"data && data.showRatings.length"}
                >
                  RATING
                </Badge>
              }
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>
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
              style={{ width: "100%" }}
            >
{getPlayEvents && <>
                  <PlayPageGallery event={getPlayEvents[0]} />
                  {/* <PlayPageList
                    event={getPlayEvents[0]}
                    showBookings={null} //showBookings
                    ONE_EVENT={PLAY_EVENTS}
                    // cancelBooking={cancelBooking}
                    // cancelledState={cancelledState}
                    // bookingStates={bookingStates}
                  /> */}
                                <PlayPageMap
                    event={getPlayEvents[0]}
                    showBookings={null} //showBookings
                    ratings={ratings}
                  /> 
                  </>}
                  
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
            {getPlayEvents && getPlayEvents.map(event => {
              console.log("ITERACE??")
              return (<div>
                  
                  {/* <PlayPageList
                    event={event}
                    showBookings={null} //showBookings
                    ONE_EVENT={PLAY_EVENTS}
                    // cancelBooking={cancelBooking}
                    // cancelledState={cancelledState}
                    // bookingStates={bookingStates}
                  /> */}
                                <PlayPageMap
                    event={event}
                    showBookings={null} //showBookings
                    ratings={ratings}
                  />
                  <PlayPageGallery event={event} />
                </div>)
            } )}
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

          </TabPanel>
        </SwipeableViews>
      </Paper>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );
}
const useStyles = makeStyles(theme => ({
  playContainer: {
    padding: 0,
  },
  profileWrap: {
    top: 0,
    height: "100%",
    width: "100%",
    position: "fixed",
    background:
      "linear-gradient(180deg, rgba(0,0,255,0.5) 30%, rgba(255,0,100,0.5) 100%)"
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
  }
}));

export default Profile;
