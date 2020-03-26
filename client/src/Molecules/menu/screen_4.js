import React, { useState, useEffect, useContext, useMemo } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExploreIcon from "@material-ui/icons/Explore";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";

import { Animated } from "react-animated-css";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import "../../Pages/Menu.css";

export default function Screen4(props) {
  const classes = useStyles();

  return (
    <div className="section s4">
      <Container maxWidth="sm" className={classes.container_4} id="s_4_id" 
      // style={{ display: "none" }}
      >
        <Grid container className={classes.header_be_gone}>
          <Grid item >
            <Animated
              animationIn="bounceInLeft"
              animationOut="fadeOut"
              animationInDelay={0}
              animationInDuration={1000}
              isVisible={true}
            >
              <Typography className={classes.defaultHeader}>
                SUMMMARY OF <b>KEY FEATURES</b>
              </Typography>
            </Animated>
          </Grid>
        </Grid>
        <Animated
              animationIn="fadeIn"
              animationOut="fadeOut"
              animationInDelay={500}
              animationInDuration={1000}
              isVisible={true}
            >
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.blackContainer}
        >
          <Grid item xs={4}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={props.handleDrawerToggle}
              className={classes.menuButton}
            >
              <ExploreIcon fontSize="large" color="secondary" />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5" gutterBottom>
              DISCOVER
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Find your favourite event and enjoy evening
            </Typography>
            <ul>
              <li>
                <Typography variant="body1" gutterBottom>
                  JOIN event
                </Typography>
              </li>
              <li>
                <Typography variant="body1" gutterBottom>
                  Bring your own drinks
                </Typography>
              </li>
              <li>
                <Typography variant="body1" gutterBottom>
                  ENJOY evening
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
        </Animated>
        <Animated
              animationIn="fadeIn"
              animationOut="fadeOut"
              animationInDelay={700}
              animationInDuration={1000}
              isVisible={true}
            >
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.blackContainer}
          style={{ fontSize: "16px" }}
        >
          <Grid item xs={4}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={props.handleDrawerToggle}
              className={classes.menuButton}
            >
              <AccessibilityNewIcon fontSize="large" color="secondary" />
            </IconButton>
          </Grid>

          <Grid item xs={8}>
            <Typography variant="h5" gutterBottom style={{ fontSize: "1.2em" }}>
              CREATE
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Create your first CHARLIE event and start earning
            </Typography>

            <ul>
              <li>
                <Typography variant="body1" gutterBottom>
                  CREATE event
                </Typography>
              </li>
              <li>
                <Typography variant="body1" gutterBottom>
                  Welcomme guests
                </Typography>
              </li>
              <li>
                <Typography variant="body1" gutterBottom>
                  EARN entry fee
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
        </Animated>
      </Container>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  container_4: {
    color: "black",
    paddingTop: 80,
    paddingBottom: 80
  },
  header_be_gone: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  defaultHeader: {
    color: theme.palette.charliePink,
    fontWeight: 300,
    margin: 10,
    fontSize: 20
  },
  containerIframe: {
    width: "100%"
  },
  iFrame: {
    width: "100%",
    height: 250
  },
  blackContainer: {
    background: theme.palette.darkGrey,
    color: "white",
    padding: 10,
    marginBottom: 20
  }
}));
