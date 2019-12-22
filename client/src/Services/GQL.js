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
