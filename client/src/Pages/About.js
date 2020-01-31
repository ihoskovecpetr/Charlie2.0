import React from "react";
import ReactDOM from "react-dom";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

//import "fullpage.js/vendors/scrolloverflow"; // Optional. When using scrollOverflow:true
import ReactFullpage from "@fullpage/react-fullpage";
import "./index.css";

const fullpageOptions = {
  anchors: ["firstPage", "secondPage", "thirdPage"],
  sectionsColor: ["#282c34", "#ff5f45", "#0798ec"],
  callbacks: ["onLeave"],
  scrollOverflow: true
};

const useStyles = makeStyles(theme => ({
  aboutContainer: {
    flexGrow: 1,
    paddingTop: 20
  },
  basicPaper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3, 2),
    backgroundColor: "lightGrey"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  cardMediaBottom: {
    width: "100%",
    height: 200,
    paddingTop: "56.25%" // 16:9
  },

  text: {
    height: 0,
    top: 30,
    position: "relative",
    color: "white",
    textAlign: "center"
  },
  blackContainer: {
    background: theme.palette.darkGrey,
    color: "white"
  },
  pinkContainer: {
    //ackground: theme.palette.charliePink,
    //color: "white",
  },
  defaultHeader: {
    color: theme.palette.charliePink,
    fontWeight: 300
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(5)
  }
}));

const FullpageWrapper = fullpageProps => {
  const classes = useStyles();

  return (
    <ReactFullpage
      {...fullpageProps}
      render={({ state, fullpageApi }) => {
        console.log("render prop change", state); // eslint-disable-line no-console

        return (
          <div>
            <div id="fullpage-wrapper">
              <div className="section">
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
                    <Grid item xs={12}>
              <Typography variant="body2">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></Typography>
            </Grid>
                  </Grid>
                </Container>
              </div>
              <div className="section" style={{ background: "#0EE" }}>
                <div className="slide">
                  <h3>With scroll</h3>
                </div>
              </div>
              <div className="section">
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
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default FullpageWrapper;
