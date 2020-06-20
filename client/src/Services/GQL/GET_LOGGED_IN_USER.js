import gql from "graphql-tag";

export const GET_LOGGED_IN_USER = gql`
  mutation getLoggedInUser{
    getLoggedInUser {
      _id
      success
      name
      email
      telephone
      picture
      description
    }
  }
`;