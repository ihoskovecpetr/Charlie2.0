import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withRouter, NavLink } from "react-router-dom";
import gql from "graphql-tag";
import ModalJoin from "./event/modal-join";
import ModalRate from "./event/modal-rate";

const ALL_EVENTS = gql`
  query eventGeoDay(
    $date: String!
    $ne: Float
    $nw: Float
    $se: Float
    $sw: Float
  ) {
    eventGeoDay(date: $date, geoObj: { ne: $ne, nw: $nw, se: $se, sw: $sw }) {
      _id
      name
      confirmed
      author {
        name
        picture
      }
      dateStart
      dateEnd
      geometry {
        coordinates
      }
      address
      capacityMax
      price
      description
      BYO
      freeSnack
      imagesArr {
        caption
        src
        thumbnail
        thumbnailHeight
        thumbnailWidth
        scaletwidth
        marginLeft
        vwidth
      }
    }
  }
`;

function EventButtons(props) {
  let userIsAttending = false;
  let eventIsPast = false;
  console.log("EventButtons: ", props.data);

  // const sendBookingRequest = message => {
  //   props.createReqBooking({
  //     variables: {
  //       guest_id: props.user._id,
  //       guest_name: props.user.name,
  //       event_id: props.data.getOneEvent._id,
  //       message: message
  //     },
  //     refetchQueries: () => [
  //       {
  //         query: props.ONE_EVENT,
  //         variables: { id: props.match.params.id }
  //       }
  //     ]
  //   });

  //   // props.createBooking({
  //   //   variables: {
  //   //     user_id: props.user._id,
  //   //     event_id: props.data.getOneEvent._id
  //   //   },
  //   //   refetchQueries: () => [
  //   //     {
  //   //       query: props.ONE_EVENT,
  //   //       variables: { id: props.match.params.id }
  //   //     }
  //   //   ]
  //   // });
  // };

  if (props.data && props.data.getOneEvent.dateStart) {
    const todayDate = new Date();
    const eventDate = new Date(props.data.getOneEvent.dateStart);
    if (todayDate < eventDate) {
      eventIsPast = false;
    } else {
      eventIsPast = true;
    }

    console.log("TIME evaluace: ", eventIsPast, props.data.dateStart);
  }

  if (props.data && props.data.showBookings) {
    props.data.showBookings.map(booking => {
      if (
        props.user._id == booking.user._id &&
        booking.confirmed &&
        !booking.cancelled
      ) {
        userIsAttending = true;
      }
    });
  }

  {
    if (eventIsPast) {
      console.log("PASSSt: ", eventIsPast);
      console.log("userIsAttending: ", userIsAttending);
      return (
        <Grid item>
          {userIsAttending ? (
            <ModalRate
              event={props.data.getOneEvent}
              user={props.user}
              EVENT_RATINGS={props.EVENT_RATINGS}
            />
          ) : (
            <Button variant="contained" color="secondary">
              Past Event, did not attend
            </Button>
          )}

          {props.data && props.data.getOneEvent.areYouAuthor && (
            <Button variant="contained" color="secondary">
              Yours
            </Button>
          )}
          {props.data && !props.data.getOneEvent.areYouAuthor && (
            <Button variant="contained" color="secondary">
              Cizi
            </Button>
          )}
        </Grid>
      );
    }
  }

  return (
    <>
      <Grid item>
        {!userIsAttending && (
          <ModalJoin
            ONE_EVENT={props.ONE_EVENT}
            user={props.user}
            event={props.data.getOneEvent}
          />
        )}
        {userIsAttending && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={e => {
                e.preventDefault();
                props.cancelBooking({
                  variables: {
                    user_id: props.user._id,
                    event_id: props.data.getOneEvent._id
                  },
                  refetchQueries: () => [
                    {
                      query: props.ONE_EVENT,
                      variables: { id: props.match.params.id }
                    }
                  ]
                });
              }}
            >
              Cancel Attendance
            </Button>
          </>
        )}
      </Grid>
      {props.data && props.data.getOneEvent.areYouAuthor && (
        <Button
          variant="contained"
          color="secondary"
          onClick={e => {
            e.preventDefault();
            props.deleteOneEvent({
              variables: {
                delete_id: props.data.getOneEvent._id
              },
              refetchQueries: () => [
                {
                  query: ALL_EVENTS,
                  variables: { date: "2019-11-11" }
                }
              ]
            });
          }}
        >
          Delete this event
        </Button>
      )}
    </>
  );
}

export default withRouter(EventButtons);
