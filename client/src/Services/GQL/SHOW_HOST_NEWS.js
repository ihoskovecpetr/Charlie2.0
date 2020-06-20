import gql from "graphql-tag";

export const SHOW_HOST_NEWS = gql`
  query showHostNews($host_id: ID!) {
    showRatings(host_id: $host_id) {
      _id
      createdAt
      updatedAt
      message
      ratingValue
      seenHost
      guest {
        _id
        picture
        name
      }
      event {
        _id
        name
      }
    }
    showUserBookings(user_id: $host_id) {
      _id
      entered
      seenUser
      seenHost
      host {
        _id
        name
        picture
      }
      user {
        _id
        name
        picture
      }
      event {
        _id
        success
        name
      }
    }
    showHostBookings(host_id: $host_id) {
      _id
      seenUser
      seenHost
      host {
        _id
        name
        picture
      }
      user {
        _id
        name
        picture
      }
      event {
        _id
        name
      }
    }
  }
`;
