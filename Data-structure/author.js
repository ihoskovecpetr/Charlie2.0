export const typeDef = `
  extend type Query {
    author(id: Int!): Author
  }
  type Author {
    id: Int!
    firstName: String
    lastName: String
    src: String
  }
`;
export const resolvers = {
  Query: {
    author: () => {
        return{firstName: "Author naprimo"} 
},
  },
  Author: {
    books: () => { 
        return[{title: "XX FAKE"}]
 },
  }
};