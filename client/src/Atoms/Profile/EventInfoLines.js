import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { displayDate } from "../../Services/transform-services";

export default function TimeLine({name, date}) {
  const classes = useStyles();

  return (
    <Grid container className={classes.mainContainer}>

        <Grid item className={classes.listRow}>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <Typography component="p" className={classes.head}>
                EVENT
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography component="p" className={classes.contentName}>
                {name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={classes.listRow}>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <Typography component="p" className={classes.head}>
                DATE
              </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography component="p" className={classes.standardContent}>
                  {date &&
                    displayDate(date)}
                </Typography>
            </Grid>
          </Grid>
        </Grid>      
  </Grid>

  );
}

const useStyles = makeStyles(theme => ({
  mainContainer: {
    padding: 5,
    paddingLeft: 15
  },
  listRow:{
    width: '100%',
    marginTop: 2,
    marginBottom: 2,
    // backgroundColor: "rgba(213,208,208,0.4)",
  },
  head: {
    fontWeight: 500,
    fontSize: 16,
    textAlign: 'left',
    color: "black"
    // backgroundColor: "rgba(136,136,136,0.2)",
    // padding: 10
  },
  contentName: {
    fontWeight: 600,
    textAlign: 'right',
    padding: 10
  },
  standardContent: {
    fontWeight: 600,
    textAlign: 'right',
    color: "rgba(50,48,28,1)",
    padding: 10
  }
}));