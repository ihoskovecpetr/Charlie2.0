import React, { useEffect, useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CloseIcon from '@material-ui/icons/Close';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from "@material-ui/core/styles";

import { withRouter, NavLink, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { UserContext } from "src/userContext";
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


function EventButtons({event}) {
  const classes = useStyles();
  let history = useHistory();
  const { context } = useContext(UserContext);
  const {loading, data, error} = useQuery(EVENT_BOOKINGS, {
    variables: { event_id: event._id }
  });
  const [deleteBooking, deleteBookingStates] = useMutation(DELETE_BOOKING);
  const [cancelEvent, cancelEventState] = useMutation(CANCEL_EVENT);

  const [printComponents, setPrintComponents] = useState([])

  const [stateOfMyBooking, setStateOfMyBooking] = useState({
    userIsAtt: null,
    userIsPend: null,
    userIsDecl: null,
    eventIsPast: null,
    userIsAuthor: null,
  })

  console.log("RERENDER EVENTBTNS")


  useEffect(() => {

      let userIsAtt = false
      let userIsPend = false
      let userIsDecl = false
      let eventIsPast = false
      let userIsAuthor = false

    if (event.author._id === context._id) {
      console.log("UserIsAuthor")
      userIsAuthor = true
    }

    if (event.dateStart) {
      const todayDate = new Date();
      const eventDate = new Date(event.dateStart);

      if (todayDate < eventDate) {
        console.log("EventIsFuture")
        eventIsPast = false
      } else {
        console.log("EventIsPast")
        eventIsPast = true
      }
    }
    
    if (data && data.showBookings && !userIsAuthor) {
      
      // First filter only booking of current user
      const filteredUserBooking = data.showBookings.filter(booking => booking.user._id === context._id)
      console.log("FILTERED BOOKING: ", filteredUserBooking)
      // First filter only booking of current user
       filteredUserBooking.map(booking => {

          console.log("JUDGEING THIS BOOKING: ", booking)

          if (!booking.confirmed && !booking.cancelled && !booking.decided) {
            console.log("UserIsPending")
            userIsPend = true
          }

          if (booking.confirmed && !booking.cancelled && booking.decided) {
            console.log("UserIsAtt")
            userIsAtt = true
          }

          if (!booking.confirmed && !booking.cancelled && booking.decided) {
            console.log("UserIsDeclined")
            userIsDecl = true
          }
      });
    }

    console.log("StateOfMyBooking: Att, Pend, Decl, Past, Author ", userIsAtt, userIsPend, userIsDecl, eventIsPast, userIsAuthor)

    setStateOfMyBooking({
      userIsAtt: userIsAtt,
      userIsPend: userIsPend,
      userIsDecl: userIsDecl,
      eventIsPast: eventIsPast,
      userIsAuthor: userIsAuthor
    })

  }, [event, event._id, data, context, data && data.showBookings]);

  const alertCancelBooking = () => {
    var r = window.confirm("Are you sure you want to cancel this booking request?");
    if (r == true) {
      deleteBooking({
      variables: {
        user_id: context._id,
        event_id: event._id
      },
      refetchQueries: () => [
        {
          query: GET_ONE_EVENT,
          variables: { event_id: event._id }
        },
        {
          query: EVENT_BOOKINGS,
          variables: { event_id: event._id }
        },
        {
          query: ALL_EVENTS,
          variables: {
            date: new Date(event.dateStart)
              .toISOString()
              .split("T")[0]
          }
        },
        {
          query: PROFILE_DATA,
          variables: { host_id: context._id }
        },
        {
          query: PLAY_EVENTS_QUERY,
          variables: {
            plusDays: context.filterOn ? context.days : 10000,
            lng: context.geolocationObj ? context.geolocationObj.lng : null,
            lat: context.geolocationObj ? context.geolocationObj.lat : null,
            radius: context.filterOn ? context.radius : 9999999,
            shownEvents: context.shownEvents
          }
        }
      ]
    });
    } else {
      return
    }
  }

  const cancelEventHandle = () => {
    var r = window.confirm("Are you sure you want to calcel this event?");
    if (r == true) {
    cancelEvent({
      variables: {
        event_id: event._id
      },
      refetchQueries: () => [
        {
          query: ALL_EVENTS,
          variables: { date: new Date().toISOString() } //TODO..
        },
        {
          query: GET_ONE_EVENT,
          variables: { event_id: event._id }
        },
        {
          query: EVENT_BOOKINGS,
          variables: { event_id: event._id }
        },
      ]
    });
  }else{
    return
  }
  }


useEffect(() => {

const ArrOfComponents = []
  // ACTIVE EVENT
  if(event && !event.hide && event.author._id != context._id 
    && context._id && !stateOfMyBooking.eventIsPast && !stateOfMyBooking.userIsDecl  
    && !stateOfMyBooking.userIsPend && !stateOfMyBooking.userIsDeclined){
    ArrOfComponents.push(
     <JoinSend event={event}/>
     )
}

  // NO LOGED IN
  if (!context.name){
    ArrOfComponents.push(
      <Chip 
      label={`LOGIN first`} 
      icon={<CloseIcon />}
      color="secondary" 
      className={classes.chipOne} 
      onClick={() => { history.push("/signin")}}
      />
    )

  }
  // CANCELLED EVENT
  if (event && event.hide){
    ArrOfComponents.push(
        <Chip 
        label={`CANCELLED by author`} 
        icon={<CloseIcon />}
        color="primary" 
        disabled={true}
        className={classes.chipOne} 
        />
    )
  }

    // USER DECLINED BY AUTHOR
    if (stateOfMyBooking.userIsDecl){
      ArrOfComponents.push(
          <Chip 
          label={`You got DECLINED`} 
          icon={<CloseIcon />}
          color="primary" 
          disabled={true}
          className={classes.chipOne} 
          />
      )
    }

  
  // PAST EVENT
  if (stateOfMyBooking.eventIsPast) {
    ArrOfComponents.push(
        <Chip 
        label={`PAST EVENT`} 
        icon={<CloseIcon />}
        color="primary" 
        disabled={true}
        className={classes.chipOne} 
      />
      )
    }

    // USER is Pending
    if(context._id && stateOfMyBooking.userIsPend ){
    ArrOfComponents.push(
        <Chip 
        label={`Pendining request`} 
        icon={<HourglassEmptyIcon />}
        color="primary" 
        disabled={true}
        className={classes.chipOne} 
      />
      )
    }

        // USER is Declined
        if(context._id && stateOfMyBooking.userIsDecl ){
          ArrOfComponents.push(
              <Chip 
              label={`Declined request`} 
              icon={<CloseIcon />}
              color="primary" 
              disabled={true}
              className={classes.chipOne} 
            />
            )
          }

// PAST EVENT RATE OR RATED
  if (context._id && stateOfMyBooking.eventIsPast && stateOfMyBooking.userIsAtt) {
    ArrOfComponents.push( 
      <ModalRate
        event={event}
      />
            )
    }

    if(context._id && (stateOfMyBooking.userIsAtt || stateOfMyBooking.userIsPend) && !stateOfMyBooking.eventIsPast){
      ArrOfComponents.push(
      <Chip 
        label={`CANCEL your ${stateOfMyBooking.userIsAtt ? 'attendance' : 'request'}`} 
        icon={<CloseIcon />}
        color="secondary" 
        className={classes.chipOne} 
        onClick={alertCancelBooking}
        />
  )}

  // OWNER of active event

  if(!stateOfMyBooking.eventIsPast && stateOfMyBooking.userIsAuthor && !event.hide){
    ArrOfComponents.push(
      <Chip 
        label={`CANCEL this event`} 
        icon={<CloseIcon />}
        color="secondary" 
        className={classes.chipOne} 
        onClick={cancelEventHandle}
        />
     )
}
setPrintComponents(ArrOfComponents)

},[event, stateOfMyBooking ])


console.log(`EventButtons stateOfMyBooking for event: ${event.name} is:`, stateOfMyBooking )
  return printComponents.map(item => {
    return item
  })
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
  },
  chipOne: {
    width: "90%", 
    fontWeight: 500, 
    fontSize: 25, 
    padding: 5, 
    margin: "5%"
    },
}));

export default withRouter(EventButtons);
