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
import { useQuery } from "@apollo/react-hooks";

import { UserContext } from "src/Contexts/userContext";
import { sortByDate } from "../Services/functions";
import { useXsSize } from "../Hooks/useXsSize";
import { useCountUnseenBookingsRatings } from "src/Hooks/useCountUnseenBookingsRatings";
import { PROFILE_DATA } from "src/Services/GQL/PROFILE_DATA";

import Copyright from "../Atoms/copyright";
import Spinner from "../Atoms/Spinner";
import ReceivedRatingsCard from "src/Atoms/Profile/ReceivedRatingsCard";
import ProfileTopBox from "../Molecules/profile/ProfileTopBox";
import ProfileBookingsPrinter from "src/Molecules/profile/ProfileBookingsPrinter";
import ProfileEventsPrinter from "src/Molecules/profile/ProfileEventsPrinter";

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
      {value === index && (
        <Box component="span" p={1}>
          {children}
        </Box>
      )}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function Profile() {
  const classes = useStyles();
  const theme = useTheme();
  const { context, setContext } = useContext(UserContext);
  const [value, setValue] = useState(0);
  const [bookingsArray, setBookingsArray] = useState([]);
  const [requestsArray, setRequestsArray] = useState([]);
  const {
    countHostBookings,
    countUserBookings,
    countRatings,
  } = useCountUnseenBookingsRatings();
  const { md_size_memo } = useXsSize();
  const { loading, error, data } = useQuery(PROFILE_DATA, {
    variables: { host_id: context._id },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    document.documentElement.style.overflow = "auto";
  }, []);

  const trsfmFeed = (events, type) => {
    return events.map(item => ({ ...item, type: type }));
  };

  useEffect(() => {
    if (data) {
      let { showUserBookings, showHostBookings } = data;

      const transformedBookingsArr = [
        ...trsfmFeed(showUserBookings, "yourBooking"),
        // ...trsfmFeed(showHostBookings, "askForJoin"),
      ];

      const transformedRequestsArr = [
        // ...trsfmFeed(showUserBookings, "yourBooking"),
        ...trsfmFeed(showHostBookings, "askForJoin"),
      ];

      const sortedMyBookings = sortByDate(
        transformedBookingsArr,
        "createdAt",
        "DESC"
      );

      const sortedRequests = sortByDate(
        transformedRequestsArr,
        "createdAt",
        "DESC"
      );

      setBookingsArray(sortedMyBookings);
      setRequestsArray(sortedRequests);
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
          : null,
      }}
    >
      <Container
        maxWidth="md"
        style={{ padding: 0, paddingTop: md_size_memo ? 0 : 80 }}
        className={classes.profileContainer}
      >
        <Grid container justify="center">
          <Grid item md={4} xs={12}>
            <ProfileTopBox
              errorQuery={error}
              showRatings={data && data.showRatings}
            />
          </Grid>
          <Grid item md={8} xs={12}>
            <AppBar
              position="static"
              color="primary"
              className={classes.appBar}
              classes={{
                colorPrimary: classes.colorPrimary,
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
                    <Badge color="secondary" badgeContent={countUserBookings}>
                      MY BOOKINGS
                    </Badge>
                  }
                  {...a11yProps(0)}
                />
                <Tab
                  label={
                    <Badge
                      color="primary"
                      badgeContent={
                        data && data.userEvents && data.userEvents.length
                      }
                      // data &&
                      // data.showUserBookings &&
                      // data.showUserBookings.length +
                    >
                      MY EVENTS
                    </Badge>
                  }
                  {...a11yProps(1)}
                />

                {/* <Tab
                  label={
                    <Badge color="secondary" badgeContent={countRatings}>
                      RATINGS
                    </Badge>
                  }
                  {...a11yProps(3)}
                /> */}

                <Tab
                  label={
                    <Badge color="secondary" badgeContent={countHostBookings}>
                      REQUESTS ON ME
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
              style={{ width: "100%", padding: 0, overflow: "hidden" }}
            >
              <TabPanel
                value={value}
                index={0}
                dir={theme.direction}
                className={classes.tabPanel}
              >
                {loading && (
                  <Grid container justify="center">
                    <Grid item>
                      <Spinner height={100} width={100} />
                    </Grid>
                  </Grid>
                )}
                {bookingsArray &&
                  bookingsArray.map((booking, index) => (
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      alignContent="center"
                      style={{ width: "100%", padding: 0 }}
                    >
                      <Grid item xs={12} key={index}>
                        <ProfileBookingsPrinter booking={booking} />
                      </Grid>
                    </Grid>
                  ))}
              </TabPanel>

              <TabPanel
                value={value}
                index={1}
                dir={theme.direction}
                className={classes.tabPanel}
              >
                {loading && <Spinner />}
                {data && <ProfileEventsPrinter userEvents={data.userEvents} />}
              </TabPanel>

              <TabPanel
                value={value}
                index={2}
                dir={theme.direction}
                className={classes.tabPanel}
                style={{ width: "100%" }}
              >
                {requestsArray &&
                  requestsArray.map((booking, index) => (
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      alignContent="center"
                      style={{ width: "100%", padding: 0 }}
                    >
                      <Grid item xs={12} key={index}>
                        <ProfileBookingsPrinter booking={booking} />
                      </Grid>
                    </Grid>
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
    background: "#F2F2F2",
    // background:
    //   "linear-gradient(90deg, rgba(29,47,94,1) 0%, rgba(103,80,122,1) 100%)"
  },
  profileContainer: {
    top: 0,
  },

  appBar: {
    zIndex: 1,
    color: "white !important",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  tabPanel: {
    // minHeight: "100vh",
    paddingTop: 7,
    paddingBottom: 7,
    width: "100%",
  },
  boxRoot: {
    padding: 10,
  },
  colorPrimary: {
    color: "white !important",
    backgroundColor: "transparent",
  },
}));

export default Profile;
