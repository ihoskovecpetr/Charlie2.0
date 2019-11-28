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
      background: "rgba(100,10,10,0.2)",
      width: "100%",
      position: "absolute",
      "z-index": 10
    },
    container: {
      height: "100vh"
    },
    root: {
      padding: theme.spacing(3, 2)
    }
  }));
  const classes = useStyles();

  return (
    <div className={classes.opaque}>
      <Container maxWidth="lg" fixed={true}>
        <CssBaseline />
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.container}
        >
          <Paper className={classes.root}>{props.children}</Paper>
        </Grid>
      </Container>
    </div>
  );
}

export default Layout;
