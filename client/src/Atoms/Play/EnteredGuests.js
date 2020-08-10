import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory, NavLink } from "react-router-dom";

const EnteredGuests = ({ bookings }) => {
  const classes = useStyles();
  const history = useHistory();

  console.log("ENTr GSTS:", bookings, bookings.length);

  return (
    <Grid item xs={12} className={classes.wrapIt}>
      {bookings &&
        bookings.map((booking) => {
          if (booking.entered) {
            console.log("ENTERREEEEEEEEE");
            return (
              <Avatar
                alt={booking.user.name}
                src={booking.user.picture}
                className={classes.ButtonAvatar}
                onClick={() => {
                  history.push(`/user/${booking.user._id}`);
                }}
              >
                x
              </Avatar>
            );
          }
        })}
      {bookings.length === 0 && "No Entered guests yet"}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  wrapIt: {
    padding: 10,
  },
}));

export default EnteredGuests;
