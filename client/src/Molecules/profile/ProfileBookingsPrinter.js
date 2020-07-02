import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { UserContext } from "../../userContext";
import AcceptBookingCard from "../../Atoms/Profile/AcceptBookingCard";
import PendingBookingCard from "../../Atoms/Profile/PendingBookingCard";

export default function ProfileBookingsPrinter({ booking }) {
  const classes = useStyles();

  const eventSwitch = (booking) => {
    switch (booking.type) {
      case "yourBooking":
        return (
          <Grid container justify="center" className={classes.singleFeedLine}>
            <PendingBookingCard booking={booking} />
          </Grid>
        );
        break;
      case "askForJoin":
        return (
          <Grid container justify="center" className={classes.singleFeedLine}>
            <AcceptBookingCard booking={booking} />
          </Grid>
        );
        break;
      default:
      // code block
    }
  };

  return (
    <Grid
      container
      justify="center"
      className={classes.mainContainerFeedPrinter}
    >
      <Grid item xs={12}>
        {eventSwitch(booking)}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  mainContainerFeedPrinter: {
    backgroundSize: "cover",
    width: "100%",
  },
  singleFeedLine: {
    color: "black",
    width: "100%",
  },
}));
