import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import CloseIcon from "@material-ui/icons/Close";

import { withRouter, useHistory } from "react-router-dom";

import { useWindowSize } from "../Hooks/useWindowSize";


function Layout(props) {

  const classes = useStyles();
  const windowSize = useWindowSize();


  return (
      <div
        className={classes.modalBackdrop}
        style={{ height: windowSize.height }}
      >
        <div className={classes.modalWrap}>
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
                  console.log("CLOSEEEEE MODALLL")
                  if(window.eventId){
                    console.log("ELSAAAAAAA")
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
        </div>
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
    top: "10vh",
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
