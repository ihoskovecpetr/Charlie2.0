import gql from "graphql-tag";

export const PLAY_EVENTS_QUERY = gql`
  query getJoinEvents(
    $plusDays: Int!
    $lng: Float
    $lat: Float
    $radius: Int
    $shownEvents: [ID]
  ) {
    getJoinEvents(
      playInput: {
        plusDays: $plusDays
        lng: $lng
        lat: $lat
        radius: $radius
        shownEvents: $shownEvents
      }
    ) {
      _id
      success
      name
      dateStart
      dateEnd
      happeningNow
      address
      capacityMax
      price
      description
      BYO
      currency
      confirmed
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
        marginLeft
        vwidth
      }
      bookings {
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
        }
      }
    }
  }
`;
