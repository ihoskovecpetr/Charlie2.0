import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

function ConfirmedGuest(props) {
  const classes = useStyles();
  return (
    <Grid container direction="row">
      {props.bookings.map(booking => {
        if (booking.confirmed && !booking.cancelled) {
          return (
            <Grid item>
              {props.cancelledState.loading && (
                <Chip
                  className={classes.chip}
                  avatar={
                    <Avatar alt={booking.user.name} src={booking.user.picture}>
                      M
                    </Avatar>
                  }
                  label="Deleting..."
                  color="primary"
                  variant="outlined"
                  disabled
                />
              )}
              {!props.cancelledState.loading && props.event.areYouAuthor && (
                <Chip
                  className={classes.chip}
                  avatar={
                    <Avatar alt={booking.user.name} src={booking.user.picture}>
                      M
                    </Avatar>
                  }
                  label={booking.user.name}
                  color="primary"
                  variant="outlined"
                  onClick={() => console.log("XX")}
                  onDelete={() => {
                    props.cancelBooking({
                      variables: {
                        user_id: booking.user._id,
                        event_id: props.event._id
                      },
                      refetchQueries: () => [
                        {
                          query: props.ONE_EVENT,
                          variables: { id: props.event._id }
                        }
                      ]
                    });
                  }}
                />
              )}
              {!props.cancelledState.loading && !props.event.areYouAuthor && (
                <Chip
                  className={classes.chip}
                  avatar={
                    <Avatar alt={booking.user.name} src={booking.user.picture}>
                      M
                    </Avatar>
                  }
                  label={booking.user.name}
                  color="primary"
                  variant="outlined"
                  onClick={() => console.log("XX")}
                />
              )}
            </Grid>
          );
        }
      })}
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  chip: {}
}));

export default ConfirmedGuest;
