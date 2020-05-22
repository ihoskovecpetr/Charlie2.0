import React, { useState, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { UserContext } from "../../userContext";
import { PROFILE_DATA } from "src/Services/GQL/PROFILE_DATA";
import { GET_ONE_EVENT } from "src/Services/GQL/GET_ONE_EVENT";

import PlayPageList from "../../Molecules/play/PlayPageList";


export default function PlayListWrap({ event }) {
  const classes = useStyles();
  const { context } = useContext(UserContext);
  const { loading, error, data, refetch } = useQuery(GET_ONE_EVENT, {
    variables: { event_id: event._id }
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
  
            GQL_refetch={PROFILE_DATA}
            refetchVariables={{host_id: context._id}}
            paddingSides={"0px"}
            />
    </>
  );
}

const useStyles = makeStyles(theme => ({
  mainItem: {
    // borderRadius: 15,
  },
}));
