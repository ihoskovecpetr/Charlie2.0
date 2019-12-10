import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    // width: `100%`,
    // height: `100%`,
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  }
}));

export default function Spinner(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        color="secondary"
        style={{ height: props.height, width: props.width }}
      />
    </div>
  );
}
