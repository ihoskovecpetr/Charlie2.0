import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import PropTypes from "prop-types";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import CssBaseline from "@material-ui/core/CssBaseline";

import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

import { useMutation } from "@apollo/react-hooks";
import { useXsSize } from "./Hooks/useXsSize";

import UpperStripe from "./Atoms/UpperStripe";
import DrawerContent from "./Atoms/UpperStripeAndDrawer/DrawerContent";
import WindowEventSnackbar from "./Atoms/WindowEventSnackbar";
import InAppBrowserSnackbar from "./Atoms/InAppBrowserSnackbar";

import { UserContext } from "./userContext";
import { usePosition } from "./Hooks/useGeolocation";
import { useHandleAppBrowser } from "./Hooks/useHandleAppBrowser";
import { GET_LOGGED_IN_USER } from "src/Services/GQL/GET_LOGGED_IN_USER";

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
import AcceptPage from "./Pages/AcceptPage";
import Search from "./Pages/SearchPage";
import Privacy from "./Pages/PrivacyPage";
import ConfirmUserPage from "./Pages/ConfirmUserPage";
import FloatingBtnWrap from "./Molecules/FloatingBtnWrap";

const drawerWidth = 240;
let prevLocation;

function RenderCounter() {
  console.log("RerenderCounter");
  return "RRC";
}

