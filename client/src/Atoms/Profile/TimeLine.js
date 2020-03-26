import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { displayDate } from "../../Services/transform-services";

export default function TimeLine({name, date}) {
  const classes = useStyles();

  return (
    // <Grid container className={classes.mainContainer}>
      // <Grid item xs={6} className={classes.mainItem} alignContent="flex-end">
      //   <Typography variant="subtitle1" align="left" className={classes.mainHeader}>
      //         {name}
      //   </Typography>
      // </Grid>
      <Grid item xs={8} className={classes.mainItem} alignContent="flex-end">
            <Typography variant="body2" align="right" className={classes.mainHeader}>
                  {displayDate(date)}
            </Typography>
      </Grid>
  // </Grid>

  );
}

const useStyles = makeStyles(theme => ({
  mainContainer: {
    padding: 5
  },
  mainHeader: {
    width: "100%",
    fontWeight: 600,
    color: "grey"
  },
}));