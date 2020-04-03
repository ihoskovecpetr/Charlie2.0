import gql from "graphql-tag";

export const GET_ONE_EVENT = gql`
  query getOneEvent($id: ID!) {
    getOneEvent(id: $id) {
      _id
      success
      message
      name
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
      currency
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
      confirmed
      hide
      areYouAuthor
      bookings{
        _id
        confirmed
        cancelled
        user{
          _id
          name
          picture
        }
        event{
          _id
          name
        }
      }
    }
  }
`;