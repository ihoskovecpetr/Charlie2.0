import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import UserAskMessage from "src/Atoms/Profile/UserAskMessage";

export default function BookingMessages({ booking }) {
  const classes = useStyles();

  return (
          <Grid item>
              <Grid container>
                  <Grid item xs={12}>
                    {booking && <UserAskMessage 
                        user={booking.user} 
                        message={booking.message} />}
                    {booking.response && <UserAskMessage
                        reverse={true}
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

}));
