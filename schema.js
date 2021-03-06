import { merge } from "lodash";
import {
  typeDef as User,
  resolvers as userResolvers
} from "./Resolvers/user-resolver.js";
import {
  typeDef as Event,
  resolvers as eventResolvers
} from "./Resolvers/event-resolver.js";
import {
  typeDef as Booking,
  resolvers as bookingResolvers
} from "./Resolvers/booking-resolver.js";
import {
  typeDef as Rating,
  resolvers as ratingResolvers
} from "./Resolvers/rating-resolver.js";
import {
  typeDef as Text,
  resolvers as textSearchResolvers
} from "./Resolvers/textSearch-resolver";
// If you had Query fields not associated with a
// specific type you could put them here

const Mutation = `
  type Mutation {
    new: String
  }
`;
const Query = `
  type Prazdno {
    obsah: String
  }
  type Query {
    _empty: Prazdno
  }

  type Error {
    name: String
    message: String
  }
  
`;
const resolversLoc = {
  Query: {
    _empty: () => {
      return { obsah: "Kde nic, ani cigan nebere" };
    }
  }
};

export const typeDefs = [Query, Mutation, User, Event, Booking, Rating, Text];
export const resolvers = merge(
  resolversLoc,
  userResolvers,
  eventResolvers,
  bookingResolvers,
  ratingResolvers,
  textSearchResolvers
);
