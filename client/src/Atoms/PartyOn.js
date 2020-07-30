import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { withRouter, useHistory, NavLink } from "react-router-dom";
import { displayDate } from "../Services/transform-services";

const useStyles = makeStyles((theme) => ({
  mainItemGrid: {
    marginTop: -5,
  },
  mainContainerGrid: {
    // backgroundColor: "green",
  },
  textGreen: {
    color: "green",
    fontWeight: 900,
  },
}));

export default function PartyOn(props) {
  const classes = useStyles();

  return (
    // <Grid item xs={12} className={classes.mainItemGrid}>
    <Grid container justify="center" className={classes.mainContainerGrid}>
      <Typography className={classes.textGreen}>
        Event is happening right NOW
      </Typography>
    </Grid>
    // </Grid>
  );
}
