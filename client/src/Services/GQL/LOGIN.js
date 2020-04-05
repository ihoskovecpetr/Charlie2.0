import gql from "graphql-tag";

export const LOGIN = gql`
  mutation getLoggedInUser(
    $user_id: ID
  ){
    getLoggedInUser(user_id: $user_id) {
      _id
      success
      name
      email
      picture
      description
    }
  }
`;