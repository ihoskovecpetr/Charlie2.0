export const typeDef = `
  extend type Query {
    login(email: String! password: String!): User
  }

  type User {
    success: Boolean
    id: Int!
    name: String
    email: String
    books: [Book]
  }
`;
export const resolvers = {
  Query: {
    login: (_ , _args) => { console.log("login ME", _args.email, _args.password)
    if(_args.email == "petr@gmail.com" && _args.password == "heslo"){
        return {success: true}
    }
        return {success: false}
        
        },
  }
};