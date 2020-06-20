import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import UserAskMessage from "src/Atoms/Profile/UserAskMessage";

export default function BookingMessages({ booking }) {
  const classes = useStyles();

  return (
          <Grid item>
              <Grid container>
                  <Grid item xs={12} className={classes.messageContainer}>
                    {booking && <UserAskMessage 
                        user={booking.user} 
                        message={booking.message} />}
                    </Grid>
                    <Grid item xs={12} className={classes.messageContainer}>
                    {booking.response && <UserAskMessage
                        reverse={true}
                        decided={booking.decided}
                        user={booking.event.author}
                        message={booking.response}
                        confirmed={booking.confirmed}
                      />}
                  </Grid>
              </Grid>
          </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  
  messageContainer: {
    backgroundColor: "rgba(0,0,0,0.38)",
    borderRadius: 10,
    margin: 5
  },
}));
