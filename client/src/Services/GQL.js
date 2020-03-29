import gql from "graphql-tag";

export const ALL_EVENTS = gql`
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
        _id
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
      bookings {
        _id
        confirmed
        cancelled
        user {
          _id
        }
      }
    }
  }
`;

export const PROFILE_DATA = gql`
  query showRatings($host_id: ID!) {
    userEvents(user_id: $host_id) {
      createdAt
      updatedAt
      _id
      success
      name
      price
      currency
      dateStart
      address
      description
      areYouAuthor
      author {
        _id
        name
        picture
        description
      }
      geometry {
        coordinates
      }
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
    showRatings(host_id: $host_id) {
      createdAt
      updatedAt
      _id
      message
      ratingValue
      guest {
        _id
        picture
        name
      }
      event {
        _id
        name
        dateStart
        geometry {
          coordinates
        }
      }
    }
    showUserBookings(user_id: $host_id) {
      createdAt
      updatedAt
      message
      response
      confirmed
      cancelled
      decided
      host {
        _id
        name
      }
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
        price
        currency
        address
        areYouAuthor
        geometry {
          coordinates
        }
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
        author {
          _id
          name
          picture
          description
        }
      }
    }

    showHostBookings(host_id: $host_id) {
      createdAt
      updatedAt
      message
      response
      confirmed
      cancelled
      decided
      host {
        _id
        name
      }
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
        geometry {
          coordinates
        }
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
        author {
          _id
          name
          picture
        }
      }
    }
  }
`;

export const CANCELLING_BOOKING = gql`
  mutation cancelBooking($user_id: String!, $event_id: String!) {
    cancelBooking(user_id: $user_id, event_id: $event_id) {
      _id
      success
    }
  }
`;
