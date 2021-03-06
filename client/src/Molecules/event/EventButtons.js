import React, { useEffect, useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { UserContext } from "src/Contexts/userContext";
import { ALL_EVENTS } from "src/Services/GQL";
import { GET_ONE_EVENT } from "src/Services/GQL/GET_ONE_EVENT";
import { PROFILE_DATA } from "src/Services/GQL/PROFILE_DATA";
import { DELETE_BOOKING } from "src/Services/GQL/DELETE_BOOKING";
import { EVENT_BOOKINGS } from "src/Services/GQL/EVENT_BOOKINGS";
import { PLAY_EVENTS_QUERY } from "src/Services/GQL/PLAY_EVENTS_QUERY";

import ModalRate from "./ModalRate";
import JoinSend from "src/Molecules/play/JoinSend";

const CANCEL_EVENT = gql`
  mutation cancelEvent($event_id: ID!) {
    cancelEvent(event_id: $event_id) {
      success
    }
  }
`;
let counter = 1;

const MemoizedEventBtns = React.memo(function EventButtons({
  event,
  propContext,
  name,
}) {
  const classes = useStyles();
  let history = useHistory();
  const { context } = useContext(UserContext);
  const { loading, data, error } = useQuery(EVENT_BOOKINGS, {
    variables: { event_id: event._id },
  });
  const [deleteBooking, deleteBookingStates] = useMutation(DELETE_BOOKING);
  const [cancelEvent, cancelEventState] = useMutation(CANCEL_EVENT);
  const [localContext, setLocalContext] = useState({});

  const [printComponents, setPrintComponents] = useState([]);

  const [stateOfMyBooking, setStateOfMyBooking] = useState({
    userIsAtt: null,
    userIsPend: null,
    userIsDecl: null,
    eventIsPast: null,
    userIsAuthor: null,
  });

  console.log("EventBtns render counter: ", counter);
  counter += 1;

  useEffect(() => {
    console.log("EventBtns full rerender");
  }, []);

  useEffect(() => {
    if (propContext) {
      setLocalContext(propContext);
    } else {
      setLocalContext(context);
    }
  }, [context, propContext]);

  useEffect(() => {
    console.log("EventButtons Eff ", event, event._id, localContext._id, data);
    let userIsAtt = false;
    let userIsPend = false;
    let userIsDecl = false;
    let eventIsPast = false;
    let userIsAuthor = false;

    if (event.author._id === localContext._id) {
      console.log("UserIsAuthor");
      userIsAuthor = true;
    }

    if (event.dateEnd) {
      const todayDate = new Date();
      const eventDate = new Date(event.dateEnd);

      if (todayDate < eventDate) {
        console.log("EventIsFuture");
        eventIsPast = false;
      } else {
        console.log("EventIsPast");
        eventIsPast = true;
      }
    }

    if (data && data.showBookings && !userIsAuthor) {
      // First filter only booking of current user
      const filteredUserBooking = data.showBookings.filter(
        booking => booking.user._id === localContext._id
      );
      console.log("FILTERED BOOKING: ", filteredUserBooking);
      // First filter only booking of current user
      filteredUserBooking.map(booking => {
        console.log("JUDGEING THIS BOOKING: ", booking);

        if (!booking.confirmed && !booking.cancelled && !booking.decided) {
          console.log("UserIsPending");
          userIsPend = true;
        }

        if (booking.confirmed && !booking.cancelled && booking.decided) {
          console.log("UserIsAtt");
          userIsAtt = true;
        }

        if (!booking.confirmed && !booking.cancelled && booking.decided) {
          console.log("UserIsDeclined");
          userIsDecl = true;
        }
      });
    }

    console.log(
      "StateOfMyBooking: Att, Pend, Decl, Past, Author ",
      userIsAtt,
      userIsPend,
      userIsDecl,
      eventIsPast,
      userIsAuthor
    );

    setStateOfMyBooking({
      userIsAtt: userIsAtt,
      userIsPend: userIsPend,
      userIsDecl: userIsDecl,
      eventIsPast: eventIsPast,
      userIsAuthor: userIsAuthor,
    });
  }, [event, event._id, localContext._id, data]); // && data.showBookings

  const alertCancelBooking = () => {
    var r = window.confirm(
      "Are you sure you want to cancel this booking request?"
    );
    if (r == true) {
      deleteBooking({
        variables: {
          user_id: localContext._id,
          event_id: event._id,
        },
        refetchQueries: () => [
          // TODO: move this into hook??
          {
            query: GET_ONE_EVENT,
            variables: { event_id: event._id },
          },
          {
            query: EVENT_BOOKINGS,
            variables: { event_id: event._id },
          },
          {
            query: ALL_EVENTS,
            variables: {
              date: new Date(event.dateStart).toISOString().split("T")[0],
            },
          },
          {
            query: PROFILE_DATA,
            variables: { host_id: localContext._id },
          },
          {
            query: PLAY_EVENTS_QUERY,
            variables: {
              plusDays: localContext.playFilterObj.filterOn
                ? localContext.playFilterObj.plusDays
                : 10000,
              lng: localContext.playFilterObj.geolocationPlay
                ? localContext.playFilterObj.geolocationPlay.lng
                : null,
              lat: localContext.playFilterObj.geolocationPlay
                ? localContext.playFilterObj.geolocationPlay.lat
                : null,
              radius: localContext.playFilterObj.filterOn
                ? localContext.playFilterObj.radius
                : 9999999,
              shownEvents: localContext.playFilterObj.shownEvents,
            },
          },
        ],
      });
    } else {
      return;
    }
  };

  const handleCancelOfEvent = () => {
    var r = window.confirm("Are you sure you want to calcel this event?");
    if (r == true) {
      cancelEvent({
        variables: {
          event_id: event._id,
        },
        refetchQueries: () => [
          {
            query: ALL_EVENTS,
            variables: { date: new Date().toISOString() }, //TODO..
          },
          {
            query: GET_ONE_EVENT,
            variables: { event_id: event._id },
          },
          {
            query: EVENT_BOOKINGS,
            variables: { event_id: event._id },
          },
        ],
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    const ArrOfComponents = [];
    // ACTIVE EVENT
    if (
      event &&
      !event.hide &&
      event.author._id != localContext._id &&
      localContext._id &&
      !stateOfMyBooking.eventIsPast &&
      !stateOfMyBooking.userIsDecl &&
      !stateOfMyBooking.userIsPend &&
      !stateOfMyBooking.userIsDeclined
    ) {
      ArrOfComponents.push(
        <JoinSend event={event} localContext={localContext} />
      );
    }

    // NO LOGED IN
    if (!localContext.name) {
      ArrOfComponents.push(
        <Button
          startIcon={<CloseIcon />}
          color="secondary"
          variant="contained"
          fullWidth
          onClick={() => {
            history.push({
              pathname: history.location.pathname,
              search: `?signin=true`,
            });
          }}
        >
          LOGIN first
        </Button>
      );
    }
    // CANCELLED EVENT
    if (event && event.hide) {
      ArrOfComponents.push(
        <Button
          label={``}
          icon={<CloseIcon />}
          color="primary"
          variant="contained"
          fullWidth
          disabled={true}
          classes={{
            disabled: classes.disabledButton,
          }}
        >
          CANCELLED by author
        </Button>
      );
    }

    // PAST EVENT
    if (stateOfMyBooking.eventIsPast) {
      ArrOfComponents.push(
        <Button
          startIcon={<CloseIcon />}
          color="primary"
          variant="contained"
          disabled={true}
          classes={{
            disabled: classes.disabledButton,
          }}
          fullWidth
        >
          PAST EVENT
        </Button>
      );
    }

    // USER is Pending
    if (localContext._id && stateOfMyBooking.userIsPend) {
      ArrOfComponents.push(
        <Button
          startIcon={<HourglassEmptyIcon />}
          color="primary"
          variant="contained"
          // disabled={true}
          fullWidth
        >
          Pending request
        </Button>
      );
    }

    // USER is Declined
    if (localContext._id && stateOfMyBooking.userIsDecl) {
      ArrOfComponents.push(
        <Button
          icon={<CloseIcon />}
          color="primary"
          variant="contained"
          disabled={true}
          classes={{
            disabled: classes.disabledButton,
          }}
          fullWidth
        >
          Declined request
        </Button>
      );
    }

    console.log(
      "Rate: ",
      localContext._id,
      stateOfMyBooking.eventIsPast,
      stateOfMyBooking.userIsAtt
    );

    // PAST EVENT RATE OR RATED
    if (
      localContext._id &&
      stateOfMyBooking.eventIsPast &&
      stateOfMyBooking.userIsAtt
    ) {
      ArrOfComponents.push(<ModalRate event={event} />);
    }

    if (
      localContext._id &&
      (stateOfMyBooking.userIsAtt || stateOfMyBooking.userIsPend) &&
      !stateOfMyBooking.eventIsPast
    ) {
      ArrOfComponents.push(
        <Button
          startIcon={<CloseIcon />}
          color="secondary"
          variant="contained"
          fullWidth
          onClick={alertCancelBooking}
        >
          {`CANCEL your ${
            stateOfMyBooking.userIsAtt ? "attendance" : "request"
          }`}
        </Button>
      );
    }

    // OWNER of active event

    if (
      !stateOfMyBooking.eventIsPast &&
      stateOfMyBooking.userIsAuthor &&
      !event.hide
    ) {
      ArrOfComponents.push(
        <Button
          icon={<CloseIcon />}
          color="secondary"
          variant="contained"
          fullWidth
          onClick={handleCancelOfEvent}
        >
          CANCEL this event
        </Button>
      );
    }
    setPrintComponents(ArrOfComponents);
  }, [event, stateOfMyBooking]);

  console.log(
    `EventButtons stateOfMyBooking for event: ${event.name} is:`,
    stateOfMyBooking
  );
  return printComponents.map(item => {
    return item;
  });
});

const useStyles = makeStyles(theme => ({
  buttonCls: {
    margin: 10,
    width: "50%",
  },
  disabledBtn: {
    background: "white !important",
  },
  trueBtn: {
    width: "100%",
    height: 60,
    borderRadius: 0,
  },
}));

// export default EventButtons;
export default MemoizedEventBtns;
// const EventButtonsMemoized = React.memo(EventButtons);
// export default EventButtonsMemoized;
