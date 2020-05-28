import gql from "graphql-tag";

export const GET_ONE_EVENT = gql`
  query getOneEvent($event_id: ID!) {
    getOneEvent(event_id: $event_id) {
      _id
      success
      message
      name
      dateStart
      dateEnd
      address
      capacityMax
      price
      currency
      description
      BYO
      freeSnack
      confirmed
      hide
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
        user{
          _id
          name
          picture
        }
        host{
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