import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import SwipeableViews from "react-swipeable-views";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory, NavLink } from "react-router-dom";

import { UserContext } from "../userContext";
import { sortByDate } from "../Services/functions";
import { useXsSize } from "../Hooks/useXsSize";

import Copyright from "../Atoms/copyright";
import Spinner from "../Atoms/Spinner";
import EventCard from "../Atoms/EventCard";
import RatingCard from "../Molecules/rating-card";
import ProfileTopBox from "../Molecules/profile/ProfileTopBox";
import NotificationPrinter from "../Molecules/profile/NotificationPrinter";

// const USER_EVENTS = gql`
//   query userEvents($user_id: ID!) {
//     userEvents(user_id: $user_id) {
//       _id
//       success
//       name
//       dateStart
//       description
//       author {
//         name
//         picture
//       }
//       imagesArr {
//         caption
//         src
//         thumbnail
//         thumbnailHeight
//         thumbnailWidth
//         scaletwidth
//         marginLeft
//         vwidth
//       }
//     }
//   }
// `;

// const USER_BOOKING = gql`
//   query showUserBookings($user_id: ID!) {
//     showUserBookings(user_id: $user_id) {
//       event {
//         _id
//         name
//         description
//         dateStart
//         imagesArr {
//           caption
//           src
//           thumbnail
//           thumbnailHeight
//           thumbnailWidth
//           scaletwidth
//           marginLeft
//           vwidth
//         }
//         author {
//           _id
//           name
//           picture
//         }
//       }
//     }
//   }
// `;

