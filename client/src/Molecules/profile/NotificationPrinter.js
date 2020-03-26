import React, { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { NavLink } from "react-router-dom";

import { UserContext } from "../../userContext";
import AcceptBookingCard from "../../Atoms/Profile/AcceptBookingCard";
import PendingBookingCard from "../../Atoms/Profile/PendingBookingCard";
import TimeLine from "../../Atoms/Profile/TimeLine";

export default function NotificationPrinter({event, PROFILE_DATA}) {
  const classes = useStyles();
  const { context } = useContext(UserContext);

  const eventSwitch = (event) => {
        switch(event.type) {
            case "iGotRating":
                return <h1>GOT RATED</h1>
            break;
            case "yourBooking":
                // return <Grid container justify="center" className={classes.singleFeed}>
                //     <Grid item>
                //         <TimeLine name="Your BOOKING status" date={event.createdAt} />
                //         <PendingBookingCard event={event} PROFILE_DATA={PROFILE_DATA} />
                //     </Grid>

                // </Grid>
            break;
            case "askForJoin":
                return <Grid container justify="center" className={classes.singleFeed}>
                    
                        <AcceptBookingCard event={event} PROFILE_DATA={PROFILE_DATA} />
                    
                </ Grid>
                break;
            default:
            // code block
        }
  }


  return (
    <Grid container justify="center" className={classes.mainContainerFeedPrinter}>
        <Grid item xs={12}>
                {eventSwitch(event)}
        </Grid>
      </Grid>
  );
}

const useStyles = makeStyles(theme => ({
    mainContainerFeedPrinter: {
        backgroundSize: "cover", 
        width: "100%", 
    },
    singleFeed: {
        color: "black",
        marginTop: 10,
        width: "100%", 
      },
}));

