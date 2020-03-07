import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import { green } from "@material-ui/core/colors";
import clsx from "clsx";

import SwipeableViews from "react-swipeable-views";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory, NavLink } from "react-router-dom";

import Copyright from "../Atoms/copyright";
import { UserContext } from "../userContext";
import Spinner from "../Atoms/Spinner";
import EventCard from "../Molecules/EventCard";
import RatingCard from "../Molecules/rating-card";

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

const HOST_RATINGS = gql`
  query showRatings($host_id: ID!) {
    userEvents(user_id: $host_id) {
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
      guest {
        _id
        picture
        name
      }
      _id
      message
      ratingValue
      createdAt
    }
    showUserBookings(user_id: $host_id) {
      event {
        _id
        name
        description
        dateStart
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

// function tryLogin() {
//   console.log("Mutation data: ", data);
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

function Profile() {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  const { context } = useContext(UserContext);
  const [value, setValue] = React.useState(0);
  // const hostingStates = useQuery(USER_EVENTS, {
  //   variables: { user_id: user._id }
  // });
  // const bookingStates = useQuery(USER_BOOKING, {
  //   variables: { user_id: user._id }
  // });
  useEffect(() => {
    document.documentElement.style.overflow = "auto"
    return () =>{
    } 
  }, []);

  const { loading, error, data } = useQuery(HOST_RATINGS, {
    variables: { host_id: context._id }
  });


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  console.log(
    "Rerendering PROFILE: ",
    // hostingStates.data,
    // bookingStates.data,
    data,
    loading,
    error
  );

  return (
    <div
      className={classes.profileWrap}
      style={{ position: context.freezScroll ? "fixed" : "absolute" }}
    >
    <Container
      maxWidth="sm"
    >
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar} src={context.picture}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {context.name}
        </Typography>
        <Typography variant="body1">{context.email}</Typography>
        <Button color="inherit" className={classes.buttonNavi}>
          <NavLink to={`/signout`}>
            <Typography variant="subtitle2">Sign out</Typography>
            <ExitToAppIcon />
          </NavLink>
        </Button>
        <Typography variant="body1">{context.description}</Typography>
        {error && <h1>ERROR</h1>}
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
                  badgeContent={data && data.showUserBookings.length}
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
                  badgeContent={data && data.userEvents.length}
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
                  badgeContent={data && data.showRatings.length}
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
              {data &&
                data.showUserBookings &&
                data.showUserBookings.map((event, index) => (
                  <Grid item key={index} style={{ width: "100%" }}>
                    <EventCard event={event.event} />
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
            Ratings...
            {loading && <Spinner height={100} width={100} />}
            {data &&
              data.showRatings &&
              data.showRatings.map((rating, index) => (
                <RatingCard rating={rating} key={index} />
              ))}
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
  profileWrap: {
    top: 0,
    height: "100%",
    width: "100%",
    position: "fixed",
    // background:
    //   "linear-gradient(180deg, rgba(0,0,255,0.5) 30%, rgba(255,0,100,0.5) 100%)"
  },
  paper: {
    marginTop: theme.spacing(8),
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
