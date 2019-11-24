import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import {
  Switch,
  Route,
  NavLink,
  BrowserRouter as Router
} from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
//import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import { useMutation, useQuery, useApolloClient } from "@apollo/react-hooks";

import UpperStripe from "./Atoms/Upper-stripe";

import { UserContext } from "./userContext";
import Menu from "./Pages/Menu";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import SignOut from "./Pages/SignOut";
import Create from "./Pages/Create";
import MapPage from "./Pages/MapPage";
import Event from "./Pages/Event";

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
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const { loading, error, data } = useQuery(LOGIN);
  const { container } = props;
  const [user, setUser] = useState({
    success: false,
    name: false
  });

  console.log("dataUser: ", data);

  if (data) {
    console.log("DATA User Logged In:", data);
    if (data.getLoggedInUser.success && user.success == false) {
      console.log("SUCCESS frm TOKEN");
      setUser({
        _id: data.getLoggedInUser._id,
        success: data.getLoggedInUser.success,
        name: data.getLoggedInUser.name,
        email: data.getLoggedInUser.email,
        picture: data.getLoggedInUser.picture
      });
    }
  }

  console.log("App props START: props user ", props, user);

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    // Update the document title using the browser API
    prevLocation = props.location;
    console.log("First Print Event: props: ", props);
  }, []);

  const ListOfUrls = user.success
    ? ["", "signout", "create", "map"]
    : ["", "signin", "create", "map", "signout", "event"];
  const ListOfNames = user.success
    ? ["Charlie", "SignOut", "Create", "Map"]
    : ["Charlie", "Sign In", "Create", "Map", "Sign Out"];
  const ListOfComponents = user.success
    ? [
        <Menu ListOfNames={ListOfNames} ListOfUrls={ListOfUrls} />,
        <SignOut />,
        <Create />, //create
        <MapPage /> //Map
      ]
    : [
        <Menu ListOfNames={ListOfNames} ListOfUrls={ListOfUrls} />,
        <SignIn />,
        <Create />,
        <MapPage />,
        <SignOut />,
        <Event />
      ];
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {ListOfNames.map((text, index) => (
          <NavLink to={`/${ListOfUrls[index]}`} key={index}>
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
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

  if (pathSet[1] == "event") {
    Modal = true;
  }
  if (pathSet[1] == "user") {
    Modal = true;
  }
  if (pathSet[1] == "signin") {
    Modal = true;
  }
  if (pathSet[1] == "signout") {
    Modal = true;
  }

  if (!Modal) {
    console.log("PREV LOC SET");
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

  console.log("APP, firstPrint a Modal: ", firstPrint, Modal);
  return (
    <div className={classes.root}>
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
              path={`/signin`}
              render={() => (
                <>
                  <UpperStripe
                    //bringOwnUser?? true??
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
            </Switch>
          </>
        )}
        {!Modal && (
          <Switch location={prevLocation}>
            {ListOfUrls.map((text, index) => (
              <Route
                exact
                path={`/${text}`}
                key={index}
                render={() => (
                  <>
                    <UpperStripe
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
          </Switch>
        )}
      </UserContext.Provider>
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
