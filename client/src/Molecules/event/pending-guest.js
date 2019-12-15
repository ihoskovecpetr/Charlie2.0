import React from "react";
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

const CONFIRM_BOOKING = gql`
  mutation confirmBooking($event_id: ID!, $user_id: ID!) {
    confirmBooking(event_id: $event_id, user_id: $user_id) {
      success
    }
  }
`;

export default function PendingGuest(props) {
  const [confirmBooking, confirmStates] = useMutation(CONFIRM_BOOKING);

  const useStyles = makeStyles(theme => ({
    card: {
      //maxWidth: 345,
      //minWidth: 300,
      width: "100%",
      display: "block",
      marginBottom: 5
    },
    cardHeader: {
      width: "100%"
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    avatar: {},
    starContainer: {
      fontSize: 20
    }
  }));

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src={props.booking.user.picture}
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
        title={props.booking.user.name}
        //title={props.rating.guest.name}
        subheader={props.booking.message}
      />
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            confirmBooking({
              variables: {
                user_id: props.booking.user._id,
                event_id: props.event._id
              },
              refetchQueries: () => [
                {
                  query: props.ONE_EVENT,
                  variables: { id: props.event._id }
                }
              ]
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
