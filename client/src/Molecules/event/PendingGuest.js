import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { ALL_EVENTS } from "src/Services/GQL";
import { PROFILE_DATA } from "src/Services/GQL/PROFILE_DATA";
import { UserContext } from "src/Contexts/userContext";

const CONFIRM_BOOKING = gql`
  mutation confirmBooking($event_id: ID!, $user_id: ID!, $decision: Boolean) {
    confirmBooking(
      event_id: $event_id
      user_id: $user_id
      decision: $decision
    ) {
      success
    }
  }
`;

export default function PendingGuest({ event, booking, ONE_EVENT }) {
  const [confirmBooking, confirmStates] = useMutation(CONFIRM_BOOKING);
  const { context } = useContext(UserContext);

  console.log(" PEnding GST event, booking: ", event, booking);

  const useStyles = makeStyles((theme) => ({
    card: {
      //maxWidth: 345,
      //minWidth: 300,
      width: "100%",
      display: "block",
      marginBottom: 5,
      backgroundColor: "rgba(0,0,0,0.1)",
      color: "white",
    },
    cardHeader: {
      width: "100%",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    avatar: {},
    starContainer: {
      fontSize: 20,
    },
  }));

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src={booking.user.picture}
            className={classes.avatar}
          >
            R
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={booking.user.name}
        //title={props.rating.guest.name}
        subheader={booking.message}
      />
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            console.log("Confirm Book: evt ", event);
            confirmBooking({
              variables: {
                user_id: booking.user._id,
                event_id: event._id,
                decision: true,
              },
              refetchQueries: () => [
                // {
                //   query: ONE_EVENT,
                //   variables: { id: event._id }
                // },
                {
                  query: ALL_EVENTS,
                  variables: {
                    date: new Date(event.dateStart).toISOString().split("T")[0],
                  },
                },
                {
                  query: PROFILE_DATA,
                  variables: {
                    host_id: context._id,
                  },
                },
              ],
            });
          }}
        >
          <ThumbUpIcon color="secondary" />
        </IconButton>
        <IconButton aria-label="share">
          <ThumbDownIcon color="primary" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
