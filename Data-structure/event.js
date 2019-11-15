export const typeDef = `
  extend type Query {
    events(id: Int userId: Int ): Event
  }
  type Event {
    id: Int!
    name: String
    author: Author
  }
`;
export const resolvers = {
  Query: {
    events: () => { console.log("Query EVENTS")
        return{name: "Party ONE"} 
},
  },
  Event: {
    author: () => { console.log("Aurrr ěě")
        return {firstName: "pepa jelinek"}
 },
}
};