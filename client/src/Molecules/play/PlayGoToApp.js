import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from "@material-ui/core/IconButton";

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
    style={{backgroundColor: "rgba(255,255,255,0.1)", padding: 10}}
    onClick={gointToApp}>

    <Grid item >
      <IconButton color="secondary"  >
        <ArrowBackIosIcon style={{right: '-8px', position: 'relative'}} />
        <ArrowBackIosIcon style={{left: '-2px', position: 'relative'}} />
      </IconButton>
    </Grid> 
    {/* <Grid item >
        <Avatar src={CharlieLogo} style={{marginLeft: 10, marginRight: 10}} />
    </Grid>  */}
    <Grid item >
        Click here to go to main app
    </Grid> 
</Grid> 
  );
}
