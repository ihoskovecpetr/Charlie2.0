import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";

import { withRouter, useHistory } from "react-router-dom";

function Layout(props) {
  let history = useHistory();

  const classes = useStyles();

  return (
    <div
      className={classes.opaque}
      onClick={
        () => {} //history.goBack()
      }
    >
      <Container maxWidth="md" fixed={true} className={classes.container}>
        <CssBaseline />
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.gridContainer}
        >
          {props.children}
        </Grid>
      </Container>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  opaque: {
    // flexGrow: 1,
    background: "rgba(96,3,40,0.4)",
    width: "100%",
    position: "absolute",
    "z-index": 20,
    top: 0,
    height: "100vh"
  },
  container: {
    padding: 0
  },
  gridContainer: {
    //marginTop: "3vh"
    //padding: 20
    // height: "100vh"
  }
}));

export default withRouter(Layout);
