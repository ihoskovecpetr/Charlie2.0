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
import { useXsSize } from "./Hooks/useXsSize";

import UpperStripe from "./Atoms/UpperStripe";
import DrawerContent from "./Atoms/UpperStripeAndDrawer/DrawerContent";
import WindowEventSnackbar from "./Atoms/WindowEventSnackbar";

import { UserContext } from "./userContext";
import { usePosition } from "./Hooks/useGeolocation";
import { LOGIN } from "src/Services/GQL/LOGIN";

// import { useWindowSize } from "./Hooks/useWindowSize";

import Menu from "./Pages/Menu";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import SignOut from "./Pages/SignOut";
import Create from "./Pages/Create";
import MapWrap from "./Pages/MapWrap";
import Event from "./Pages/Event";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import UserModal from "./Pages/UserModal";
import Play from "./Pages/Play";
import PlayOutside from "./Pages/PlayOutside";
import AcceptPage from "./Pages/AcceptPage"
import Search from "./Pages/SearchPage"
import Privacy from "./Pages/PrivacyPage"
import FloatingBtnWrap from "./Molecules/FloatingBtnWrap";


const drawerWidth = 240;
let prevLocation;
// let firstLocation;

function App({location, container}) {
  let history = useHistory();
  const { md_size_memo } = useXsSize();
  console.log("App.js rErEnDeR, conteiner: ", location, container)
  const { latitude, longitude, err } = usePosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [finishedAnimation, setFinishedAnimation] = useState(false);
  const [routerState, setRouterState] = useState({ 
    firstPrint: false,
    Modal: false,
    justGoBack: false
  });
  const [workingPosition, setWorkingPosition] = useState({
    date: new Date().toISOString().split("T")[0],
    geometry: null
  });
  const [getLoggedInUser, { loading, error, data }] = useMutation(LOGIN);

  //Overriding default styles in Material UI
  const theme = createMuiTheme({
    overrides: {
      MuiTab: {
        root: {
          color: md_size_memo ? 'white !important' : 'black !important',
          fontWeight: 600
        },
      },
      PrivateTabIndicator: {
        root: {
          backgroundColor: 'grey !important',
        },
      },
    },
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
      position: location.pathname.split("/")[1] === "map" ? "fixed" : null,
      width: "100%",
      backgroundColor: "#F8F8F8",
      // overflow: "scroll"
    }
  }));

  const classes = useStyles();

  console.log("Rerendering whole App workpos: ", workingPosition);

  const [contx, setContx] = useState({
    success: false,
    name: false,
    _id: null,
    email: null,
    picture: null,
    description: null,
    geolocationObj: null,
    countUnseenBookings: 0,
    countUnseenRatings: 0,
    getLoggedInUser: () => getLoggedInUser(),
    setUserToContext: () => setUserToContext(),
    deleteToken: () => window.localStorage.setItem("token", "_deleted_"),

    openDrawer: true,
    freezScroll: false,
    expanded_id: null,
    filterOn: true,
    shownEvents: [],
    playEventsCount: null,
    radius: 20,
    days: 2,
    // firstPrint: location.pathname.split("/")[1] === "play" ? true : false
  });

  const setUserToContext = (userObj) => {
console.log("setUserToContext: ", userObj)
if(userObj){
      setContx(prev => {return {
      ...prev,
      _id: userObj._id,
      success: userObj.success,
      name: userObj.name,
      email: userObj.email,
      picture: userObj.picture,
      description: userObj.description,
    }}
    );
}

  }

  useEffect(() => {
    // getLoggedInUser();
    if(location.pathname.split("/")[1] === "play" && !window.firstPrintPlay){
      window.firstPrintPlay = "play"
    }else{
      window.firstPrintPlay = "else"
    }
  }, [location.pathname]);

  useEffect(() => {

    getLoggedInUser();
    prevLocation = location;
    // firstLocation = location.pathname.split("/")[1];
    // if(location.pathname.split("/")[1] === "play"){
    //   console.log("Setting FPnt: true")
    //   setUser(prev => {
    //   return { ...prev, firstPrint: true };
    // });
    // }

  }, []);

  // if (data) {
    useEffect(() => {
      if (data && data.getLoggedInUser) {

        // setContx(prev => {return {
        //   ...prev,
        //   _id: data.getLoggedInUser._id,
        //   success: data.getLoggedInUser.success,
        //   name: data.getLoggedInUser.name,
        //   email: data.getLoggedInUser.email,
        //   picture: data.getLoggedInUser.picture,
        //   description: data.getLoggedInUser.description,
        // }});
        console.log("Calling setUserToContext from App")
        setUserToContext(data.getLoggedInUser)
      }
    }, [data]);

  // }
  useEffect(() => {
  if (latitude && longitude && !contx.geolocationObj) {
    console.log("Context. setting Geolocation Obj: ", latitude ,longitude)
    setContx(prev => {
      return { ...prev, geolocationObj: { lat: latitude, lng: longitude }};
    });
  }
  }, [latitude, longitude])

  const providerValue = useMemo(() => {
    let context = contx
    let setContext = setContx
    return { context, setContext };
  }, [contx, setContx]);

  const handleDrawerToggle = () => {
    if(!window.eventId){
      setMobileOpen(!mobileOpen);
    } 
  };

  const ListOfUrls = contx.success
    ? ["", "play", "create", "map", "about", "search", "privacy-policy", "signout", "user", "profile", "accept"]
    : ["", "play", "create", "map", "about", "search", "privacy-policy", "signin", "user", "signup", "accept"];

    // Just for DRAWER and NavigationHeader (UpperStripe)
  const ListOfNames = contx.success
    ? ["Charlie", "Play", "Create", "Map", "About", "Sign Out"]
    : ["Charlie", "Play", "Create", "Map", "About", "Sign In"];
  const ListOfComponents = contx.success
    ? [
        <Menu
          ListOfNames={ListOfNames}
          ListOfUrls={ListOfUrls}
          finishedAnimation={finishedAnimation}
          setFinishedAnimation={setFinishedAnimation}
        />,
        <Play />,
        <Create />, //create
        <MapWrap
          workingPosition={workingPosition}
          setWorkingPosition={setWorkingPosition}
        />, //Map
        <About />,
        <Search />,
        <Privacy />,
        <SignOut />,
        <UserModal />,
        <Profile />,
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
        <MapWrap
          workingPosition={workingPosition}
          setWorkingPosition={setWorkingPosition}
        />,
        <About />,
        <Search />,
        <Privacy />,
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

  let firstPrint = false;
  let Modal = false;
  let justGoBack = false;

useEffect(() => {

  console.log("App Location props rerendered: ", location)

  firstPrint = false;
  Modal = false;
  justGoBack = false;
  var pathSet = location.pathname.split("/");

  if (
    pathSet[1] == "event" ||
    pathSet[1] == "user" ||
    pathSet[1] == "signin" ||
    pathSet[1] == "signout"
  ) {
    Modal = true;
  }

  if (!Modal) {
    prevLocation = location;
  }

  if (prevLocation == location) {
    firstPrint = true;
  }

  if (
    location &&
    location.state &&
    location.state.justGoBack == true
  ) {
    justGoBack = true;
  }

  console.log("Modal, justGoBack, firstPrint ", Modal, justGoBack, firstPrint)
  console.log(" PrevLocation, location ", prevLocation, location)

  setRouterState({
    Modal: Modal,
    justGoBack: justGoBack,
    firstPrint: firstPrint 
  })

}, [location])
 
  return (
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={providerValue}>
          <>
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

          </>
          {routerState.firstPrint && routerState.Modal && (
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
          {!routerState.firstPrint && routerState.Modal && (
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
                      {text != "play" && <UpperStripe
                          loading={loading}
                          userApp={contx}
                          ListOfNames={ListOfNames}
                          ListOfUrls={ListOfUrls}
                          handleDrawerToggle={handleDrawerToggle}
                          drawerWidth={drawerWidth}
                        />
                      }
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
                        userApp={contx}
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
          {!routerState.Modal && window.firstPrintPlay != "play" && (
            <>
              <Switch location={prevLocation}>
              <Route
                    exact
                    path={`/map`}
                    render={() => (
                      <>
                      <UpperStripe
                          loading={loading}
                          userApp={contx}
                          ListOfNames={ListOfNames}
                          ListOfUrls={ListOfUrls}
                          handleDrawerToggle={handleDrawerToggle}
                          drawerWidth={drawerWidth}
                        />
                        <main className={classes.content}>
                          <div className={classes.toolbar} />
                          {contx.name ? <MapWrap
                               workingPosition={workingPosition}
                               setWorkingPosition={setWorkingPosition} /> 
                               : <SignIn />}
                        </main>
                      </>
                    )}
                  />
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
            <Route
                exact
                path={`/accept/:event_id/:user_id`}
                render={() => (
                  <>
                  <UpperStripe
                          loading={loading}
                          userApp={contx}
                          ListOfNames={ListOfNames}
                          ListOfUrls={ListOfUrls}
                          handleDrawerToggle={handleDrawerToggle}
                          drawerWidth={drawerWidth}
                        />
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <AcceptPage />
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
                          userApp={contx}
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
                        userApp={contx}
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
          {!routerState.Modal && window.firstPrintPlay === "play" && (
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