function App({ location, container }) {
  const { md_size_memo } = useXsSize();
  const { latitude, longitude, address, geoError } = usePosition();
  const { inAppBrowser } = useHandleAppBrowser();
  const [mobileOpen, setMobileOpen] = useState(false);
  // const [finishedAnimation, setFinishedAnimation] = useState(false);
  const [routerState, setRouterState] = useState({
    firstPrint: false,
    Modal: false,
    justGoBack: false,
  });
  const [workingPosition, setWorkingPosition] = useState({
    date: new Date().toISOString().split("T")[0],
    geometry: null,
    zoom: 10,
  });
  const [getLoggedInUser, { loading, error, data }] = useMutation(
    GET_LOGGED_IN_USER
  );

  const [contx, setContx] = useState({
    success: false,
    name: false,
    _id: null,
    email: null,
    picture: null,
    description: null,
    geolocationObj: null,
    declinedGeolocation: false,
    curPositionAddress: null,
    countUnseenBookings: 0,
    countUnseenRatings: 0,
    getLoggedInUser: () => getLoggedInUser(),
    setUserToContext: () => setUserToContext(),
    deleteToken: () => window.localStorage.setItem("token", "_deleted_"),

    openDrawer: true,
    freezScroll: false,
    showAlertAdviseEmail: false,
    rememberSignIn: false,
    expanded_id: null,
    playFilterObj: {
      filterOn: false,
      geolocationPlay: { lng: 14.40076, lat: 50.08804 },
      playEventsCount: null,
      radius: 40,
      plusDays: 4,
      shownEvents: [],
    },
  });

  console.log("App.js rErEnDeR, conteiner: ", location, container);

  //Overriding default styles in Material UI
  const theme = createMuiTheme({
    overrides: {
      MuiTab: {
        root: {
          color: md_size_memo ? "white !important" : "black !important",
          fontWeight: 600,
        },
      },
      PrivateTabIndicator: {
        root: {
          backgroundColor: "grey !important",
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
        main: "#E8045D",
      },
      info: {
        main: "#600328",
      },
      warning: {
        main: "#242323",
      },
    },
  });

  const useStyles = makeStyles((theme) => ({
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: 0,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      height: "100vh",
      // height: `${1*windowSize.height}px`,
      position: location.pathname.split("/")[1] === "map" ? "fixed" : null,
      width: "100%",
      backgroundColor: "#F8F8F8",
      // overflow: "scroll"
    },
  }));

  const classes = useStyles();

  console.log("Rerendering whole App cntx: ", contx);

  const setUserToContext = (userObj) => {
    console.log("setUserToContext: ", userObj);
    if (userObj) {
      setContx((prev) => {
        return {
          ...prev,
          _id: userObj._id,
          success: userObj.success,
          name: userObj.name,
          email: userObj.email,
          telephone: userObj.telephone,
          picture: userObj.picture,
          description: userObj.description,
          rememberSignIn: true,
        };
      });
    }
  };

  useEffect(() => {
    if (location.pathname.split("/")[1] === "play" && !window.firstPrintPlay) {
      window.firstPrintPlay = "play";
    } else {
      window.firstPrintPlay = "else";
    }
  }, [location.pathname]);

  useEffect(() => {
    getLoggedInUser();
    prevLocation = location;
  }, []);

  useEffect(() => {
    if (data && data.getLoggedInUser) {
      console.log("Calling setUserToContext from App");
      setUserToContext(data.getLoggedInUser);
    }
  }, [data]);

  useEffect(() => {
    console.log("UseEffect App.js geolocation");
    if (latitude && longitude && !contx.geolocationObj) {
      console.log(
        "Context. setting Geolocation Obj: ",
        latitude,
        longitude,
        geoError,
        geoError ? "ano" : "ne"
      );
      setContx((prev) => {
        return {
          ...prev,
          geolocationObj: { lat: latitude, lng: longitude },
          playFilterObj: {
            ...prev.playFilterObj,
            filterOn: true,
            geolocationPlay: { lat: latitude, lng: longitude },
          },
        };
      });
    }
    if (geoError) {
      console.log("Context. setting Geolocation Obj:EROR ", geoError);
      setContx((prev) => {
        return {
          ...prev,
          declinedGeolocation: geoError ? true : false,
        };
      });
    }
  }, [latitude, longitude, geoError]);

  useEffect(() => {
    if (!contx.curPositionAddress && address) {
      console.log("Context. setting ADDRESS: ", address);
      setContx((prev) => {
        return { ...prev, curPositionAddress: address };
      });
    }
  }, [address]);

  const providerValue = useMemo(() => {
    let context = contx;
    let setContext = setContx;
    return { context, setContext };
  }, [contx, setContx]);

  const handleDrawerToggle = () => {
    if (!window.eventId) {
      setMobileOpen(!mobileOpen);
    }
  };

  const ListOfUrls = contx.success
    ? [
        "",
        "play",
        "create",
        "map",
        "about",
        "search",
        "privacy-policy",
        "signout",
        "user",
        "profile",
        "accept",
        "confirm",
      ]
    : [
        "",
        "play",
        "create",
        "map",
        "about",
        "search",
        "privacy-policy",
        "signin",
        "user",
        "signup",
        "accept",
        "confirm",
      ];

  // Just for DRAWER and NavigationHeader (UpperStripe)
  const ListOfNames = contx.success
    ? ["Charlie", "Join", "Create", "Map", "About", "Sign Out"]
    : ["Charlie", "Join", "Create", "Map", "About", "Sign In"];
  const ListOfComponents = contx.success
    ? [
        <Menu
          ListOfNames={ListOfNames}
          ListOfUrls={ListOfUrls}
          // finishedAnimation={finishedAnimation}
          // setFinishedAnimation={setFinishedAnimation}
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
          // finishedAnimation={finishedAnimation}
          // setFinishedAnimation={setFinishedAnimation}
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
        <SignUp />,
      ];

  const returnComponent = (index) => {
    return (
      <>
        <CssBaseline />
        {ListOfComponents[index]}
      </>
    );
  };

  useEffect(() => {
    console.log("App Location props rerendered: ", location);

    let firstPrint = false;
    let Modal = false;
    let justGoBack = false;
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
      console.log("FirstPrint : ", location.pathname.split("/"));
      if (location.pathname.split("/")[1] === "event") {
        window.eventId = location.pathname.split("/")[2];
      }
    }

    if (location && location.state && location.state.justGoBack == true) {
      justGoBack = true;
    }

    console.log(
      "Modal, justGoBack, firstPrint ",
      Modal,
      justGoBack,
      firstPrint
    );
    console.log(" PrevLocation, location ", prevLocation, location);

    setRouterState({
      Modal: Modal,
      justGoBack: justGoBack,
      firstPrint: firstPrint,
    });
  }, [location]);

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
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
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
          <InAppBrowserSnackbar />
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
                    // drawerWidth={drawerWidth}
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
                    // drawerWidth={drawerWidth}
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
                    // drawerWidth={drawerWidth}
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
                    // drawerWidth={drawerWidth}
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
                      {text != "play" && (
                        <UpperStripe
                          loading={loading}
                          userApp={contx}
                          ListOfNames={ListOfNames}
                          ListOfUrls={ListOfUrls}
                          handleDrawerToggle={handleDrawerToggle}
                          // drawerWidth={drawerWidth}
                        />
                      )}
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
                      // drawerWidth={drawerWidth}
                    />
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <Menu ListOfNames={ListOfNames} ListOfUrls={ListOfUrls} />
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
                      // drawerWidth={drawerWidth}
                    />
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      {contx.name ? (
                        <MapWrap
                          workingPosition={workingPosition}
                          setWorkingPosition={setWorkingPosition}
                        />
                      ) : (
                        <SignIn />
                      )}
                    </main>
                  </>
                )}
              />
              <Route
                exact
                path={`/create`}
                render={() => (
                  <>
                    <UpperStripe
                      loading={loading}
                      userApp={contx}
                      ListOfNames={ListOfNames}
                      ListOfUrls={ListOfUrls}
                      handleDrawerToggle={handleDrawerToggle}
                      // drawerWidth={drawerWidth}
                    />
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      {contx.name ? <Create /> : <SignIn />}
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
                    <RenderCounter />
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      {returnComponent(1)}
                    </main>
                    } )
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
                      // drawerWidth={drawerWidth}
                    />
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <AcceptPage />
                    </main>
                  </>
                )}
              />
              <Route
                exact
                path={`/confirm/:user_id`}
                render={() => (
                  <>
                    <UpperStripe
                      loading={loading}
                      userApp={contx}
                      ListOfNames={ListOfNames}
                      ListOfUrls={ListOfUrls}
                      handleDrawerToggle={handleDrawerToggle}
                      // drawerWidth={drawerWidth}
                    />
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <ConfirmUserPage />
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
                        // drawerWidth={drawerWidth}
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
                      // drawerWidth={drawerWidth}
                    />
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <Menu ListOfNames={ListOfNames} ListOfUrls={ListOfUrls} />
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
                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  <PlayOutside />
                </main>
              )}
            />
            <Route
              exact
              path={`/play`}
              render={() => (
                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  <Play />
                </main>
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
  ),
};

function AppWrap() {
  return (
    <Router>
      <Route component={(props2) => <App {...props2} />} />
    </Router>
  );
}

export default AppWrap;
