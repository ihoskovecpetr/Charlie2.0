import React, { useContext, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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
import Badge from "@material-ui/core/Badge";

import { useScrollY } from "../Hooks/useScrollY";

import { withRouter, useHistory } from "react-router-dom";

import { UserContext } from "src/userContext";
import { useCountUnseenBookingsRatings } from "src/Hooks/useCountUnseenBookingsRatings";

import Spinner from "./Spinner";
import CharlieLogo from "../Images/charlie-logo.png"


function UpperStripe(props) {
  const { context } = useContext(UserContext);
  let history = useHistory(); 
  const {displayPlay_memo} = useScrollY({y: 100})
  useCountUnseenBookingsRatings()

  const useStyles = makeStyles(theme => ({
    upperWrap: {
      position: "fixed",
      top: 0,
      width: "100vw"
    },
    containerMain: {
      paddingLeft: 5,
      paddingRight: 5,
      zIndex: 100,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    appBar: {
      position: "fixed",
      // width: "100%",
      // zIndex: 100,
      // marginLeft: props.drawerWidth,
      color: "black",
    },
    buttonToBeHidden: {
      [theme.breakpoints.down("xs")]: {
        width: `calc(100% - ${props.drawerWidth}px)`,
        display: "none",
        fontWeight: "400 !important"
      },
      fontWeight: "550 !important",
    },
    ButtonAvatar: {
      marginLeft: "10px",
      marginRight: "10px"
    },
    buttonNavi: {
      fontWeight: "600 !important",
      float: "right",
    },
    ellipsName: {
      maxWidth: 100,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: "center",
    },
    middle: {
      position: 'absolute',
      zIndex: 1,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  }));
  const classes = useStyles();

  const pathSet = props.location.pathname.split("/");
  const disabledFromOut = window.eventId ? true : false


  return (
    <>
    <CssBaseline />
      <AppBar 
              className={classes.appBar} 
              style={{
                backgroundColor: pathSet[1] === 'map' || displayPlay_memo ? "rgba(255,255,255,0.6)" : "transparent" ,
                boxShadow: !displayPlay_memo && "none"
                }}>
        <Container maxWidth="xl" className={classes.containerMain}>
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
                    disabled={disabledFromOut}
                    onClick={() => {history.push(`/${props.ListOfUrls[index]}`)}}
                  >
                       {text == "Charlie" ? (
                        <Avatar
                          className={classes.avatarCharlie}
                          alt="Remy Sharp"
                          src={CharlieLogo}
                        />
                      ) : (
                        text
                      )}
                    </Button>
                ))}
              </Typography>
            </Grid>
            <Grid item>
              {!props.userApp && context && context.name && (
                    <Button color="inherit" 
                            className={classes.buttonNavi} 
                            disabled={disabledFromOut}
                            onClick={() => history.push(`/profile`)}>
                      <p className={classes.ellipsName}>{context.name} X</p>
                      <Avatar
                        alt="Remy SharpXX"
                        src={context.picture}
                        className={classes.ButtonAvatar}
                      >
                        x
                      </Avatar>
                    </Button>
              )}

              {!props.userApp.success && !context.name && (
                <Badge
                  color="primary"
                  badgeContent={
                    <p style={{ margin: 0 }}>
                      <b>START HERE</b>
                    </p>
                  }
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                  }}
                >
                  <Button 
                      color="inherit" 
                      className={classes.buttonNavi}
                      disabled={disabledFromOut}
                      onClick={() => {history.push("/signin")}}>
                      SIGN IN
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
                </Badge>
              )}
              {props.userApp.success && (
                  <Button color="inherit" 
                          className={classes.buttonNavi}
                          disabled={disabledFromOut}
                          onClick={() => {history.push("/profile")}}>
                    
                    <p className={classes.ellipsName}>{props.userApp.name}</p>
                    <Badge
                        badgeContent={context.countUnseenBookings + context.countUnseenRatings} 
                        // className={classes.badge} 
                        color="secondary"
                        // style={{ backgroundColor: event.decided ? "grey" : "red"}}
                        >
                    <Avatar
                      alt="Remy Sharping"
                      src={props.userApp.picture}
                      className={classes.ButtonAvatar}
                    >
                      x
                    </Avatar>
                    </ Badge>
                  </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
        </Container>
      </AppBar>
      </>
  );
}

export default withRouter(UpperStripe);
