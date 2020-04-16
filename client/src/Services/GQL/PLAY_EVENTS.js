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
      message
      name
      areYouAuthor
      author {
        _id
        name
        picture
        description
      }
      dateStart
      geometry {
        coordinates
      }
      address
      capacityMax
      price
      description
      BYO
      currency
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
      confirmed
      areYouAuthor
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