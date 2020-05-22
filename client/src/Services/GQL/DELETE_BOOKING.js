import gql from "graphql-tag";

export const DELETE_BOOKING = gql`
  mutation deleteBooking($event_id: ID!, $user_id: ID!) {
    deleteBooking(event_id: $event_id, user_id: $user_id) {
      success
    }
  }
`;