import React, { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import { Route, NavLink } from "react-router-dom";
import { UserContext } from "../userContext";
import {useWindowWidth} from "../Hooks/useWindowWidth"

function UpperStripe(props) {
  const { user, setUser } = useContext(UserContext);
  const {width} = useWindowWidth()

  console.log("Upper STRIPE props: ", props);
  console.log("Upper STRIPE user ctx: ", user);
  const useStyles = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(2)
      // [theme.breakpoints.up("sm")]: {
      //   display: "none"
      // }
    },
    appBar: {
      //marginLeft: props.drawerWidth,
      // [theme.breakpoints.up("sm")]: {
      //   width: `calc(100% - ${props.drawerWidth}px)`
      // },
    },
    title: {
      flexGrow: 1
    }
  }));

  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" color="secondary" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          {props.ListOfNames.map((text, index) => (
            <Typography variant="h6" className={classes.title} key={text}>
              <NavLink to={`/${props.ListOfUrls[index]}`} key={index}>
                {text}
              </NavLink>
            </Typography>
          ))}

          <Typography variant="h6" className={classes.title}>
            {props.name}
          </Typography>

          {!props.userApp && user && user.name && (
            <>
              <Button color="inherit">{user.name}</Button>
              <Avatar alt="Remy Sharp" src={user.picture} />
            </>
          )}

          {!props.userApp.success && !user.name && (
            <Button color="inherit">
              <NavLink to={`/signin`}>Sign In {width}</NavLink>
            </Button>
          )}
          {props.userApp.success && (
            <>
              <Button color="inherit">{props.userApp.name}</Button>
              <Avatar alt="Remy Sharp" src={props.userApp.picture} />
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default UpperStripe;
