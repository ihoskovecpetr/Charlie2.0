import gql from "graphql-tag";

export const NEW_USER = gql`
  mutation newUser(
    $name: String!
    $email: String!
    $telephone: String
    $password: String!
    $description: String!
    $picture: String
    $typeSocial: Boolean
    $typeDirect: Boolean
  ) {
    newUser(
      name: $name
      email: $email
      telephone: $telephone
      password: $password
      description: $description
      picture: $picture
      typeSocial: $typeSocial
      typeDirect: $typeDirect
    ) {
      dataOut{
      success
      name
      _id
      token
      password
      email
      telephone
      picture
      description
      typeSocial
      typeDirect
      }
      errorOut{
        name
        message
      }

    }
  }
`;