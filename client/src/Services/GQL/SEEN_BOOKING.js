import gql from "graphql-tag";

export const SEEN_BOOKING = gql`
mutation markBookingSeen(
  $booking_id: ID!
  $user: Boolean
) {
  markBookingSeen(
    booking_id: $booking_id
    user: $user
  ) {
    success
  }
}
`;