import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import CloseIcon from "@material-ui/icons/Close";

import { withRouter, useHistory } from "react-router-dom";
import {useSpring, animated} from 'react-spring'


function Layout(props) {

  const classes = useStyles();
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const swingIn = useSpring({transform: "scale(1)", opacity: 1, from: {opacity: 0, transform: "scale(0.8)"}})

  useEffect(() => {

    setWindowHeight(window.innerHeight)
  }, [])

  useEffect(() => {

    setWindowHeight(window.innerHeight)
   if(document.getElementById("menu_wrap")){
     document.getElementById("menu_wrap").style.position = "fixed"
   } 

   if(document.getElementById("profile_wrap")){
    document.getElementById("profile_wrap").style.position = "fixed"
  } 

  return () => {
    if(document.getElementById("profile_wrap")){
      document.getElementById("profile_wrap").style.position = "absolute"
    } 
    if(document.getElementById("menu_wrap")){
      document.getElementById("menu_wrap").style.position = "absolute"
    } 
  };

}, []);

  return (
      <div
        className={classes.modalBackdrop}
        style={{ height: windowHeight}}
      >
        <animated.div className={classes.modalWrap} style={swingIn}>
          <CssBaseline />
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            alignContent="flex-start"
            direction="column"
            spacing={2}
            className={classes.gridClose}
          >
            <Grid item>
              <Button
                variant="contained"
                //color={theme.background}
                size="small"
                className={classes.closeButton}
                onClick={() => {
                  if(window.eventId){
                    window.eventId = null
                    props.history.push("/");
                  }else{
                    props.history.goBack();
                  }
                  
                }}
              >
                <CloseIcon fontSize="large" />
              </Button>
            </Grid>
          </Grid>
          <Container maxWidth="xs">{props.children}</Container>
        </animated.div>
      </div>
  );
}

const useStyles = makeStyles(theme => ({
  modalBackdrop: {
    // flexGrow: 1,
    background: "rgba(96,3,40,0.4)",
    width: "100%",
    position: "fixed",
    "z-index": 20,
    top: 0,
  },
  modalWrap: {
    padding: 0
  },
  gridClose: {
    position: "absolute",
    top: "0vh",
    height: 0,
    color: "white",
    margin: "0 !important",
    padding: 0,
    width: "100%"
  },
  closeButton: {
    background: theme.palette.violetova,
    color: "white"
  }
}));

export default withRouter(Layout);
