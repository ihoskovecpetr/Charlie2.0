import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { withRouter, NavLink, useHistory } from "react-router-dom";

import gql from "graphql-tag";
import ModalJoin from "./ModalJoin";
import ModalRate from "./ModalRate";

import { ALL_EVENTS } from "../../Services/GQL";

function EventButtons({event, bookings, user, eventId, createReqBooking, ONE_EVENT, createBooking, cancelBooking, deleteOneEvent, EVENT_RATINGS}) {
  const classes = useStyles();
  let history = useHistory();
  let userIsAttending = false;
  let userRequestedBooking = false;
  let eventIsPast = false;

  // const sendBookingRequest = message => {
  //   createReqBooking({
  //     variables: {
  //       guest_id: user._id,
  //       guest_name: user.name,
  //       event_id: event._id,
  //       message: message
  //     },
  //     refetchQueries: () => [
  //       {
  //         query: ONE_EVENT,
  //         variables: { id: eventId }
  //       }
  //     ]
  //   });

  //   // createBooking({
  //   //   variables: {
  //   //     user_id: user._id,
  //   //     event_id: event._id
  //   //   },
  //   //   refetchQueries: () => [
  //   //     {
  //   //       query: ONE_EVENT,
  //   //       variables: { id: eventId }
  //   //     }
  //   //   ]
  //   // });
  // };

  useEffect(() => {

    if (event.dateStart) {
      const todayDate = new Date();
      const eventDate = new Date(event.dateStart);
      if (todayDate < eventDate) {
        eventIsPast = false;
      } else {
        eventIsPast = true;
      }
    }

      if (bookings) {
        bookings.map(booking => {
          if (user._id === booking.user._id) {
            if (!booking.confirmed && !booking.cancelled) {
              userRequestedBooking = true;
            }

            if (booking.confirmed && !booking.cancelled) {
              userIsAttending = true;
            }
          }
        });
      }

  }, [event, bookings]);




  console.log(" Event BNTS event.dateStart: ", event, userIsAttending)

  const cancelBookingHandle = () => {
    cancelBooking({
      variables: {
        user_id: user._id,
        event_id: event._id
      },
      refetchQueries: () => [
        {
          query: ONE_EVENT,
          variables: { id: eventId }
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
  }

  const deleteOneEventHandle = () => {
    deleteOneEvent({
      variables: {
        delete_id: event._id
      },
      refetchQueries: () => [
        {
          query: ALL_EVENTS,
          variables: { date: new Date().toISOString() } //TODO..
        }
      ]
    });
  }

  // NO LOGEG IN
  if (!user.name){
    return (
      <Grid item className={classes.buttonCls}>
        <Button variant="contained" 
                className={classes.trueBtn}    
                onClick={() => { history.push("/signin") }}>
            LOGIN FIRST
        </Button>
      </Grid>
    )
  }
  // CANCELLED EVENT
  if (event && event.hide){
    return (
      <Grid item className={classes.buttonCls}>
        <Button variant="contained" 
                className={classes.trueBtn}>
            CANCELLED EVENT
        </Button>
      </Grid>
    )
  }
  // PAST EVENT
    if (eventIsPast) {
      return (
        <>
          {userIsAttending ? (
            <Grid item className={classes.buttonCls}>
              <ModalRate
                event={event}
                user={user}
                EVENT_RATINGS={EVENT_RATINGS}
              />
            </Grid>
          ) : (
            <Grid item className={classes.buttonCls}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.trueBtn}
              >
                Past Event, did not attend
              </Button>
            </Grid>
          )}
        </>
      );
    }
  // ACTIVE EVENT
  return (
    <>
      {!userIsAttending && !userRequestedBooking && !event.areYouAuthor &&
        <Grid item className={classes.buttonCls}>
          <ModalJoin
            ONE_EVENT={ONE_EVENT}
            user={user}
            event={event}
          />
        </Grid>
      }

      {!userIsAttending && userRequestedBooking && (
        <Grid item className={classes.buttonCls}>
          <Button variant="contained" color="grey" className={classes.trueBtn}>
            PENDING REQ
          </Button>
        </Grid>
      )}

      {userIsAttending && (
        <Grid item className={classes.buttonCls}>
          <Button
            variant="contained"
            color="primary"
            className={classes.trueBtn}
            onClick={e => {
              e.preventDefault();
              cancelBookingHandle();
            }}
          >
            CANCEL ATT.
          </Button>
        </Grid>
      )}

      {event && event.areYouAuthor && (
        <Grid item className={classes.buttonCls}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.trueBtn}
            onClick={e => {
              e.preventDefault();
              deleteOneEventHandle()
            }}
          >
            DELETE
          </Button>
        </Grid>
      )}
    </>
  );
}

const useStyles = makeStyles(theme => ({
  buttonCls: {
    margin: 0,
    width: "50%"
  },
  disabledBtn: {
    background: "white !important"
  },
  trueBtn: {
    width: "100%",
    height: 60,
    borderRadius: 0
  }
}));

export default withRouter(EventButtons);
