import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

function EventButtons(props) {
  let userIsAttending = false;
  console.log("Event Buttons: ", props);
  if (props.data && props.data.showBookings) {
    props.data.showBookings.map(booking => {
      console.log(
        "Compare booking User and User: ",
        props.user._id,
        booking.user._id
      );
      if (props.user._id == booking.user._id && booking.confirmed) {
        userIsAttending = true;
      }
    });
  }
  return (
    <>
      <p>EventButtons</p>
      <Grid item>
        {props.data && props.data.getOneEvent.areYouAuthor && (
          <Button variant="contained" color="secondary">
            Delete this event
          </Button>
        )}
        {!userIsAttending && (
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
                e.preventDefault()
              props.createBooking({
                variables: {
                  user_id: props.user._id,
                  event_id: props.data.getOneEvent._id
                }
              });
            }}
          >
            Book this event
          </Button>
        )}
        {userIsAttending && (
          <Button variant="contained" color="primary">
            Cancel Attendance
          </Button>
        )}
      </Grid>
    </>
  );
}

export default EventButtons;
