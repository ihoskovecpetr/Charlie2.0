import gql from "graphql-tag";

export const LOGIN_EXTERNAL = gql`
  mutation loginExternal(
        $email: String!,
        $id: String!
      ){
        loginExternal(email: $email, id: $id) {
            dataOut{
                success
                _id
                name
                email
                telephone
                description
                picture
                token
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