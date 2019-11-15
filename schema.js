import { merge } from 'lodash';
import { 
  typeDef as Author, 
  resolvers as authorResolvers,
} from './Data-structure/author.js';
import { 
  typeDef as Book, 
  resolvers as bookResolvers,
} from './Data-structure/book.js';
import { 
  typeDef as User, 
  resolvers as userResolvers,
} from './Data-structure/user.js';
import { 
  typeDef as Event, 
  resolvers as eventResolvers,
} from './Data-structure/event.js';
// If you had Query fields not associated with a
// specific type you could put them here
const Query = `
  type Prazdno {
    obsah: String
  }
  type Query {
    _empty: Prazdno
  }
`;
const resolversLoc = {
  Query: {
    _empty: () => { console.log("_empty") 
    return { obsah: "Kde nic, ani cigan nebere"}
  },
  },
};

export const typeDefs = [Query, User, Event,      Author, Book];
export const resolvers = merge(resolversLoc, userResolvers, eventResolvers,        authorResolvers, bookResolvers);

// makeExecutableSchema({
//   typeDefs: [ Query, Author, Book ],
//   resolvers: merge(resolvers, authorResolvers, bookResolvers),
// });

//module.exports = { typeDefs, resolvers };

// const { gql } = require('apollo-server');

// const typeDefs = gql`
//     type Query {
//       launches: [Launch]!
//       launch(id: ID!): Launch
//       # Queries for the current user
//       me: User
//       Votes: Vote
//     }

//     type Vote {
//       id: ID
//       name: String

//     }

//     type Launch {
//       id: ID!
//       site: String
//       mission: Mission
//       rocket: Rocket
//       isBooked: Boolean!
//     }
//     type Rocket {
//       id: ID!
//       name: String
//       type: String
//     }
    
//     type User {
//       id: ID!
//       email: String!
//       trips: [Launch]!
//     }
    
//     type Mission {
//       name: String
//       missionPatch(size: PatchSize): String
//     }
    
//     enum PatchSize {
//       SMALL
//       LARGE
//     }

//     type TripUpdateResponse {
//       success: Boolean!
//       message: String
//       launches: [Launch]
//     }

//     type Mutation {
//       # if false, booking trips failed -- check errors
//       bookTrips(launchIds: [ID]!): TripUpdateResponse!
    
//       # if false, cancellation failed -- check errors
//       cancelTrip(launchId: ID!): TripUpdateResponse!
    
//       login(email: String): String # login token
//     }
// `;

// module.exports = typeDefs;