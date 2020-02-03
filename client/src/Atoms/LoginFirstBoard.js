import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Animated } from "react-animated-css";

import { useHistory } from "react-router-dom";

function LoginFirstBoard(props) {
  let history = useHistory();
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.mainGrid}
      onClick={() => {
        setTimeout(() => {
          history.push(`/signin`);
        }, 200);
      }}
    >
      <Grid item xs={12} className={classes.loginTransparent}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.loginFirstContainer}
        >
          <Grid item>
            <Typography variant="h5">
              <b>LOGIN FIRST</b>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.fingerItem}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Animated
              animationIn="bounceInDown"
              animationOut="fadeOut"
              animationInDelay={500}
              //animationInDuration={5000}
              isVisible={true}
              infinite={true}
            >
              <Avatar
                className={classes.fingerPng}
                src="https://res.cloudinary.com/party-images-app/image/upload/v1580483234/ol7l7zkkbvcojwzwz4dd.png"
              />
            </Animated>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.loginBlack}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.loginContainer}
        >
          <Grid item>
            <Typography variant="h5">
              <b>LOGIN</b>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  mainGrid: {
    height: "400px",
    backgroundColor: theme.palette.charliePink,
    borderRadius: "60px",
    color: "white"
  },

  loginTransparent: {
    height: "35%"
  },
  loginFirstContainer: {
    height: "100%"
  },
  fingerItem: {
    height: "40%"
  },
  fingerPng: {
    transform: "rotate(180deg)",
    width: theme.spacing(10),
    height: theme.spacing(10)
  },

  loginBlack: {
    backgroundColor: theme.palette.darkGrey,
    height: "25%",
    borderBottomLeftRadius: "60px",
    borderBottomRightRadius: "60px"
  },
  loginContainer: {
    height: "100%"
  }
}));

export default LoginFirstBoard;
