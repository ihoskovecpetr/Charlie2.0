import React, { useContext } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";

import { UserContext } from "../userContext";
import Spinner from "../Atoms/Spinner";
import EventCard from "../Molecules/event-card";
import Copyright from "../Atoms/copyright";

const USER_EVENTS = gql`
  query userEvents($user_id: ID!) {
    userEvents(user_id: $user_id) {
      success
      name
      _id
      dateStart
      author {
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
  }
`;

const USER_BOOKING = gql`
  query {
    showUserBookings(user_id: "5de415967198fe2d1e694c87") {
      event {
        name
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

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  },
  profileContainer: {
    position: "absolute",
    top: 0,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background:
      "linear-gradient(180deg, rgba(0,0,255,0.5) 30%, rgba(255,0,100,0.5) 100%)"
  },
  paper: {
    marginTop: theme.spacing(8),
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 500,
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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

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
  const { loading, error, data } = useQuery(USER_EVENTS, {
    variables: { user_id: user._id }
  });
  const bookingStates = useQuery(USER_BOOKING, {
    variables: { user_id: user._id }
  });

  //const { loadingB, errorB, dataB } = bookingStates;

  //const [newUser, { loading, error, data }] = useMutation(NEW_USER);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  console.log("user Events: ", data);

  return (
    <Container className={classes.profileContainer}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar} src={user.picture}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {user.name}
        </Typography>

        {/* </Paper>
      <Paper className={classes.paper}> */}
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
                bookingStates.data && bookingStates.data.showUserBookings
                  ? `ATTENDING (${bookingStates.data.showUserBookings.length})`
                  : "ATTENDING"
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                data && data.userEvents
                  ? `HOSTING (${data.userEvents.length})`
                  : "HOSTING"
              }
              {...a11yProps(1)}
            />

            <Tab label="RATING" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {bookingStates.loading && <Spinner />}
            {bookingStates.data &&
              bookingStates.data.showUserBookings &&
              bookingStates.data.showUserBookings.map(event => (
                <EventCard event={event.event} />
              ))}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {loading && <Spinner />}
            {data &&
              data.userEvents &&
              data.userEvents.map(event => <EventCard event={event} />)}
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Item Three
          </TabPanel>
        </SwipeableViews>
      </Paper>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Profile;
