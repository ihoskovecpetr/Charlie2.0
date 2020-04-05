import gql from "graphql-tag";

export const PROFILE_DATA = gql`
  query showRatings($host_id: ID!) {
    userEvents(user_id: $host_id) {
      _id
      createdAt
      updatedAt
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
        address
        dateStart
        price
        currency
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
      seenUser
      seenHost
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
      _id
      createdAt
      updatedAt
      message
      response
      confirmed
      cancelled
      decided
      seenUser
      seenHost
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
