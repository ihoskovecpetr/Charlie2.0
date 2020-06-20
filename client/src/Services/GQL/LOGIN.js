import gql from "graphql-tag";

export const LOGIN = gql`
  mutation login($emailOrName: String!, $password: String!) {
    login(emailOrName: $emailOrName, password: $password) {
      dataOut {
        _id
        success
        name
        email
        telephone
        picture
        description
        token
      }
      errorOut {
        name
        message
      }
    }
  }
`;
