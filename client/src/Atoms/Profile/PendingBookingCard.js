import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { withRouter, useHistory, NavLink } from "react-router-dom";

import { displayDate } from "../../Services/transform-services";
import ConfirmPNG from "../../Images/confirm_pink.png";
import ClosePNG from "../../Images/close_black.png";
import EventInfoLines from "./EventInfoLines";



export default function AcceptBookingCard({event}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  // console.log("event card props: ", props);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={8} className={classes.mainItem} style={{backgroundColor: event.confirmed ? "rgba(92,201,68,1)" : "#D9F5D3"}}>
      <Grid container alignItems="center" onClick={handleExpandClick} >
        <Grid item xs={9}>

              <Typography variant="body2" align="center" className={classes.mainHeader}>
                {event.confirmed ? "Your CONFIRMED request" : "Your PENDING request"}
              </Typography>

        </Grid>
        <Grid item xs={3}>
          <Grid container justify="center" alignItems="center">
            <Grid item style={{ transition: "transform .1s ease-in-out", transform: expanded ? "rotate(-180deg)" : "rotate(0deg)"}}>
              <ExpandMoreIcon fontSize="large" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Collapse in={expanded} timeout="auto" unmountOnExit>

      <EventInfoLines name={event.event.name} date={event.event.dateStart} />
      <Grid container>
        {/* <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item>
              <Typography variant="body2" align="center" className={classes.mainHeader}>
                {event.event.name}
              </Typography>
              <p className={classes.thisLine}></p>
            </Grid>
          </Grid>
        </Grid> */}
        <Grid item xs={12}>
          <Grid container className={classes.btnContainer}>
          <Grid item xs={4} >
            <Grid container justify="center">
              <Grid item >
                <Avatar src={event.user.picture} className={classes.avatarPerson} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Grid container justify="center">
              <Grid item>
              <Typography variant="body2" align="center" >
                {event.message}
              </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </Grid>
        <Grid item xs={12}>
        <Grid container className={classes.btnContainer}>
          <Grid item xs={6} className={classes.btnWrapLeft} >
            <Grid container justify="center">
              <Grid item >
              <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  onClick={() => { }}
                >
                  DETAIL
              </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container justify="center">
              <Grid item>
              <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  onClick={() => { }}
                >
                  CANCEL
              </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </Grid>
      </Grid>
 

      </Collapse>
   </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  mainItem: {
    width: "100%",
    boxShadow: "4px 3px 5px 0px rgba(0,0,0,0.5)",
    borderRadius: 15
  },
  mainHeader: {
    fontSize: 22,
    fontWeight: 600,
    marginLeft: 20,
    marginRight: 20
  },
  userAvatar: {
    backgroundColor: red[500],
    height: 80,
    width: 80
  },
  btnContainer: {
    marginBottom: 5,
    marginTop: 10
  },
  btnWrapLeft: {
    borderRight: "1px solid #707070"
  },
  btn: {
    // height: 50,
    // width: "50%"
  },
  avatarPerson: {
    height: 70,
    width: 70
  },
  thisLine: {
    height: '1px',
    width: '100%',
    marginTop: '2px',
    backgroundColor: "#707070"
  },
}));