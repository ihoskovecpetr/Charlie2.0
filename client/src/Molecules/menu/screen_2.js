import React, { useState, useEffect, useContext, useMemo } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import { Animated } from "react-animated-css";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import "../../Pages/Menu.css";

import Spinner from "../../Atoms/Spinner";
import FlippingLogo from "../../Atoms/Flipping-logo/logo";
import EmpireOriginal from "../../Images/empire.jpg";
import Skyline from "../../Images/skyline.png";
import EventCard from "../../Molecules/event-card";

export default function Screen2() {
  const classes = useStyles();

  return (
    <div className="section s2">
      <Container maxWidth="sm" className={classes.container_2}>
        <Grid container id="s_2_id" style={{ display: "none" }}>
          <Grid item>
            <Animated
              animationIn="bounceInLeft"
              animationOut="fadeOut"
              animationInDelay={0}
              animationInDuration={1000}
              isVisible={true}
            >
              <Typography className={classes.defaultHeader}>
                MAIN <b>MISSION</b>
              </Typography>
            </Animated>
          </Grid>
          <Grid item>
            <Animated
              animationIn="bounceInRight"
              animationOut="fadeOut"
              animationInDelay={500}
              animationInDuration={1000}
              isVisible={true}
            >
              <Typography
                variant="subtitle2"
                className={classes.defaultContent}
              >
                Charlie is here to connect owners or renters of miscelanous
                places with guest for a joyfull evening
              </Typography>
            </Animated>
          </Grid>
        </Grid>
        <Grid container className={classes.defaultHeader}>
          <Grid item>
            <Typography className={classes.defaultHeader}>
              CHARLIE <b>INTRO</b>
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.containerIframe}>
          <Grid item className={classes.iFrame}>
            <iframe
              src="https://www.youtube.com/embed/PogfNxsugF0"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={classes.iFrame}
            ></iframe>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  container_2: {
    height: "100vh",
    color: "white",
    paddingTop: "12vh"
  },
  defaultHeader: {
    color: theme.palette.charliePink,
    fontWeight: 300,
    paddingTop: 20,
    fontSize: 20
  },
  defaultContent: {
    margin: 20,
    fontWeight: 500,
    fontSize: "1rem"
  },
  containerIframe: {
    width: "100%",
    height: "40vh"
  },
  iFrame: {
    width: "100%",
    height: "100%"
  }
}));
