import gql from "graphql-tag";

export const USER_RATINGS = gql`
query showRatings($host_id: ID!) {
  showRatings(host_id: $host_id) {
    message
    ratingValue
    createdAt
    guest {
      picture
      name
    }
    event {
      _id
      name
      address
      dateStart
      dateEnd
      price
      currency
      geometry {
        coordinates
      }
    }
  }
}
`;
