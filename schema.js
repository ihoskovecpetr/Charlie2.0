//import { makeExecutableSchema } from "graphql-tools";
const { merge } = require("lodash");
const { typeDef as Author, resolvers as authorResolvers } = require("./author.js");
const { typeDef as Book, resolvers as bookResolvers } = require ("./book.js");
const Query = `
  type Query {
    author(id: Int!): Author
    book(id: Int!): Book
  }
`;
const resolversLocal = {
  Query: {}
};

const typeDefsS = [Query, Author, Book];
const resolversS = merge(resolversLocal, authorResolvers, bookResolvers);

export { typeDefsS, resolversS };
