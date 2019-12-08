import React, { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { Route, NavLink } from "react-router-dom";
import { UserContext } from "../userContext";
import { useWindowWidth } from "../Hooks/useWindowWidth";

function UpperStripe(props) {
  const { user, setUser } = useContext(UserContext);

  const useStyles = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    appBar: {
      marginLeft: props.drawerWidth
      // [theme.breakpoints.up("sm")]: {
      //   width: `calc(100% - ${props.drawerWidth}px)`
      // }
    },
    buttonToBeHidden: {
      [theme.breakpoints.down("xs")]: {
        width: `calc(100% - ${props.drawerWidth}px)`,
        display: "none",
        fontWeight: "700 !important"
      }
    },
    title: {
      flexGrow: 1,
      fontWeight: "700 !important",
      fontSize: 20
    },
    ButtonAvatar: {
      margin: "10px"
    },
    buttonNavi: {
      fontWeight: "600 !important",
      float: "right"
    }
  }));

  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" color="secondary" className={classes.appBar}>
        <Toolbar>
          <Grid
            justify="space-between" // Add it here :)
            alignItems="center"
            container
            spacing={24}
          >
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={props.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">
                {props.ListOfNames.map((text, index) => (
                  <Button color="inherit" className={classes.buttonToBeHidden}>
                    <NavLink
                      to={`/${props.ListOfUrls[index]}`}
                      key={index}
                      className={classes.title}
                    >
                      {text}
                    </NavLink>
                  </Button>
                ))}
              </Typography>
            </Grid>
            {/* <Typography variant="h6" className={classes.title}>
            {props.name}
          </Typography> */}
            <Grid item>
              {!props.userApp && user && user.name && (
                <>
                  <NavLink to={`/profile`}>
                    <Button color="inherit" className={classes.buttonNavi}>
                      {user.name}
                      <Avatar
                        alt="Remy Sharp"
                        src={user.picture}
                        className={classes.ButtonAvatar}
                      >
                        x
                      </Avatar>
                    </Button>
                  </NavLink>
                </>
              )}

              {!props.userApp.success && !user.name && (
                <Button color="inherit" className={classes.buttonNavi}>
                  <NavLink to={`/signin`}>Sign In : </NavLink>
                  <AccountCircleIcon color="disabled" fontSize="large" />
                </Button>
              )}
              {props.userApp.success && (
                <NavLink to={`/profile`}>
                  <Button color="inherit" className={classes.buttonNavi}>
                    {props.userApp.name}
                    <Avatar
                      alt="Remy Sharp"
                      src={props.userApp.picture}
                      className={classes.ButtonAvatar}
                    >
                      x
                    </Avatar>
                  </Button>
                </NavLink>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default UpperStripe;