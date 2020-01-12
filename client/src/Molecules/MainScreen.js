import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import clsx from "clsx";

import BackgroundSmall from "../Images/empire_mobile.png";
import SunsetBig from "../Images/empire-wide.png";

function MainScreen(props) {
  useEffect(() => {
    const myVar = setTimeout(() => {
      document.getElementById("media_small").classList.add("move");
      props.setFinishedAnimation(true);
    }, 2000);

    console.log("rerender MainScreen");

    return () => {
      clearTimeout(myVar);
    };
  });

  console.log("rerender MainScreen AGAIN");

  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      direction="column"
      className={classes.main_animated_grid}
    >
      <CardMedia
        className={classes.media_big}
        image={SunsetBig}
        title="Paella dish"
      />
      <CardMedia
        className={clsx(
          classes.media_small,
          `${props.finishedAnimation ? "move" : " "}`
        )}
        image={BackgroundSmall}
        id="media_small"
        title="Paella dish"
      />
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  main_animated_grid: {
    backgroundColor: "red",
    height: "100vh",
    overflow: "hidden"
  },
  media_cards: {},
  media_big: {
    height: "100vh",
    transition: "1s", // 16:9
    transform: "translateY(-50px)",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  media_small: {
    transition: "1s",
    height: "100vh",
    backgroundColor: "skyblue",
    transform: "translateY(100vh)",
    //minHeight: 400,
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block"
    }
  }
}));

export default MainScreen;
