import React, { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { NavLink, useHistory } from "react-router-dom";

import { useXsSize } from "../../Hooks/useXsSize";
import { UserContext } from "../../userContext";
import { sortByDate } from "../../Services/functions";

import EventCardProfile from "../../Atoms/Profile/EventCardProfile";

export default function UserEventsProfile({ showUserBookings, userEvents }) {
  const classes = useStyles();
  const [sortedEvents, setSortedEvents] = useState([]);

  useEffect(() => {
    // const justShowUserBookings = showUserBookings.map((item) => {
    //   return item.event;
    // });

    const justUserEvents = userEvents.map((item) => {
      let extEvent = item;
      extEvent.areYouAuthor = true;
      return extEvent;
    });

    let sortedEventsPrep = sortByDate(
      [
        ...justUserEvents, // ...justShowUserBookings
      ],
      "dateStart",
      "DESC"
    );

    console.log("Profile Person Events: ", userEvents, justUserEvents);

    setSortedEvents(sortedEventsPrep);
  }, [userEvents]); //showUserBookings

  console.log(
    "sortedEvents && sortedEvents.length > 1",
    sortedEvents && sortedEvents.length > 0,
    sortedEvents
  );

  return (
    <Grid
      container
      justify="center"
      direction="column"
      alignItems="flex-start"
      alignContent="center"
      className={classes.mainContainer}
    >
      {sortedEvents &&
        sortedEvents.length > 0 &&
        sortedEvents.map((event, index) => (
          <Grid item xs={12} key={index} className={classes.itemGrid}>
            <Grid container justify="center" className={classes.itemContainer}>
              <EventCardProfile event={event} />
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: "100%",
  },
  itemContainer: {
    width: "100%",
  },
  itemGrid: {
    width: "100%",
  },
}));
