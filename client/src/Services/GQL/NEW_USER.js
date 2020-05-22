import gql from "graphql-tag";

export const NEW_USER = gql`
  mutation newUser(
    $name: String!
    $email: String!
    $password: String!
    $description: String!
    $picture: String
    $type: String
  ) {
    newUser(
      name: $name
      email: $email
      password: $password
      description: $description
      picture: $picture
      type: $type
    ) {
      dataOut{
      success
      name
      _id
      token
      password
      email
      type
      }
      errorOut{
        name
        message
      }

    }
  }
`;