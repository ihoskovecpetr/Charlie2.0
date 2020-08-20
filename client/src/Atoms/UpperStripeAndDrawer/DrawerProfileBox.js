import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useCountUnseenBookingsRatings } from "src/Hooks/useCountUnseenBookingsRatings";

import { NavLink, useHistory } from "react-router-dom";

import { UserContext } from "src/Contexts/userContext";

const useStyles = makeStyles(theme => ({
  blackBox: {
    width: "100%",
    height: 160,
    backgroundColor: "#E8045D",
    color: "white",
  },
  topPart: {
    height: 40,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  middlePart: {
    width: "100%",
    height: 100,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  bottomPart: {
    width: "100%",
    height: 60,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  avatar: {
    height: 80,
    width: 80,
  },
  actBtns: {
    marginRight: 4,
  },
  chipOutline: {
    // borderBottom: "1px solid white",
    margin: 5,
  },
}));

export default function DrawerProfileBox({ handleDrawerToggle }) {
  const classes = useStyles();
  const { context, setContext } = useContext(UserContext);
  let history = useHistory();
  const {
    countHostBookings,
    countUserBookings,
    countRatings,
  } = useCountUnseenBookingsRatings();

  const Out = () => {
    context.deleteToken();
    context.getLoggedInUser();
    handleDrawerToggle();
  };

  const SignIn = () => {
    history.push({
      pathname: history.location.pathname,
      search: `?signin=true`,
    });
    handleDrawerToggle();
  };

  return (
    <Grid container className={classes.blackBox}>
      <Grid item xs={12}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.middlePart}
        >
          <Grid item onClick={handleDrawerToggle}>
            <Badge
              badgeContent={
                countHostBookings + countUserBookings + countRatings
              }
              color="secondary"
            >
              <NavLink to={`/profile`}>
                <Avatar className={classes.avatar} src={context.picture}>
                  <AccountCircleIcon fontSize="large" onClick={SignIn} />
                </Avatar>
              </NavLink>
            </Badge>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.bottomPart}
        >
          {context.name && (
            <>
              <Grid
                item
                className={classes.actBtns}
                onClick={handleDrawerToggle}
              >
                {/* <Badge badgeContent={countHostBookings + countUserBookings + countRatings} 
                    color="secondary">
                <NavLink to={`/profile`}>
                        <Typography component="p">
                            PROFILE INFO
                        </Typography>
                </NavLink>
            </Badge> */}
              </Grid>
              <Grid item onClick={Out}>
                <Button
                  className={classes.chipOutline}
                  startIcon={
                    <ExitToAppIcon
                      fontSize="small"
                      style={{ color: "white" }}
                    />
                  }
                  label="SIGN OUT"
                  // color="secondary"
                  style={{ color: "white", borderColor: "white" }}
                  variant="outlined"
                >
                  {" "}
                  SIGN OUT{" "}
                </Button>
              </Grid>
            </>
          )}
          {!context.name && (
            <Grid item onClick={SignIn}>
              <Button
                className={classes.chipOutline}
                startIcon={
                  <ExitToAppIcon fontSize="small" style={{ color: "white" }} />
                }
                // color="secondary"
                style={{ color: "white", borderColor: "white" }}
                variant="outlined"
              >
                {" "}
                SIGN IN
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
