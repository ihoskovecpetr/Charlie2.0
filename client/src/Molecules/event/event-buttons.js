import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { withRouter, NavLink } from "react-router-dom";
import gql from "graphql-tag";
import ModalJoin from "./modal-join";
import ModalRate from "./modal-rate";

import { ALL_EVENTS } from "../../Services/GQL";

function EventButtons(props) {
  const classes = useStyles();
  let userIsAttending = false;
  let userRequestedBooking = false;
  let eventIsPast = false;

  // const sendBookingRequest = message => {
  //   props.createReqBooking({
  //     variables: {
  //       guest_id: props.user._id,
  //       guest_name: props.user.name,
  //       event_id: props.data.getOneEvent._id,
  //       message: message
  //     },
  //     refetchQueries: () => [
  //       {
  //         query: props.ONE_EVENT,
  //         variables: { id: props.match.params.id }
  //       }
  //     ]
  //   });

  //   // props.createBooking({
  //   //   variables: {
  //   //     user_id: props.user._id,
  //   //     event_id: props.data.getOneEvent._id
  //   //   },
  //   //   refetchQueries: () => [
  //   //     {
  //   //       query: props.ONE_EVENT,
  //   //       variables: { id: props.match.params.id }
  //   //     }
  //   //   ]
  //   // });
  // };

  if (props.data && props.data.getOneEvent.dateStart) {
    const todayDate = new Date();
    const eventDate = new Date(props.data.getOneEvent.dateStart);
    if (todayDate < eventDate) {
      eventIsPast = false;
    } else {
      eventIsPast = true;
    }
  }

  if (props.data && props.data.showBookings) {
    props.data.showBookings.map(booking => {
      if (props.user._id == booking.user._id) {
        if (!booking.confirmed && !booking.cancelled) {
          userRequestedBooking = true;
        }

        if (booking.confirmed && !booking.cancelled) {
          userIsAttending = true;
        }
      }
    });
  }

  {
    if (eventIsPast) {
      return (
        <>
          {userIsAttending ? (
            <Grid item className={classes.buttonCls}>
              <ModalRate
                event={props.data.getOneEvent}
                user={props.user}
                EVENT_RATINGS={props.EVENT_RATINGS}
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

          {props.data && props.data.getOneEvent.areYouAuthor && (
            <Grid item className={classes.buttonCls}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.trueBtn}
              >
                Yours
              </Button>
            </Grid>
          )}
          {props.data && !props.data.getOneEvent.areYouAuthor && (
            <Grid item className={classes.buttonCls}>
              <Button
                variant="contained"
                color="secondary"
                style={{ background: "white !important" }}
                className={classes.trueBtn}
              >
                not owner
              </Button>
            </Grid>
          )}
        </>
      );
    }
  }

  return (
    <>
      {!userIsAttending && !userRequestedBooking && (
        <Grid item className={classes.buttonCls}>
          <ModalJoin
            ONE_EVENT={props.ONE_EVENT}
            user={props.user}
            event={props.data.getOneEvent}
          />
        </Grid>
      )}

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
              props.cancelBooking({
                variables: {
                  user_id: props.user._id,
                  event_id: props.data.getOneEvent._id
                },
                refetchQueries: () => [
                  {
                    query: props.ONE_EVENT,
                    variables: { id: props.match.params.id }
                  },
                  {
                    query: ALL_EVENTS,
                    variables: {
                      date: new Date(props.data.getOneEvent.dateStart)
                        .toISOString()
                        .split("T")[0]
                    }
                  }
                ]
              });
            }}
          >
            CANCEL ATT.
          </Button>
        </Grid>
      )}

      {props.data && props.data.getOneEvent.areYouAuthor && (
        <Grid item className={classes.buttonCls}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.trueBtn}
            onClick={e => {
              e.preventDefault();
              props.deleteOneEvent({
                variables: {
                  delete_id: props.data.getOneEvent._id
                },
                refetchQueries: () => [
                  {
                    query: ALL_EVENTS,
                    variables: { date: "2019-11-11" } //TODO..
                  }
                ]
              });
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
