import gql from "graphql-tag";

export const PROFILE_DATA = gql`
  query profileData($host_id: ID!) {
    userEvents(user_id: $host_id) {
      _id
      createdAt
      updatedAt
      success
      name
      dateStart
      dateEnd
      price
      BYO
      capacityMax
      address
      currency
      description
      happeningNow
      areYouAuthor
      hide
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
        createdAt
        updatedAt
        success
        name
        dateStart
        dateEnd
        price
        BYO
        capacityMax
        address
        currency
        description
        happeningNow
        areYouAuthor
        hide
        geometry {
          coordinates
        }
      }
    }
    showUserBookings(user_id: $host_id) {
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
        createdAt
        updatedAt
        success
        name
        dateStart
        dateEnd
        price
        BYO
        capacityMax
        address
        currency
        description
        happeningNow
        areYouAuthor
        hide
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
        bookings {
          response
          confirmed
          cancelled
          decided
          host {
            _id
          }
        }
      }
    }
    showHostBookings(host_id: $host_id) {
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
        createdAt
        updatedAt
        success
        name
        dateStart
        dateEnd
        price
        BYO
        capacityMax
        address
        currency
        description
        happeningNow
        areYouAuthor
        hide
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
