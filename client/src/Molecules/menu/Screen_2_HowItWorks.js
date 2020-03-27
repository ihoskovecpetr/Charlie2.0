import React, { useState, useEffect, useContext, useMemo } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import { NavLink, useHistory } from "react-router-dom";
import { Animated } from "react-animated-css";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

import "../../Pages/Menu.css";

import { useXsSize } from "../../Hooks/useXsSize";

import ChoosePNG from "../../Images/HW_choose.png";
import CreatePNG from "../../Images/HW_create.png";
import PartyPNG from "../../Images/HW_party.png";

export default function ScreenHowItWorks() {
  const classes = useStyles();
  const { xs_size_memo } = useXsSize();
  let history = useHistory();


  return (
    <div
      className="section s1b"
      // style={{ backgroundImage: xs_size_memo ? `url(${CharlieHalf})` : `url(${EmpireOriginal})`}}
    >
      <Container maxWidth="xl" className={classes.container_1}>
        {
          //MainScreenMemo
        }
        <Grid container className={classes.gridMainContainer}>
        <Grid item xs={12}>
          <Typography variant="h3" component="p" className={classes.headingMain}>
            HOW DOES IT WORK?
          </Typography>
        </Grid>
        <Grid item sm={4} xs={12} className={classes.mainItem}>
          <Grid container alignItems="center" direction="column">
            <Grid item>
                <img src={CreatePNG} className={classes.hwIcon}/>

          </Grid>
          <Grid item>
                <Typography variant="subtitle1" className={classes.subtitle}>
                  CREATE
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" component="p" className={classes.text}>
                “Have you ever seen house on the beach or flat in"
                </Typography>
            </Grid>
        </Grid>
       </Grid>
       <Grid item sm={4} xs={12} className={classes.mainItem}>
        <Grid container alignItems="center" direction="column">
        <Grid item>
            <img src={ChoosePNG} className={classes.hwIcon}/>

       </Grid>
       <Grid item>
            <Typography variant="subtitle1" className={classes.subtitle}>
              CHOOSE
            </Typography>
        </Grid>
        <Grid item>
            <Typography variant="body1" component="p" className={classes.text}>
            “Have you ever seen house on the beach or flat in"
            </Typography>
        </Grid>
       </Grid>
  
        </Grid>
        <Grid item sm={4} xs={12} className={classes.mainItem}>
        <Grid container alignItems="center" direction="column">
        <Grid item>
            <img src={PartyPNG} className={classes.hwIcon}/>

       </Grid>
       <Grid item>
            <Typography variant="subtitle1" className={classes.subtitle}>
              PARTY
            </Typography>
        </Grid>
        <Grid item>
            <Typography variant="body1" component="p" className={classes.text}>
            “Have you ever seen house on the beach or flat in"
            </Typography>
        </Grid>
       </Grid>
       </Grid>
       </Grid>
      </Container>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  container_1: {
    // height: "100vh",
    color: "black",
    background: "rgba(255,255,255,1)",
  },
  gridMainContainer:{
    paddingBottom: 20
  },
  mainItem: {
    padding: 10
  },
  headingMain: {
    color: "black",
    fontWeight: 600,
    margin: 50,
    fontSize: 26,
    textAlign: "center",
    letterSpacing: 3
  },
  hwIcon: {
    height: 90,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 500,
    margin: 10,
    color: theme.palette.charliePink
  },
  text: {
    fontSize: 18,
    fontWeight: 500,
    margin: 10,
    textAlign: "center"
  },

}));
