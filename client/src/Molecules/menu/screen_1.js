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

import FlippingLogo from "../../Atoms/Flipping-logo/logo";
import EmpireOriginal from "../../Images/empire.jpg";
import CharlieBlack from "../../Images/charlie_black.png";
import Skyline from "../../Images/skyline.png";
import Scroll from "../../Images/scroll.png";
import ScrollAnimated from "../../Atoms/ScrollAnimated";


export default function Screen1() {
  const classes = useStyles();
  const { xs_size_memo } = useXsSize();
  let history = useHistory();


  return (
    <div
      className="section s1"
      // style={{ backgroundImage: xs_size_memo ? `url(${CharlieHalf})` : `url(${EmpireOriginal})`}}
    >
      <Container maxWidth="lg" className={classes.container_1}>
        {
          //MainScreenMemo
        }
        <Grid container>
        <Grid item xs={4} sm={4} className={classes.quarter_grid}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.menuGrid_2}
            >
              <Grid item className={classes.menuGrid_2_item}>
                <Animated
                  animationIn="fadeIn"
                  animationOut="fadeOut"
                  animationInDelay={600}
                  animationInDuration={1000}
                  isVisible={true}
                >
                  <Avatar src={CharlieBlack} className={classes.charlieFace} id="drop_shadow"/>
                </Animated>
              </Grid>
            </Grid>
          </Grid>
          
          <Grid item xs={6} sm={8} className={classes.quarter_grid}>
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.menuGrid_1}
            >
                <Grid item>
                  <Typography
                        variant="subtitle1"
                        component="h6"
                        className={classes.letsParty}
                      >
                        Let's have a Party
                      </Typography>
                  </ Grid>
                  <Grid item xs={12}>
                  <Typography
                        variant="subtitle1"
                        component="h6"
                        className={classes.letsPartyDescription}
                      >
                        “Have you ever seen house on the beach or flat in a skyscraper and wonder how would it be to enjoy a drink in there?”                 
                        </Typography>
                  </ Grid>

                  <Grid item xs={12}>
                  <Animated
              animationIn="fadeIn"
              animationOut="fadeOut"
              animationInDelay={1000}
              animationInDuration={1000}
              isVisible={true}
            >
              <Grid
                container
                justify="center"
                direction="row"
                spacing={3}
                className={classes.menuGrid_3}
              >
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={clsx(classes.button, classes.link_main_pink)}
                      onClick={() => {history.push("/play")}}
                    >
                      JOIN
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      className={clsx(classes.button,classes.link_main_grey)}
                      onClick={() => {history.push("/create")}}
                    >
                      CREATE
                    </Button>
                  </Grid>
              </Grid>
            </Animated>
    
                  </ Grid>
              </Grid>
          </Grid>

          <Grid item xs={12} className={classes.scrollWrap}>
                <Grid container justify="center">
                   <Grid item>
                      {/* <img src={Scroll} className={classes.scrollAvatar}/> */}
                      <ScrollAnimated height={70} width={15} />
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
    //background: "rgba(25,25,25,0.3)"
    // backgroundImage: `url(${Skyline})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center bottom",
    marginTop: 60,
    marginBottom: 20,
    paddingTop: 60,
  },
  quarter_grid: {
  },
  quarter_grid_empty: {
    height: 0,
    display: "none",
    [theme.breakpoints.down("xs")]: {
      height: "20vh",
      display: "block"
    }
  },
  menuGrid_1: {
    height: "100%",
    width: "100%",
  },
  menuGrid_2: {
    height: "100%"
  },
  menuGrid_3: {
    marginTop: 30,
    marginBottom: 30,
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "0vh"
    }
  },
  animateButtons: {
    width: "100%"
  },
  menuGrid_4: {
    [theme.breakpoints.down("xs")]: {
      position: "relative",
      top: -30
    }
  },
  letsParty: {
    fontSize: 75,
    fontWeight: 900,
    color: "#837F7F",
    textAlign: "center"
  },
  letsPartyDescription: {
    fontSize: '0.9rem',
    fontWeight: 500,
    textAlign: "center"
  },
  charlieFace: {
    height: 200,
    width: 200,
    // filter: 'dropShadow(5px 5px 5px #222)'
  },
  link_main_pink: {
    width: "100%",
    boxShadow: "2px 4px 6px 0px black !important",
  },
  link_main_grey: {
    width: "100%",
    backgroundColor: "lightGrey",
    color: "black"
  },
  scrollWrap: {
    marginTop: 60,
    // transform: "rotate(180deg)", 
  },
  scrollAvatar: {
    height: 80,
  },
  menuGrid_2_item: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0
    }
  },
  button: {
    width: "100%",
    marginTop: 10,
    fontWeight: "600 !important",
    fontSize: 25,
    borderRadius: 30,
    padding: 5
  },
  text: {
    color: "black",
    fontWeight: 400,
    marginLeft: "30%",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0
    }
  }
}));