const PROFILE_DATA = gql`
  query showRatings($host_id: ID!) {
    userEvents(user_id: $host_id) {
      createdAt
      updatedAt
      _id
      success
      name
      dateStart
      description
      author {
        _id
        name
        picture
      }
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
    }
    showRatings(host_id: $host_id) {
      createdAt
      updatedAt
      _id
      message
      ratingValue
      guest {
        _id
        picture
        name
      }
    }
    showUserBookings(user_id: $host_id) {
      createdAt
      updatedAt
      message
      response
      confirmed
      cancelled
      decided
      host {
        _id
        name
      }
      user {
        _id
        name
        picture
      }
      event {
        _id
        name
        description
        dateStart
        geometry {
          coordinates
        }
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
        author {
          _id
          name
          picture
        }
      }
    }

    showHostBookings(host_id: $host_id) {
      createdAt
      updatedAt
      message
      response
      confirmed
      cancelled
      decided
      host {
        _id
        name
      }
      user {
        _id
        name
        picture
      }
      event {
        _id
        name
        description
        dateStart
        geometry {
          coordinates
        }
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
        author {
          _id
          name
          picture
        }
      }
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
  const history = useHistory();
  const { context } = useContext(UserContext);
  const [value, setValue] = useState(0);
  const [feedArray, setFeedArray] = useState([]);
  const { xs_size_memo, md_size_memo } = useXsSize();
  const { loading, error, data } = useQuery(PROFILE_DATA, {
    variables: { host_id: context._id }
  });
  // const hostingStates = useQuery(USER_EVENTS, {
  //   variables: { user_id: user._id }
  // });
  // const bookingStates = useQuery(USER_BOOKING, {
  //   variables: { user_id: user._id }
  // });
  useEffect(() => {
    document.documentElement.style.overflow = "auto";
    window.scrollTo(0, 0);
    return () => {};
  }, []);

  console.log(
    "Rerendering PROFILE: data loading error ",
    // hostingStates.data,
    // bookingStates.data,
    data,
    loading,
    error
  );

  let showUserBookings = [];

  const trsfmFeed = (events, type) => {
    return events.map(item => ({ ...item, type: type }));
  };

  useEffect(() => {
    if (data) {
      console.log("I do have DATA: ", data);
      let {
        userEvents,
        showRatings,
        showUserBookings,
        showHostBookings
      } = data;

      const transformedArr = [
        ...trsfmFeed(showRatings, "iGotRating"),
        ...trsfmFeed(showUserBookings, "yourBooking"),
        ...trsfmFeed(showHostBookings, "askForJoin")
      ];

      const sortedFeed = sortByDate(transformedArr, "createdAt", "DESC");

      setFeedArray(sortedFeed);

      console.log("ALL That SHT: ", sortedFeed);
    }
  }, [data]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div
      className={classes.profileWrap}
      id="profile_wrap"
      style={{
        overflow: "hidden",
        color: md_size_memo ? "white" : "black",
        background: md_size_memo
          ? "linear-gradient(90deg, rgba(29,47,94,1) 0%, rgba(104,81,123,1) 100%)"
          : null
      }}
    >
      <Container
        maxWidth="md"
        style={{ padding: 0, paddingTop: md_size_memo ? 0 : 80 }}
        className={classes.profileContainer}
      >
        <Grid container justify="center" spacing={2}>
          <Grid item md={4} xs={12}>
            <ProfileTopBox error={error} />
          </Grid>
          <Grid item md={8} xs={12}>
            <AppBar
              position="static"
              color="primary"
              className={classes.appBar}
              classes={{
                colorPrimary: classes.colorPrimary
              }}
            >
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
                      color="secondary"
                      badgeContent={
                        data &&
                        data.showUserBookings &&
                        data.showUserBookings.length
                      }
                    >
                      FEED
                    </Badge>
                  }
                  {...a11yProps(1)}
                />
                <Tab
                  label={
                    <Badge
                      color="secondary"
                      badgeContent={
                        data &&
                        data.showUserBookings &&
                        data.showUserBookings.length
                      }
                    >
                      EVENTS
                    </Badge>
                  }
                  {...a11yProps(2)}
                />
                {/* <Tab
              label={
                <Badge
                  color="secondary"
                  badgeContent={data && data.userEvents.length}
                >
                  HOSTING
                </Badge>
              }
              {...a11yProps(1)}
            /> */}

                <Tab
                  label={
                    <Badge
                      color="secondary"
                      badgeContent={data && data.showRatings.length}
                    >
                      RATING
                    </Badge>
                  }
                  {...a11yProps(3)}
                />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
              style={{ width: "100%", padding: 0 }}
            >
              <TabPanel
                value={value}
                index={0}
                dir={theme.direction}
                style={{ padding: 0 }}
              >
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
                  alignItems="center"
                  alignContent="center"
                  style={{ width: "100%", padding: 0 }}
                >
                  {feedArray.map((event, index) => (
                    <Grid item xs={12} key={index}>
                      <NotificationPrinter
                        event={event}
                        PROFILE_DATA={PROFILE_DATA}
                      />
                    </Grid>
                  ))}
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
                  {data &&
                    data.showUserBookings &&
                    data.showUserBookings.map((event, index) => (
                      <Grid item key={index}>
                        <EventCard event={event.event} />
                      </Grid>
                    ))}
                  {data &&
                    data.userEvents &&
                    data.userEvents.map((event, index) => (
                      <Grid item key={index} style={{ width: "100%" }}>
                        <EventCard event={event} />
                      </Grid>
                    ))}
                </Grid>
              </TabPanel>
              <TabPanel
                value={value}
                index={2}
                dir={theme.direction}
                style={{ width: "100%" }}
              >
                {loading && <Spinner height={100} width={100} />}
                {data &&
                  data.showRatings &&
                  data.showRatings.map((rating, index) => (
                    <RatingCard rating={rating} key={index} />
                  ))}
              </TabPanel>
            </SwipeableViews>
          </Grid>
        </Grid>

        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
const useStyles = makeStyles(theme => ({
  profileWrap: {
    top: 0,
    width: "100%",
    minHeight: "100vh",
    position: "absolute",
    background: "#F2F2F2"
    // background:
    //   "linear-gradient(90deg, rgba(29,47,94,1) 0%, rgba(103,80,122,1) 100%)"
  },
  profileContainer: {
    top: 0
  },

  appBar: {
    zIndex: 1,
    color: "white !important",
    backgroundColor: "transparent",
    boxShadow: "none"
  },
  colorPrimary: {
    color: "white !important",
    backgroundColor: "transparent"
  }
}));

export default Profile;
