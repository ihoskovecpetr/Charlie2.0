import React, { useState, useRef} from "react";
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
import HowItWorksItem from "../../Atoms/Menu/HowItWorksItem";

import ChoosePNG from "../../Images/HW_choose.png";
import CreatePNG from "../../Images/HW_create.png";
import PartyPNG from "../../Images/HW_party.png";

export default function ScreenHowItWorks() {
  const classes = useStyles();

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
            <HowItWorksItem 
                image={CreatePNG} 
                subtitle={"CREATE"} 
                text={"Have You ever done something unforgetable"} />
            <HowItWorksItem  
                image={ChoosePNG} 
                subtitle={"CHOOSE"} 
                text={"Have You ever done something unforgetable"} />
            <HowItWorksItem 
                image={PartyPNG} 
                subtitle={"PARTY"} 
                text={"Have You ever done something unforgetable"} />
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
  headingMain: {
    color: "black",
    fontWeight: 600,
    margin: 50,
    fontSize: 26,
    textAlign: "center",
    letterSpacing: 3
  },
  gridMainContainer:{
    paddingBottom: 20
  },

}));
