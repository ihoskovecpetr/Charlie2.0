import gql from "graphql-tag";

export const EVENT_RATINGS = gql`
query showRatings($event_id: ID!) {
  showRatings(event_id: $event_id) {
    guest {
      picture
      name
    }
    message
    ratingValue
    createdAt
  }
}
`;