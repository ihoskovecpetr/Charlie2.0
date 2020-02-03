import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import {
  Switch,
  Route,
  NavLink,
  BrowserRouter as Router
} from "react-router-dom";
import PropTypes from "prop-types";

import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ExploreIcon from "@material-ui/icons/Explore";
import SubjectIcon from "@material-ui/icons/Subject";

import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

//import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import UpperStripe from "./Atoms/upper-stripe";
import FloatingBubbleCards from "./Atoms/FloatingBubbleCards";

import { UserContext } from "./userContext";
import { usePosition } from "./Hooks/useGeolocation";

import Menu from "./Pages/Menu";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import SignOut from "./Pages/SignOut";
import Create from "./Pages/Create";
import MapPage from "./Pages/MapPage";
import Event from "./Pages/Event";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import UserModal from "./Pages/UserModal";
import EventCards from "./Pages/EventCards";

const drawerWidth = 240;
let prevLocation;

const LOGIN = gql`
  query {
    getLoggedInUser {
      _id
      success
      name
      email
      picture
    }
  }
`;

function App(props) {
  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      violetova: "#600328",
      darkGrey: "#242323",
      charliePink: "#E8045D",
      contrastThreshold: 3,
      // Used to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
      success: {
        main: "#E8045D"
      },
      info: {
        main: "#600328"
      },
      warning: {
        main: "#242323"
      }
    }
  });
  const { latitude, longitude, err } = usePosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [finishedAnimation, setFinishedAnimation] = useState(false);

  const { loading, error, data } = useQuery(LOGIN);
  const { container } = props;
  const [user, setUser] = useState({
    success: false,
    name: false,
    geolocationObj: null,
    freezScroll: true
  });
  const [workingPosition, setWorkingPosition] = useState({
    date: new Date().toISOString().split("T")[0],
    geolocation: null
  });

  if (data) {
    if (data.getLoggedInUser.success && user.success == false) {
      setUser({
        _id: data.getLoggedInUser._id,
        success: data.getLoggedInUser.success,
        name: data.getLoggedInUser.name,
        email: data.getLoggedInUser.email,
        picture: data.getLoggedInUser.picture
      });
    }
  }

  if (latitude && longitude && !user.geolocationObj) {
    setUser(prev => {
      return { ...prev, geolocationObj: { lat: latitude, lng: longitude } };
    });
  }

  console.log("App render");

  const providerValue = useMemo(() => {
    console.log("Update CONTEXT:");
    return { user, setUser };
  }, [user, setUser]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    // Update the document title using the browser API
    prevLocation = props.location;
  }, []);

  const ListOfUrls = user.success
    ? ["", "create", "map", "about", "user", "profile", "signout"]
    : ["", "create", "map", "about", "user", "signup", "signin"];
  const ListOfNames = user.success
    ? ["Charlie", "Create", "Map", "About"]
    : ["Charlie", "Create", "Map", "About"];
  const ListOfComponents = user.success
    ? [
        <Menu
          ListOfNames={ListOfNames}
          ListOfUrls={ListOfUrls}
          finishedAnimation={finishedAnimation}
          setFinishedAnimation={setFinishedAnimation}
        />,
        <Create />, //create
        <MapPage
          workingPosition={workingPosition}
          setWorkingPosition={setWorkingPosition}
        />, //Map
        <About />,
        <UserModal />,
        <Profile />,
        <SignOut LOGIN={LOGIN} />
      ]
    : [
        <Menu
          ListOfNames={ListOfNames}
          ListOfUrls={ListOfUrls}
          finishedAnimation={finishedAnimation}
          setFinishedAnimation={setFinishedAnimation}
        />,
        <Create />,
        <MapPage
          workingPosition={workingPosition}
          setWorkingPosition={setWorkingPosition}
        />,
        <About />,
        <UserModal />,
        <SignUp />,
        <SignIn />
      ];
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {ListOfNames.map((text, index) => (
          <NavLink
            to={`/${ListOfUrls[index]}`}
            key={index}
            onClick={() => {
              handleDrawerToggle();
            }}
          >
            <ListItem button key={text}>
              {index === 0 && (
                <ListItemIcon>
                  <Avatar
                    className={classes.avatarCharlie}
                    alt="Remy Sharp"
                    src="https://res.cloudinary.com/party-images-app/image/upload/v1557794256/ojkgl1hkiljwij69njbb.png"
                  />
                </ListItemIcon>
              )}

              {index === 1 && (
                <ListItemIcon>
                  <Avatar className={classes.avatar}>
                    <AddCircleOutlineIcon />
                  </Avatar>
                </ListItemIcon>
              )}
              {index === 2 && (
                <ListItemIcon>
                  <Avatar className={classes.avatar}>
                    <ExploreIcon />
                  </Avatar>
                </ListItemIcon>
              )}
              {index === 3 && (
                <ListItemIcon>
                  <Avatar className={classes.avatar}>
                    <SubjectIcon />
                  </Avatar>
                </ListItemIcon>
              )}

              <ListItemText primary={text} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
    </div>
  );

  const returnComponent = index => {
    return <div className="content_wrap">{ListOfComponents[index]}</div>;
  };

  var pathSet = props.location.pathname.split("/");
  // if (pathSet[1] == "event") {
  // } else if (pathSet[1] == "signin") {
  // } else if (pathSet[1] == "signout") {
  // } else {
  //   console.log("OOO next loc in Switch");
  //   prevLocation = props.location;
  // }
  let firstPrint = false;
  let Modal = false;

  if (
    pathSet[1] == "event" ||
    pathSet[1] == "user" ||
    pathSet[1] == "signin" ||
    pathSet[1] == "signout" ||
    pathSet[1] == "play" 
  ) {
    Modal = true;
  }
  // if (pathSet[1] == "user") {
  //   Modal = true;
  // }
  // if (pathSet[1] == "signin") {
  //   Modal = true;
  // }
  // if (pathSet[1] == "signout") {
  //   Modal = true;
  // }

  if (!Modal) {
    prevLocation = props.location;
  }

  if (prevLocation == props.location) {
    firstPrint = true;
  }

  var justGoBack = false;
  if (
    props.location &&
    props.location.state &&
    props.location.state.justGoBack == true
  ) {
    justGoBack = true;
  }

  //console.log("APP, firstPrint a Modal: ", firstPrint, Modal);
  return (
    <div className={classes.root} id="wrap_full">
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={providerValue}>
          <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper
                }}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            {/* <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden> */}
          </nav>
          {firstPrint && Modal && (
            <>
              <Route
                exact
                path={`/event/:id`}
                render={() => (
                  <>
                    <UpperStripe
                      //bringOwnUser?? true??
                      loading={loading}
                      userApp={false}
                      ListOfNames={ListOfNames}
                      ListOfUrls={ListOfUrls}
                      handleDrawerToggle={handleDrawerToggle}
                      drawerWidth={drawerWidth}
                    />
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <Event />
                    </main>
                  </>
                )}
              />
                            <Route
                exact
                path={`/play/:id`}
                render={() => (
                  <>
                    <UpperStripe
                      //bringOwnUser?? true??
                      loading={loading}
                      userApp={false}
                      ListOfNames={ListOfNames}
                      ListOfUrls={ListOfUrls}
                      handleDrawerToggle={handleDrawerToggle}
                      drawerWidth={drawerWidth}
                    />
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <EventCards />
                    </main>
                  </>
                )}
              />
              <Route
                exact
                path={`/user/:id`}
                render={() => (
                  <>
                    <UpperStripe
                      //bringOwnUser?? true??
                      loading={loading}
                      userApp={false}
                      ListOfNames={ListOfNames}
                      ListOfUrls={ListOfUrls}
                      handleDrawerToggle={handleDrawerToggle}
                      drawerWidth={drawerWidth}
                    />
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <UserModal />
                    </main>
                  </>
                )}
              />
              <Route
                exact
                path={`/signin`}
                render={() => (
                  <>
                    <UpperStripe
                      //bringOwnUser?? true??
                      loading={loading}
                      userApp={false}
                      ListOfNames={ListOfNames}
                      ListOfUrls={ListOfUrls}
                      handleDrawerToggle={handleDrawerToggle}
                      drawerWidth={drawerWidth}
                    />
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <SignIn />
                    </main>
                  </>
                )}
              />
              <Route
                exact
                path={`/signout`}
                render={() => (
                  <>
                    <UpperStripe
                      //bringOwnUser?? true??
                      loading={loading}
                      userApp={false}
                      ListOfNames={ListOfNames}
                      ListOfUrls={ListOfUrls}
                      handleDrawerToggle={handleDrawerToggle}
                      drawerWidth={drawerWidth}
                    />
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <SignOut />
                    </main>
                  </>
                )}
              />
            </>
          )}
          {!firstPrint && Modal && (
            <>
              <Route
                exact
                path={`/event/:id`}
                render={() => (
                  <>
                    <Event />
                  </>
                )}
              />
              <Route
                exact
                path={`/user/:id`}
                render={() => (
                  <>
                    <UserModal />
                  </>
                )}
              />
              <Route
                exact
                path={`/signin`}
                render={() => (
                  <>
                    <SignIn />
                  </>
                )}
              />
              <Route
                exact
                path={`/signout`}
                render={() => (
                  <>
                    <SignOut />
                  </>
                )}
              />
              <Switch location={prevLocation}>
                {ListOfUrls.map((text, index) => (
                  <Route
                    exact
                    path={`/${text}`}
                    key={index}
                    render={() => (
                      <>
                        <UpperStripe
                          loading={loading}
                          userApp={user}
                          ListOfNames={ListOfNames}
                          ListOfUrls={ListOfUrls}
                          handleDrawerToggle={handleDrawerToggle}
                          drawerWidth={drawerWidth}
                        />
                        <main className={classes.content}>
                          <div className={classes.toolbar} />
                          {returnComponent(index)}
                        </main>
                      </>
                    )}
                  />
                ))}
                <Route
                  path={`/`}
                  key={"xc"}
                  render={() => (
                    <>
                      <UpperStripe
                        loading={loading}
                        userApp={user}
                        ListOfNames={ListOfNames}
                        ListOfUrls={ListOfUrls}
                        handleDrawerToggle={handleDrawerToggle}
                        drawerWidth={drawerWidth}
                      />
                      <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Menu
                          ListOfNames={ListOfNames}
                          ListOfUrls={ListOfUrls}
                        />
                        ,
                      </main>
                    </>
                  )}
                />
              </Switch>
            </>
          )}
          {!Modal && (
            <>
              <Switch location={prevLocation}>
                {ListOfUrls.map((text, index) => (
                  <Route
                    exact
                    path={`/${text}`}
                    key={index}
                    render={() => (
                      <>
                        <UpperStripe
                          loading={loading}
                          userApp={user}
                          ListOfNames={ListOfNames}
                          ListOfUrls={ListOfUrls}
                          handleDrawerToggle={handleDrawerToggle}
                          drawerWidth={drawerWidth}
                        />
                        <main className={classes.content}>
                          <div className={classes.toolbar} />
                          {returnComponent(index)}
                        </main>
                      </>
                    )}
                  />
                ))}
                <Route
                  path={`/`}
                  key={"xc"}
                  render={() => (
                    <>
                      <UpperStripe
                        loading={loading}
                        userApp={user}
                        ListOfNames={ListOfNames}
                        ListOfUrls={ListOfUrls}
                        handleDrawerToggle={handleDrawerToggle}
                        drawerWidth={drawerWidth}
                      />
                      <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Menu
                          ListOfNames={ListOfNames}
                          ListOfUrls={ListOfUrls}
                        />
                        ,
                      </main>
                    </>
                  )}
                />
              </Switch>
              <FloatingBubbleCards />
            </>
          )}
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}

App.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  )
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: 0,
      flexShrink: 0
    }
  },
  avatarCharlie: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: 40,
    height: 40
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    width: "100%"
    //padding: theme.spacing(3)
  }
}));

function AppWrap() {
  return (
    <Router>
      <Route component={props2 => <App {...props2} />} />
    </Router>
  );
}

export default AppWrap;
