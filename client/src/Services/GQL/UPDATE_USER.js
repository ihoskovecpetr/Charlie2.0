import gql from "graphql-tag";

export const UPDATE_USER = gql`
  mutation updateUser(
    $name: String
    $email: String
    $description: String
    $picture: String
  ) {
    updateUser(
      name: $name
      email: $email
      description: $description
      picture: $picture
    ) {
      dataOut{
      success
      name
      _id
      token
      password
      email
      }
      errorOut{
        name
        message
      }

    }
  }
`;
