import React, { useState, useRef } from "react";
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

import GoToPNG from "../../Images/HW_go_next.png";
import ChooseWhitePNG from "../../Images/HW_choose_white.png";
import QRcodePNG from "../../Images/HW_qr-code.png";

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
            <Typography
              variant="h3"
              component="p"
              className={classes.headingMain}
            >
              HOW TO JOIN SOME EVENT?
            </Typography>
          </Grid>
          <HowItWorksItem
            image={GoToPNG}
            location={"play"}
            subtitle={"GO TO JOIN or MAP"}
            text={"Go to join or Map section of this website"}
          />

          <HowItWorksItem
            image={ChooseWhitePNG}
            location={"play"}
            subtitle={"CHOOSE EVENT"}
            text={"Choose event you would like to join"}
          />

          <HowItWorksItem
            image={QRcodePNG}
            // location={"create"}
            subtitle={"RECEIVE EMAIL"}
            text={
              "If you got confirmed, you will receive Email with Ticket in the attachment"
            }
          />
        </Grid>
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container_1: {
    // height: "100vh",
    color: "lightGrey",
    background: "black",
  },
  headingMain: {
    // color: "black",
    fontWeight: 600,
    margin: 50,
    fontSize: 26,
    textAlign: "center",
    letterSpacing: 3,
  },
  gridMainContainer: {
    paddingBottom: 20,
  },
}));
