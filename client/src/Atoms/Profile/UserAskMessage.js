import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { withRouter, useHistory } from "react-router-dom";
import { useSpring, animated } from "react-spring";

export default function UserAskMessage({
  user,
  message,
  reverse,
  confirmed,
  decided,
}) {
  const classes = useStyles();
  let history = useHistory();
  const swingIn = useSpring({
    transform: "translateX(0px)",
    opacity: 1,
    from: { opacity: 0, transform: "translateX(-100px)" },
  });
  console.log("UserAskMessage: confirmed: ", confirmed);

  return (
    <animated.div style={swingIn}>
      <Grid
        container
        direction={reverse ? "row-reverse" : "row"}
        className={classes.containerMain}
      >
        <Grid
          item
          xs={4}
          className={classes.avatarGrid}
          onClick={() => {
            history.push(`/?user=${user._id}`);
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item>
                  <Avatar
                    aria-label="recipe"
                    className={classes.avatar}
                    src={user.picture}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item>
                  <Typography variant="subtitle2" className={classes.textName}>
                    {user.name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={12}>
              {decided && (
                <Typography
                  variant="subtitle2"
                  className={classes.textConfirmed}
                >
                  {confirmed ? (
                    <span className={classes.greenText}>GRANTED</span>
                  ) : (
                    <span className={classes.greyText}>DECLINED</span>
                  )}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" className={classes.text}>
                {message}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </animated.div>
  );
}

const useStyles = makeStyles(theme => ({
  containerMain: {
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  avatarGrid: {
    cursor: "pointer",
  },
  avatar: {
    backgroundColor: "red",
    color: "lightgrey",
    width: 40,
    height: 40,
    boxShadow: "2px 2px 5px black",
  },
  textName: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: 500,
    color: "#E8045D",
    textDecoration: "underline",
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: 500,
  },
  textConfirmed: {
    fontWeight: 600,
    textAlign: "center",
  },
  greenText: {
    color: "green",
  },
  greyText: {
    color: "grey",
  },
}));
