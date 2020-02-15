import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import CloseIcon from "@material-ui/icons/Close";

import { withRouter, useHistory } from "react-router-dom";

import { useScrollDisable } from "../Hooks/useScrollDisable";

function Layout(props) {
  useScrollDisable("layout_id");
  const classes = useStyles();

  return (
    <div id="layout_id">
      <div
        className={classes.opaque}
        onClick={
          () => {} //history.goBack()
        }
        onScroll={() => {
          console.log("'ONscroll event");
        }}
      >
        <div className={classes.modalWrap}>
          <CssBaseline />

          <Container maxWidth="xs">{props.children}</Container>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  opaque: {
    // flexGrow: 1,
    background: "rgba(96,3,40,0.4)",
    backgroundColor: "black",
    width: "100%",
    position: "absolute",
    "z-index": 20,
    top: 0,
    height: "100vh"
  },
  modalWrap: {
    padding: 0
  }
}));

export default withRouter(Layout);
