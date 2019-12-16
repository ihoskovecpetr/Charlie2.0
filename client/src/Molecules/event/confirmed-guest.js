import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Tooltip from "@material-ui/core/Tooltip";

import { NavLink } from "react-router-dom";

function ConfirmedGuest(props) {
  const classes = useStyles();
  let countGuests = 0;
  let overFlowGst = false;
  let leftoverGst = [];
  return (
    <Grid container justify="flex-start" alignItems="center" direction="row">
      {props.event.areYouAuthor ? (
        <>
          {props.bookings.map(booking => {
            if (booking.confirmed && !booking.cancelled) {
              return (
                <>
                  <Grid item>
                    {props.cancelledState.loading && (
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
                    {!props.cancelledState.loading && props.event.areYouAuthor && (
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
                    {!props.cancelledState.loading &&
                      !props.event.areYouAuthor && (
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
                        />
                      )}
                  </Grid>
                </>
              );
            }
          })}
        </>
      ) : (
        <Grid container>
          <Grid item>
            <AvatarGroup>
              {props.bookings.map((booking, index) => {
                if (booking.confirmed) {
                  countGuests++;
                  console.log("countGuests: ", countGuests);
                  if (index <= 2) {
                    return (
                      <NavLink
                        to={`/user/${booking.user._id}`}
                        className={classes.noBorder}
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
                  <Avatar>+{countGuests - 3}</Avatar>
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
