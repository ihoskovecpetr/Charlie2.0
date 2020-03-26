import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { displayDate } from "../../Services/transform-services";
import { useCountDistance } from "../../Hooks/useCountDistance";
import { UserContext } from "../../userContext";

import countdown from "countdown";

export default function TimeLine({ event }) {
  const classes = useStyles();
  const { context, setContext } = useContext(UserContext);
  const distance = useCountDistance(
    event.geometry.coordinates[1],
    event.geometry.coordinates[0],
    context.geolocationObj && context.geolocationObj.lat,
    context.geolocationObj && context.geolocationObj.lng,
    "K"
  );

  return (
    <Grid container className={classes.mainContainer}>
      <div className={classes.wrapDiv}>
        <Grid item>
          <Typography component="p" className={classes.mainHead}>
            {event.name}
          </Typography>
        </Grid>
        <Grid item className={classes.listRow}>
          <Grid container item xs={12}>
            <Grid item xs={6}>
              <Typography component="p" className={classes.head}>
                Launching in:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component="p" className={classes.contentName}>
                {countdown(
                  new Date(),
                  new Date(event.dateStart),
                  "X",
                  1
                ).toString()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={classes.listRow}>
          <Grid container item xs={12}>
            <Grid item xs={6}>
              <Typography component="p" className={classes.head}>
                distance
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component="p" className={classes.standardContent}>
                {`${Math.floor(distance * 10) / 10} Km`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  mainContainer: {
    padding: 5,
    paddingLeft: 15
  },
  wrapDiv: {
    border: "1px solid black",
    borderRadius: 10,
    width: "100%",
    marginLeft: 20,
    marginRight: 20
  },
  listRow: {
    //width: "100%",
    marginTop: 2,
    marginBottom: 2
    // backgroundColor: "rgba(213,208,208,0.4)",
  },
  mainHead: {
    fontWeight: 800,
    fontSize: 18,
    textAlign: "center",
    color: "black"
    // backgroundColor: "rgba(136,136,136,0.2)",
    // padding: 10
  },
  head: {
    fontWeight: 600,
    fontSize: 16,
    textAlign: "right",
    color: "#59F0EA",
    // backgroundColor: "rgba(136,136,136,0.2)",
    padding: 10
  },
  contentName: {
    fontWeight: 600,
    textAlign: "left",
    padding: 10
  },
  standardContent: {
    fontWeight: 600,
    textAlign: "right",
    color: "rgba(50,48,28,1)",
    padding: 10
  }
}));
