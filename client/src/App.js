import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import {
  Switch,
  Route,
  NavLink,
  Redirect,
  useHistory,
  BrowserRouter as Router
} from "react-router-dom";
import PropTypes from "prop-types";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import UpperStripe from "./Atoms/UpperStripe";
import DrawerContent from "./Atoms/DrawerContent";
import WindowEventSnackbar from "./Atoms/WindowEventSnackbar";

import { UserContext } from "./userContext";
import { usePosition } from "./Hooks/useGeolocation";
// import { useWindowSize } from "./Hooks/useWindowSize";

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
import Play from "./Pages/Play";
import PlayOutside from "./Pages/PlayOutside";

import FloatingBtnWrap from "./Molecules/FloatingBtnWrap";


const drawerWidth = 240;
let prevLocation;
let firstLocation

const LOGIN = gql`
  mutation {
    getLoggedInUser {
      _id
      success
      name
      email
      picture
      description
    }
  }
`;

function App(props) {
  //  const windowSize = useWindowSize()
  let history = useHistory();

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

  const useStyles = makeStyles(theme => ({

    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: 0,
        flexShrink: 0
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      height: "100vh",
      // height: `${1*windowSize.height}px`,
      position: props.location.pathname.split("/")[1] === "map" ? "fixed" : null,
      width: "100%",
      backgroundColor: "#F8F8F8",
      // overflow: "scroll"
    }
  }));

  const classes = useStyles();
  const { latitude, longitude, err } = usePosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [finishedAnimation, setFinishedAnimation] = useState(false);


  //const { loading, error, data } = useQuery(LOGIN);
  const [getLoggedInUser, { loading, error, data }] = useMutation(
    LOGIN,
    {
      variables: { user_id: "FAKE" }
    }
  );
  const { container } = props;
  const [user, setUser] = useState({
    success: false,
    name: false,
    _id: null,
    email: null,
    picture: null,
    description: null,
    geolocationObj: null,
    freezScroll: false,
    getLoggedInUser: () => getLoggedInUser(),
    deleteToken: () => window.localStorage.setItem("token", "_deleted_"),
    shownEvents: [],
    playEventsCount: null,
    radius: 20,
    days: 2,
    // firstPrint: props.location.pathname.split("/")[1] === "play" ? true : false
  });
  const [workingPosition, setWorkingPosition] = useState({
    date: new Date().toISOString().split("T")[0],
    geolocation: null
  });


  useEffect(() => {
    console.log("App UseEffect []")
    getLoggedInUser();
    if(props.location.pathname.split("/")[1] === "play" && !window.firstPrintPlay){
      window.firstPrintPlay = "play"
    }else{
      window.firstPrintPlay = "else"
    }
  }, [props.location.pathname]);

  useEffect(() => {

    prevLocation = props.location;
    firstLocation = props.location.pathname.split("/")[1];
    // if(props.location.pathname.split("/")[1] === "play"){
    //   console.log("Setting FPnt: true")
    //   setUser(prev => {
    //   return { ...prev, firstPrint: true };
    // });
    // }

  }, []);

  // if (data) {
    useEffect(() => {
      if (data && data.getLoggedInUser) {
        setUser(prev => {return {
          ...prev,
          _id: data.getLoggedInUser._id,
          success: data.getLoggedInUser.success,
          name: data.getLoggedInUser.name,
          email: data.getLoggedInUser.email,
          picture: data.getLoggedInUser.picture,
          description: data.getLoggedInUser.description
        }});
      }
    }, [data]);

  // }

  if (latitude && longitude && !user.geolocationObj) {
    setUser(prev => {
      return { ...prev, geolocationObj: { lat: latitude, lng: longitude }};
    });
  }

  const providerValue = useMemo(() => {
    let context = user
    let setContext = setUser
    return { context, setContext };
  }, [user, setUser]);

  const handleDrawerToggle = () => {
    if(!window.eventId){
      setMobileOpen(!mobileOpen);
    } 
  };

  const ListOfUrls = user.success
    ? ["", "play", "create", "map", "about", "signout", "user", "profile"]
    : ["", "play", "create", "map", "about", "signin", "user", "signup"];
  const ListOfNames = user.success
    ? ["Charlie", "Play", "Create", "Map", "About", "Sign Out"]
    : ["Charlie", "Play", "Create", "Map", "About", "Sign In"];
  const ListOfComponents = user.success
    ? [
        <Menu
          ListOfNames={ListOfNames}
          ListOfUrls={ListOfUrls}
          finishedAnimation={finishedAnimation}
          setFinishedAnimation={setFinishedAnimation}
        />,
        <Play />,
        <Create />, //create
        <MapPage
          workingPosition={workingPosition}
          setWorkingPosition={setWorkingPosition}
        />, //Map
        <About />,
        <SignOut LOGIN={LOGIN} />,
        <UserModal />,
        <Profile />
      ]
    : [
        <Menu
          ListOfNames={ListOfNames}
          ListOfUrls={ListOfUrls}
          finishedAnimation={finishedAnimation}
          setFinishedAnimation={setFinishedAnimation}
        />,
        <Play />,
        <Create />,
        <MapPage
          workingPosition={workingPosition}
          setWorkingPosition={setWorkingPosition}
        />,
        <About />,
        <SignIn />,
        <UserModal />,
        <SignUp />
      ];
   
  const returnComponent = index => {


    return <>
            <CssBaseline />
            {ListOfComponents[index]}
          </>;
  };

  var pathSet = props.location.pathname.split("/");
  // if (pathSet[1] == "event") {
  // } else if (pathSet[1] == "signin") {
  // } else if (pathSet[1] == "signout") {
  // } else {
  //   prevLocation = props.location;
  // }

  let firstPrint = false;
  let Modal = false;

  if (
    pathSet[1] == "event" ||
    pathSet[1] == "user" ||
    pathSet[1] == "signin" ||
    pathSet[1] == "signout"
  ) {
    Modal = true;
  }


  if (!Modal) {
    prevLocation = props.location;
  }

  if (prevLocation == props.location) {
    console.log("Prev Loc a Loc: ", prevLocation, props.location, firstLocation);
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

  console.log("APP window.firstPrintPlay?, firstPrint MODAL ", window.firstPrintPlay, firstPrint, Modal)

  return (
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
                  <DrawerContent
                  ListOfNames={ListOfNames} 
                  ListOfUrls={ListOfUrls} 
                  handleDrawerToggle={handleDrawerToggle}
                  drawerWidth={drawerWidth}
                   />
              </Drawer>
            </Hidden>

          <WindowEventSnackbar />

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
                render={() => {
                  return (
                    <>
                      <SignIn />
                    </>
                  );
                }}
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
          {!Modal && window.firstPrintPlay != "play" && (
            <>
              <Switch location={prevLocation}>
              <Route
                    exact
                    path={`/play/:id`}
                    key={"index"}
                    render={() => (
                      <>
                      {window.firstPrintPlay != "play" && (
                        <main className={classes.content}>
                          <div className={classes.toolbar} />
                          {returnComponent(1)}
                        </main>
                      )}
                      )
                      </>
                    )}
                  />
              <Route
                    exact
                    path={`/play`}
                    key={"index"}
                    render={() => (
                      <>
                        <main className={classes.content}>
                          <div className={classes.toolbar} />
                          {returnComponent(1)}
                        </main>
                      </>
                    )}
                  />
              <Route
                exact
                path={`/event/:id`}
                render={() => (
                  <>
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <Event />
                    </main>
                  </>
                )}
              />
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
              <FloatingBtnWrap />
            </>
          )}
          {!Modal && window.firstPrintPlay === "play" && (
            <>
            <Route
                exact
                path={`/play/:id`}
                render={() => (
                  <>
                    {/* <UpperStripe
                      //bringOwnUser?? true??
                      loading={loading}
                      userApp={false}
                      ListOfNames={ListOfNames}
                      ListOfUrls={ListOfUrls}
                      handleDrawerToggle={handleDrawerToggle}
                      drawerWidth={drawerWidth}
                    /> */}
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <PlayOutside />
                    </main>
                  </>
                )}
            />
              <Route
                exact
                path={`/play`}
                render={() => (
                  <>
                    {/* <UpperStripe
                      //bringOwnUser?? true??
                      loading={loading}
                      userApp={false}
                      ListOfNames={ListOfNames}
                      ListOfUrls={ListOfUrls}
                      handleDrawerToggle={handleDrawerToggle}
                      drawerWidth={drawerWidth}
                    /> */}
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <Play />
                    </main>
                  </>
                )}
            />
            </>
          )}
        </UserContext.Provider>
      </ThemeProvider>
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


function AppWrap() {
  return (
    <Router>
      <Route component={props2 => <App {...props2} />} />
    </Router>
  );
}

export default AppWrap;
