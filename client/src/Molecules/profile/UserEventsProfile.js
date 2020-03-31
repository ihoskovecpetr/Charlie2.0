import React, { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CreateIcon from "@material-ui/icons/Create";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

import { NavLink, useHistory } from "react-router-dom";

import { useXsSize } from "../../Hooks/useXsSize";
import { UserContext } from "../../userContext";
import { sortByDate } from "../../Services/functions";

import EventCardProfile from "../../Atoms/Profile/EventCardProfile";

export default function UserEventsProfile({ showUserBookings, userEvents }) {
  const classes = useStyles();
  const history = useHistory();
  const { md_size_memo } = useXsSize();
  const { context } = useContext(UserContext);
  const [sortedEvents, setSortedEvents] = useState([]);


  useEffect(() => {

  console.log("showUserBookings: ", showUserBookings);
  console.log("userEvents: ", userEvents);

    const justShowUserBookings = showUserBookings.map(item => {
        return item.event
    })

    const justUserEvents = userEvents.map(item => {
        let extEvent = item
        extEvent.areYouAuthor = true
        return extEvent
    })

    console.log("justUserEvents: ", justUserEvents);


    let sortedEventsPrep = sortByDate([
        ...justShowUserBookings,
        ...justUserEvents
    ], "dateStart", "DESC");

    console.log("sortedEvents: ", sortedEventsPrep);
    setSortedEvents(sortedEventsPrep)

  },[ userEvents, showUserBookings ])

  return (
    <Grid
    container
    justify="center"
    direction="column"
    alignItems="flex-start"
    alignContent="center"
    className={classes.mainContainer}
  >
    {userEvents && showUserBookings && sortedEvents && sortedEvents.map((event, index) => (
        <Grid item xs={12} key={index} className={classes.itemGrid}>
            <Grid container justify="center" className={classes.itemContainer}>
                <EventCardProfile event={event} />
            </Grid>
        </Grid>
      ))}
    {/* {userEvents && userEvents.map((event, index) => (
        <Grid item key={index} style={{ width: "100%" }}>
          <EventCard event={event} />
        </Grid>
      ))} */}
  </Grid>
  );
}

const useStyles = makeStyles(theme => ({
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
