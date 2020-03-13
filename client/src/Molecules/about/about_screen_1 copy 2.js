import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

// import "../../Pages/Menu.css";

import { Animated } from "react-animated-css";


export default function AboutScreen1() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.aboutContainer}>
    <Grid container>
      <Grid item>
        <Typography
          variant="h5"
          component="h5"
          className={classes.defaultHeader}
        >
          MAIN <b>MISSION</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.basicPaper}>
          <Typography component="p">
            Have you ever seen house on the beach or flat in a
            skyscraper and wonder how would it be to enjoy a drink
            in there? Then this is your chance, dont go to that
            same old bar you know already good enought, just have
            a look and join some event in your neighbourhood.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </Container>
  );
}

const useStyles = makeStyles(theme => ({
  XXX: {
    height: "100vh",
    color: "black",
    paddingTop: "12vh"
  },

}));
