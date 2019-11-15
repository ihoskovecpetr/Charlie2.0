export const typeDef = `
  type Book {
    title: String
    author: Author
  }
`;
export const resolvers = {
  Book: {
    author: () => {
      console.log("Author resolver");
    }
  }
};
