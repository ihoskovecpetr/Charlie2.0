export const typeDef = `
  extend type Query {
    author(id: Int!): Author
  }
  type Author {
    id: Int!
    firstName: String
    lastName: String
    books: [Book]
  }
`;
export const resolvers = {
  Query: {
    author: () => { console.log("Query author")
        return{firstName: "Author naprimo"} 
},
  },
  Author: {
    books: () => { console.log("Query ěě")
        return[{title: "XX porn"}]
 },
  }
};