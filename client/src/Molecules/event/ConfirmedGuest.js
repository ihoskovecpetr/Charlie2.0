import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Tooltip from "@material-ui/core/Tooltip";

import { NavLink } from "react-router-dom";
import { ALL_EVENTS } from "../../Services/GQL";

function ConfirmedGuest({bookings, event, cancelBooking, cancelledState, ONE_EVENT}) {
  const classes = useStyles();
  let countGuests = 0;
  let overFlowGst = false;
  let leftoverGst = [];

  return (
    <Grid container justify="flex-start" alignItems="center" direction="row">
      {event && event.areYouAuthor ? ( //
        <>
          {bookings && bookings.map((booking, index) => 
            booking.confirmed && !booking.cancelled && <Grid item key={index}>
                    {cancelledState.loading && (
                      <Chip
                        className={classes.chip}
                        avatar={
                          <Avatar
                            alt={booking.user.name}
                            src={booking.user.picture}
                          >
                            M
                          </Avatar>
                        }
                        label="Deleting..."
                        color="primary"
                        variant="outlined"
                        disabled
                      />
                    )}
                    {!cancelledState.loading && event && event.areYouAuthor && (
                      <Chip
                        className={classes.chip}
                        avatar={
                          <Avatar
                            alt={booking.user.name}
                            src={booking.user.picture}
                          >
                            M
                          </Avatar>
                        }
                        label={booking.user.name}
                        color="primary"
                        variant="outlined"
                        onClick={() => console.log("XX")}
                        onDelete={() => {
                          cancelBooking({
                            variables: {
                              user_id: booking.user._id,
                              event_id: event._id
                            },
                            refetchQueries: () => [
                              {
                                query: ONE_EVENT,
                                variables: { id: event._id }
                              },
                              {
                                query: ALL_EVENTS,
                                variables: {
                                  date: new Date(event.dateStart)
                                    .toISOString()
                                    .split("T")[0]
                                }
                              }
                            ]
                          });
                        }}
                      />
                    )}
                    {cancelledState && !cancelledState.loading && event &&
                      !event.areYouAuthor && (
                        <Chip
                          className={classes.chip}
                          avatar={
                            <Avatar
                              alt={booking.user.name}
                              src={booking.user.picture}
                            >
                              User
                            </Avatar>
                          }
                          label={booking.user.name}
                          color="primary"
                          variant="outlined"
                          onClick={() => console.log("XX")}
                        />
                      )}
                  </Grid>
   )}
        </>
      ) : (
        <Grid container>
          <Grid item>
            <AvatarGroup>
              {bookings && bookings.map((booking, index) => {
                if (booking.confirmed) {
                  countGuests++;
                  if (index <= 4) {
                    return (
                      <NavLink
                        to={`/user/${booking.user._id}`}
                        className={classes.noBorder}
                        key={index}
                      >
                        <Avatar alt="Remy Sharp" src={booking.user.picture} />
                      </NavLink>
                    );
                  } else {
                    overFlowGst = true;
                    leftoverGst.push(booking.user.name);
                  }
                } else {
                  return null;
                }
              })}
              {overFlowGst && (
                <Tooltip title={leftoverGst.map(name => `${name} • `)}>
                  <Avatar>+{countGuests - 5}</Avatar>
                </Tooltip>
              )}
            </AvatarGroup>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  chip: {},
  noBorder: {
    border: "0px solid black"
  }
}));

export default ConfirmedGuest;
