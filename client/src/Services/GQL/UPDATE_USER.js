import gql from "graphql-tag";

export const UPDATE_USER = gql`
  mutation updateUser(
    $_id: ID
    $name: String
    $email: String
    $description: String
    $picture: String
    $telephone: String
    $socialId: String
    $typeSocial: Boolean
    $typeDirect: Boolean
  ) {
    updateUser(
      _id: $_id
      name: $name
      email: $email
      description: $description
      picture: $picture
      telephone: $telephone
      socialId: $socialId
      typeSocial: $typeSocial
      typeDirect: $typeDirect
    ) {
      dataOut {
        success
        _id
        name
        token
        password
        email
        telephone
        socialId
        typeSocial
        typeDirect
      }
      errorOut {
        name
        message
      }
    }
  }
`;
