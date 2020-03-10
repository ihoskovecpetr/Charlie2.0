import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
//import IconButton from "@material-ui/core/IconButton";
//import ExploreIcon from "@material-ui/icons/Explore";
//import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
//import { withTheme } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";

import { NavLink } from "react-router-dom";

import Copyright from "../Atoms/copyright";
import SocialLine from "../Atoms/social-line";
import LastBackImage from "../Images/last-back-image";

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

export default function Menu(props) {
  const classes = useStyles();

  //console.log("Menu props: ", props);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container maxWidth="sm" className={classes.aboutContainer}>
        <Grid item>
          <Typography
            variant="h5"
            component="h5"
            className={classes.defaultHeader}
          >
            MAIN <b>MISSION</b>
          </Typography>
        </Grid>
        <Grid item>
          <Paper className={classes.basicPaper}>
            <Typography component="p">
              Have you ever seen house on the beach or flat in a skyscraper and
              wonder how would it be to enjoy a drink in there? Then this is
              your chance, dont go to that same old bar you know already good
              enought, just have a look and join some event in your
              neighbourhood.
            </Typography>
          </Paper>
        </Grid>

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
                Go to create section of Charlie, fill up short form with all the
                important questinos and press PREVIEW > Confirm, you will get
                notification on your email anytime you gained some guest. Easy!
              </Typography>
            </Paper>
            <Paper className={classes.basicPaper}>
              <Typography variant="h6" component="h6">
                How to colect the admission fee?
              </Typography>
              <Typography component="p">
                At this stage of Charlie development you will collect fee from
                your guests by yourself.
              </Typography>
            </Paper>

            <Paper className={classes.basicPaper}>
              <Typography variant="h6" component="h6">
                Is my place good enought to host Charlie event?
              </Typography>
              <Typography component="p">
                It is only up to you how much time/efford/money will you invest
                into creating event or improving your place and how much you
                want to earn per each guest.. only guests will decide :){" "}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid item>
          <Typography
            variant="h6"
            component="h6"
            className={classes.defaultHeader}
          >
            <b>CONTACT</b> US
          </Typography>
        </Grid>
        <Grid container className={classes.pinkContainer}>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              //color="secondary"
              //inputRef={inputName}
              label="Your Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              rows="5"
              //color="secondary"
              id="question"
              //inputRef={inputName}
              label="Your Question"
              name="question"
              autoComplete="text"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              //onClick={e => onSubmit(e)}
            >
              Send
            </Button>
          </form>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <SocialLine color="secondary" />
            <CardMedia
              className={classes.cardMediaBottom}
              image={LastBackImage}
              title="Paella dish"
            />
            <SocialLine color="secondary" />
            <Grid item>
              <NavLink to={`/privacy-policy`}>
                <Grid item>
                  <Typography variant="subtitle2">Privacy policy</Typography>
                </Grid>
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to={`/about`}>
                <Grid item>
                  <Typography variant="subtitle2">About</Typography>
                </Grid>
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
