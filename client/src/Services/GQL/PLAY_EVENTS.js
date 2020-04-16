import gql from "graphql-tag";

export const PLAY_EVENTS = gql`
  mutation getPlayEvents(
    $plusDays: Int!
    $lng: Float
    $lat: Float
    $radius: Int
    $shownEvents: [ID]
  ) {
    getPlayEvents(
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
      happeningNow
      address
      capacityMax
      price
      description
      BYO
      currency
      confirmed
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
      bookings{
        _id
        confirmed
        cancelled
        decided
        user{
          _id
          name
          picture
        }
      }
    }

  }
`;