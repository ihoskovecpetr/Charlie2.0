export const typeDef = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    books: [Book]
  }
`;
export const resolvers = {
  Author: {
    books: () => {
      console.log("Books resolver");
    }
  }
};
