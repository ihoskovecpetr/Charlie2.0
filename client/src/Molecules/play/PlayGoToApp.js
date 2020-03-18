import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { useHistory } from "react-router-dom";

import CharlieLogo from "../../Images/charlie-logo.png";

const useStyles = makeStyles(theme => ({
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  let history = useHistory();

  const gointToApp = () => {
    window.eventId = history.location.pathname.split("/")[2]
    history.push("/signin")
  }

  return (
    <Grid container 
    alignItems="center" 
    alignContent="center" 
    // spacing={2} 
    style={{backgroundColor: "rgba(255,255,255,0.3)", padding: 10}}
    onClick={gointToApp}>

    <Grid item >
        <ArrowBackIosIcon />
        <ArrowBackIosIcon />
    </Grid> 
    <Grid item >
        <Avatar src={CharlieLogo} style={{marginLeft: 10, marginRight: 10}} />
    </Grid> 
    <Grid item >
        Click here to go to main app
    </Grid> 
</Grid> 
  );
}
