import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  spinnerWrap: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  }
}));

export default function Spinner({height, width, color}) {
  const classes = useStyles();

  return (
    <div className={classes.spinnerWrap}>
      <CircularProgress
        color={color ? color : "secondary"}
        style={{ height: height, width: width }}
      />
    </div>
  );
}
