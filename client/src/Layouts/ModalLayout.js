import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import CloseIcon from "@material-ui/icons/Close";

import { UserContext } from "src/Contexts/userContext";
import { useHistory } from "react-router-dom";
import { useSpring, animated } from "react-spring";

// import { useScrollDisable } from "../Hooks/useScrollDisable";

function Layout(props) {
  const classes = useStyles();
  let history = useHistory();
  const { context, setContext } = useContext(UserContext);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const swingIn = useSpring({
    transform: "scale(1)",
    opacity: 1,
    from: { opacity: 0, transform: "scale(0.8)" },
  });
  // useScrollDisable();

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    if (document.getElementById("menu_wrap")) {
      document.getElementById("menu_wrap").style.position = "fixed";
    }

    if (document.getElementById("profile_wrap")) {
      document.getElementById("profile_wrap").style.position = "fixed";
    }

    return () => {
      if (document.getElementById("profile_wrap")) {
        document.getElementById("profile_wrap").style.position = "absolute";
      }
      if (document.getElementById("menu_wrap")) {
        document.getElementById("menu_wrap").style.position = "absolute";
      }
    };
  }, []);

  return (
    <div className={classes.modalBackdrop} style={{ height: windowHeight }}>
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
              if (window.eventId) {
                // window.eventId = null;
                history.push({
                  pathname: "/",
                  customNameData: { D: "s" },
                });
              } else {
                history.goBack();
              }
            }}
          >
            <CloseIcon fontSize="large" />
          </Button>
        </Grid>
      </Grid>
      <animated.div className={classes.modalContentWrap} style={swingIn}>
        <Container
          maxWidth="xs"
          id="signInCont"
          className={classes.containerMain}
        >
          {props.children}
        </Container>
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
  modalContentWrap: {
    padding: 0,
  },
  containerMain: {
    padding: 0,
  },
  gridClose: {
    position: "absolute",
    top: "10vh",
    height: 0,
    color: "white",
    margin: "0 !important",
    padding: 0,
    "z-index": 30,
    width: "100%",
  },
  closeButton: {
    background: theme.palette.violetova,
    color: "white",
  },
}));

export default Layout;
