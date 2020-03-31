import React, { useState, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { UserContext } from "../../userContext";
import {PROFILE_DATA} from "../../Services/GQL";

import PlayPageList from "../../Molecules/play/PlayPageList";

const ONE_EVENT = gql`
  query getOneEvent($id: ID!) {
    getOneEvent(id: $id) {
      bookings{
        _id
        confirmed
        cancelled
        user{
          _id
          name
          picture
        }
        event{
            _id
            dateStart
          }
      }
    }
  }
`;


export default function PlayListWrap({ event }) {
  const classes = useStyles();
  const { context } = useContext(UserContext);
  const { loading, error, data, refetch } = useQuery(ONE_EVENT, {
    variables: { id: event._id }
    //skip: !id,
    //pollInterval: 500
  });
  
  console.log("PlayListWrap: loading, error, data ", loading, error, data);
  console.log("PlayListWrap eventt:  ", event);
  console.log("PlayListWrap bookingss:  ", data && data.getOneEvent && data.getOneEvent.bookings);

let eventsRefilled = event

if(data){
    eventsRefilled.bookings = data.getOneEvent.bookings
}

  return (
    <>
        <PlayPageList
            event={event}
            bookings={data && data.getOneEvent && data.getOneEvent.bookings}
            
            // showBookings={dataDB.showBookings} //showBookings
            GQL_refetch={PROFILE_DATA}
            refetchVariables={{host_id: context._id}}
            paddingSides={"0px"}
            // cancelBooking={cancelBooking}
            // cancelledState={cancelledState}
            />
    </>
  );
}

const useStyles = makeStyles(theme => ({
  mainItem: {
    // borderRadius: 15,
  },
}));
