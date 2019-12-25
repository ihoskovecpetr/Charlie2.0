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
import Spinner from "./Spinner";

function UpperStripe(props) {
  const { user, setUser } = useContext(UserContext);

  console.log("Rendering UPPER STRIPE");

  const useStyles = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    appBar: {
      marginLeft: props.drawerWidth,
      color: "black",
      background: "white"
      // [theme.breakpoints.up("sm")]: {
      //   width: `calc(100% - ${props.drawerWidth}px)`
      // }
    },
    buttonToBeHidden: {
      [theme.breakpoints.down("xs")]: {
        width: `calc(100% - ${props.drawerWidth}px)`,
        display: "none",
        fontWeight: "400 !important"
      }
    },
    title: {
      flexGrow: 1,
      fontWeight: "550 !important"
      //fontSize: 20
    },
    ButtonAvatar: {
      marginLeft: "10px",
      marginRight: "10px"
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
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid
            justify="space-between" // Add it here :)
            alignItems="center"
            container
            spacing={0}
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
              <Typography variant="h5">
                {props.ListOfNames.map((text, index) => (
                  <Button
                    color="inherit"
                    className={classes.buttonToBeHidden}
                    key={index}
                  >
                    <NavLink
                      to={`/${props.ListOfUrls[index]}`}
                      className={classes.title}
                    >
                      {text == "Charlie" ? (
                        <Avatar
                          className={classes.avatarCharlie}
                          alt="Remy Sharp"
                          src="https://res.cloudinary.com/party-images-app/image/upload/v1557794256/ojkgl1hkiljwij69njbb.png"
                        />
                      ) : (
                        text
                      )}
                    </NavLink>
                  </Button>
                ))}
              </Typography>
            </Grid>
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
                  <NavLink to={`/signin`}>Sign In </NavLink>
                  {props.loading ? (
                    <div className={classes.ButtonAvatar}>
                      <Spinner height={30} width={30} />
                    </div>
                  ) : (
                    <div className={classes.ButtonAvatar}>
                      <AccountCircleIcon color="disabled" fontSize="large" />
                    </div>
                  )}
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
