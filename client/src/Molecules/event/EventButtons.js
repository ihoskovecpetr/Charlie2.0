import React, { useEffect, useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { withRouter, NavLink, useHistory } from "react-router-dom";

import { UserContext } from "../../userContext";
import { ALL_EVENTS } from "../../Services/GQL";
import {GET_ONE_EVENT} from "src/Services/GQL/GQL_GET_ONE_EVENT";

import ModalJoin from "./ModalJoin";
import ModalRate from "./ModalRate";
import JoinSend from "src/Molecules/play/JoinSend";

function EventButtons({event, bookings, user, createReqBooking, createBooking, cancelBooking, deleteOneEvent, EVENT_RATINGS}) {
  const classes = useStyles();
  let history = useHistory();
  const { context } = useContext(UserContext);
  const [userIsAtt, setUserIsAtt] = useState(false)
  const [userIsPend, setUserIsPend] = useState(false)
  const [eventIsPast, setEventIsPast] = useState(false)


  useEffect(() => {

    if (event.dateStart) {
      const todayDate = new Date();
      const eventDate = new Date(event.dateStart);

      if (todayDate < eventDate) {
        setEventIsPast(false);
      } else {
        setEventIsPast(true);
      }
    }

      if (bookings) {
        bookings.map(booking => {
          console.log("Iter booking: ", context._id, booking.user._id, booking)
          if (!userIsAtt && context._id === booking.user._id) {
            if (!booking.confirmed && !booking.cancelled) {
              setUserIsPend(true)
            }

            if (booking.confirmed && !booking.cancelled) {
              setUserIsAtt(true)
            }
          }
        });
      }

  }, [event, bookings, context]);


  const cancelBookingHandle = () => {
    cancelBooking({
      variables: {
        user_id: context._id,
        event_id: event._id
      },
      refetchQueries: () => [
        {
          query: GET_ONE_EVENT,
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


  // NO LOGED IN
  if (!context.name){
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
          {userIsAtt ? (
            <Grid item className={classes.buttonCls}>
              <ModalRate
                event={event}
                user={context}
                EVENT_RATINGS={EVENT_RATINGS}
              />
            </Grid>
          ) : (
            <Grid item className={classes.buttonCls}>
              <Button
                variant="contained"
                className={classes.trueBtn}
              >
                Past Event
              </Button>
            </Grid>
          )}
        </>
      );
    }
  // ACTIVE EVENT
  return (
    <>
      {!userIsAtt && !userIsPend && !event.areYouAuthor &&
        <Grid item className={classes.buttonCls}>
          <ModalJoin
            event={event}
          />

        </Grid>
      }

      {!userIsAtt && userIsPend && (
        <Grid item className={classes.buttonCls}>
          <Button variant="contained" className={classes.trueBtn}>
            PENDING REQ
          </Button>
        </Grid>
      )}
      
       <JoinSend event={event}/>

      {userIsAtt && (
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
    margin: 10,
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
