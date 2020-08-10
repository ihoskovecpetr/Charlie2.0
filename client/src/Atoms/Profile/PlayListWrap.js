import React, { useState, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { UserContext } from "../../Contexts/userContext";
import { PROFILE_DATA } from "src/Services/GQL/PROFILE_DATA";
import { GET_ONE_EVENT } from "src/Services/GQL/GET_ONE_EVENT";

import PlayPageList from "../../Molecules/play/PlayPageList";

export default function PlayListWrap({ event }) {
  const { context } = useContext(UserContext);
  const { loading, error, data } = useQuery(GET_ONE_EVENT, {
    variables: { event_id: event._id },
  });

  let eventsRefilled = event;

  if (data) {
    eventsRefilled.bookings = data.getOneEvent.bookings;
  }

  return (
    <PlayPageList
      event={event}
      bookings={data && data.getOneEvent && data.getOneEvent.bookings}
      GQL_refetch={PROFILE_DATA}
      refetchVariables={{ host_id: context._id }}
      paddingSides={"0px"}
    />
  );
}
