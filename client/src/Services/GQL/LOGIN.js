import gql from "graphql-tag";

export const LOGIN = gql`
  mutation getLoggedInUser{
    getLoggedInUser {
      _id
      success
      name
      email
      picture
      description
    }
  }
`;