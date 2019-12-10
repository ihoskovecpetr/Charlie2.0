import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";

function Layout(props) {
  const useStyles = makeStyles(theme => ({
    opaque: {
      // flexGrow: 1,
      //background: "rgba(200,210,210,0.4)",
      width: "100%",
      position: "absolute",
      "z-index": 10,
      top: 0,
      height: "100vh"
    },
    gridContainer: {
      marginTop: "3vh",
      padding: 20
      // height: "100vh"
    }
  }));
  const classes = useStyles();

  return (
    <div className={classes.opaque}>
      <Container maxWidth="xs" fixed={true}>
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

export default Layout;
