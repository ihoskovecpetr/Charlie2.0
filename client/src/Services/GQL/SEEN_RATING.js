import gql from "graphql-tag";

export const SEEN_RATING = gql`
mutation markRatingSeen(
  $rating_id: ID!
) {
  markRatingSeen(
    rating_id: $rating_id
  ) {
    success
  }
}
`;