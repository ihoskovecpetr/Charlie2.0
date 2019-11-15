export const typeDef = `
  extend type Query {
    book(id: Int!): Book
  }
  type Book {
    title: String
    author: Author
  }
`;
export const resolvers = {
  Query: {
    book: () => { 
      console.log("book: ()") 
      return {title: "Ona "}
    },
  },
  Book: {
    author: () => { 
      console.log("book author: ()")
      return  {firstName: "Jana sama doma"}
   },
  }
};