import gql from "graphql-tag";

export const SEEN_BOOKING = gql`
mutation markBookingSeen(
  $event_id: ID!
  $user: Boolean
) {
  markBookingSeen(
    event_id: $event_id
    user: $user
  ) {
    success
  }
}
`;