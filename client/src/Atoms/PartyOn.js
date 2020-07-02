import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { withRouter, useHistory, NavLink } from "react-router-dom";

import { displayDate } from "../Services/transform-services";

const useStyles = makeStyles((theme) => ({
  mainItemGrid: {
    marginTop: -5,
  },
  mainContainerGrid: {
    backgroundColor: "green",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  chip: {
    backgroundColor: "#E8045D",
    color: "black",
  },
}));

export default function PartyOn(props) {
  const classes = useStyles();

  return (
    // <Grid item xs={12} className={classes.mainItemGrid}>
    <Grid container justify="center" className={classes.mainContainerGrid}>
      Event is happening right NOW
      {/* <Grid item>
                  <Chip
                    icon={<PlayArrowIcon style={{color: "black"}} />}
                    label="Party ON"
                    //clickable
                    //disabled
                    color="secondary"
                    className={classes.chip}
                    deleteIcon={<PlayArrowIcon />}
                  />
          </Grid> */}
    </Grid>
    // </Grid>
  );
}
