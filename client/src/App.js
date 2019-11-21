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

import { UserContext } from "./userContext";
import Menu from "./Pages/Menu";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import SignOut from "./Pages/SignOut";
import Create from "./Pages/Create";
import MapPage from "./Pages/MapPage";

const drawerWidth = 240;

function App(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { container } = props;
  const [user, setUser] = useState({
    success: false,
    name: "NO USER",
    email: "oh@chci.te",
    picture: "url to pics"
  });

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const ListOfUrls = user.success
    ? ["", "signout", "create", "map"]
    : ["", "signin", "create", "map", "signout"];
  const ListOfNames = user.success
    ? ["Charlie", "SignOut", "Create", "Map"]
    : ["Charlie", "SignIn", "Create", "Map"];
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
        <MapPage />
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

  const UpperStripe = props => {
    console.log(props);
    return (
      <>
        <CssBaseline />
        <AppBar position="fixed" color="secondary" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>

            {props.name}
          </Toolbar>
        </AppBar>
      </>
    );
  };

  const returnComponent = index => {
    return <div className="content_wrap">{ListOfComponents[index]}</div>;
  };

  return (
    <div className={classes.root}>
      <UserContext.Provider value={providerValue}>
        <Router>
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
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <Switch>
            {ListOfUrls.map((text, index) => (
              <Route
                exact
                path={`/${text}`}
                key={index}
                render={() => (
                  <>
                    <UpperStripe
                      name={`${ListOfNames[index]} -- ${user.name}`}
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
        </Router>
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
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    fontWeight: 700,
    fontSize: "20px"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    width: '100%'
    //padding: theme.spacing(3)
  }
}));

export default App;
