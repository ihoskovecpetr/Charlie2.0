import gql from "graphql-tag";

export const EVENT_BOOKINGS = gql`
  query showBookings($event_id: ID!) {
    showBookings(event_id: $event_id) {
      _id
      createdAt
      updatedAt
      message
      response
      confirmed
      cancelled
      decided
      entered
      seenUser
      seenHost
      user {
        _id
        name
        picture
      }
      event {
        _id
        name
        description
        dateStart
        dateEnd
        happeningNow
        address
        price
        currency
        geometry {
          coordinates
        }
        imagesArr {
          caption
          src
          thumbnail
          thumbnailHeight
          thumbnailWidth
          marginLeft
          vwidth
        }
        author {
          _id
          name
          picture
        }
      }
    }
  }
`;
