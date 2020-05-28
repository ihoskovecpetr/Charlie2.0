import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

// import "../../Pages/Menu.css";

import { Animated } from "react-animated-css";


export default function AboutScreen2() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.aboutContainer}>
    <Grid container>
      <Grid item>
        <Typography
          variant="h6"
          component="h6"
          className={classes.defaultHeader}
        >
          <b>F.A.Q.</b>
        </Typography>
      </Grid>
      <Grid item>
        <Paper className={classes.basicPaper}>
          <Typography variant="h6" component="h6">
            How to start?
          </Typography>
          <Typography component="p">
            Go to create section of Charlie, fill up short form with
            all the important questinos and press PREVIEW > Confirm,
            you will get notification on your email anytime you
            gained some guest. Easy!
          </Typography>
        </Paper>
        <Paper className={classes.basicPaper}>
          <Typography variant="h6" component="h6">
            How to colect the admission fee?
          </Typography>
          <Typography component="p">
            At this stage of Charlie development you will collect
            fee from your guests by yourself.
          </Typography>
        </Paper>

        <Paper className={classes.basicPaper}>
          <Typography variant="h6" component="h6">
            Is my place good enought to host Charlie event?
          </Typography>
          <Typography component="p">
            It is only up to you how much time/efford/money will you
            invest into creating event or improving your place and
            how much you want to earn per each guest.. only guests
            will decide :){" "}
          </Typography>
        </Paper>
        <Paper className={classes.basicPaper}>
          <Typography component="p">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></Typography>
          <Typography component="p">Icons made by <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26">Icongeek26</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></Typography>
        </Paper>
      </Grid>
    </Grid>
  </Container>
  );
}

const useStyles = makeStyles(theme => ({


}));
