import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Badge from "@material-ui/core/Badge";

import { useScrollY } from "../Hooks/useScrollY";

import { withRouter, useHistory } from "react-router-dom";
import clsx from "clsx";

import { UserContext } from "src/Contexts/userContext";
import { useCountUnseenBookingsRatings } from "src/Hooks/useCountUnseenBookingsRatings";

import Spinner from "./Spinner";
import CharlieLogo from "src/Images/charlie-logo.png";
import SearchInput from "src/Atoms/UpperStripeAndDrawer/SearchInput";

let renderCounter = 0;

function UpperStripe({
  //drawerWidth,
  location,
  handleDrawerToggle,
  ListOfNames,
  ListOfUrls,
  userApp,
  loading,
}) {
  const { context } = useContext(UserContext);
  let history = useHistory();
  const { displayPlay_memo } = useScrollY({ y: 10 });
  const {
    countHostBookings,
    countUserBookings,
    countRatings,
  } = useCountUnseenBookingsRatings();

  renderCounter = renderCounter + 1;
  console.log("Upper Stripe re render", renderCounter);

  const classes = useStyles();

  const pathSet = location.pathname.split("/");
  const disabledFromOut = false; // window.eventId ? true : false;

  return (
    <>
      <CssBaseline />
      <AppBar
        className={classes.appBar}
        style={{
          backgroundColor:
            pathSet[1] === "map" || pathSet[1] === "profile" || displayPlay_memo
              ? "rgba(255,255,255,0.6)"
              : "transparent",
          boxShadow: !displayPlay_memo && "none",
        }}
      >
        <Container maxWidth="xl" className={classes.containerMain}>
          <Toolbar>
            <Grid
              justify="space-between" // Add it here :)
              alignItems="center"
              container
            >
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
                <Grid container alignItems="center">
                  {ListOfNames.map((text, index) => (
                    <Grid item>
                      <Button
                        color="inherit"
                        className={classes.buttonToBeHidden}
                        disabled={disabledFromOut}
                        onClick={() => {
                          history.push(`/${ListOfUrls[index]}`);
                        }}
                      >
                        {text != "Charlie" && <>{text}</>}
                        {text == "Charlie" && (
                          <Avatar
                            className={classes.avatarCharlie}
                            alt="Remy Sharp"
                            src={CharlieLogo}
                          />
                        )}
                      </Button>
                    </Grid>
                  ))}
                  <Grid item>
                    <Button
                      color="inherit"
                      className={clsx(
                        classes.buttonToBeHidden,
                        classes.showSmall
                      )}
                      disabled={disabledFromOut}
                      onClick={() => {
                        history.push(`/search`);
                      }}
                    >
                      SEARCH
                    </Button>
                  </Grid>
                  <Grid item className={classes.hideSmall}>
                    <div className={classes.buttonToBeHidden}>
                      <SearchInput />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {!userApp && context && context.name && (
                  <Button
                    color="inherit"
                    className={classes.buttonNavi}
                    disabled={disabledFromOut}
                    onClick={() => history.push(`/profile`)}
                  >
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

                {!userApp.success && !context.name && (
                  <Badge
                    color="primary"
                    badgeContent={
                      <p style={{ margin: 0 }}>
                        <b>START HERE</b>
                      </p>
                    }
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Button
                      color="inherit"
                      className={classes.buttonNavi}
                      disabled={disabledFromOut}
                      onClick={() => {
                        history.push("/signin");
                      }}
                    >
                      SIGN IN
                      {loading ? (
                        <div className={classes.ButtonAvatar}>
                          <Spinner height={30} width={30} />
                        </div>
                      ) : (
                        <div className={classes.ButtonAvatar}>
                          <AccountCircle color="disabled" fontSize="large" />
                        </div>
                      )}
                    </Button>
                  </Badge>
                )}
                {userApp.success && (
                  <Button
                    color="inherit"
                    className={classes.buttonNavi}
                    disabled={disabledFromOut}
                    onClick={() => {
                      history.push("/profile");
                    }}
                  >
                    <p className={classes.ellipsName}>{userApp.name}</p>
                    <Badge
                      badgeContent={
                        countHostBookings + countUserBookings + countRatings
                      }
                      // className={classes.badge}
                      color="secondary"
                      // style={{ backgroundColor: event.decided ? "grey" : "red"}}
                    >
                      <Avatar
                        alt="Remy Sharping"
                        src={userApp.picture}
                        className={classes.ButtonAvatar}
                      >
                        x
                      </Avatar>
                    </Badge>
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

const useStyles = makeStyles((theme) => ({
  upperWrap: {
    position: "fixed",
    top: 0,
    width: "100vw",
  },
  containerMain: {
    paddingLeft: 5,
    paddingRight: 5,
    zIndex: 100,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  hideSmall: {
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  showSmall: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  appBar: {
    position: "fixed",
    // width: "100%",
    // zIndex: 100,
    // marginLeft: drawerWidth,
    color: "black",
  },
  buttonToBeHidden: {
    [theme.breakpoints.down("xs")]: {
      // width: `calc(100% - ${drawerWidth}px)`,
      display: "none",
      // fontWeight: "400 !important",
    },
    fontWeight: "550 !important",
  },
  ButtonAvatar: {
    marginLeft: "10px",
    marginRight: "10px",
  },
  buttonNavi: {
    fontWeight: "600 !important",
    float: "right",
  },
  ellipsName: {
    maxWidth: 100,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
  },
  middle: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
}));

export default withRouter(UpperStripe);
