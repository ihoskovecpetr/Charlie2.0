import { merge } from "lodash";
import {
  typeDef as User,
  resolvers as userResolvers
} from "./Data-structure/user-resolver.js";
import {
  typeDef as Event,
  resolvers as eventResolvers
} from "./Data-structure/event-resolver.js";
import {
  typeDef as Booking,
  resolvers as bookingResolvers
} from "./Data-structure/booking-resolver.js";
// If you had Query fields not associated with a
// specific type you could put them here
console.log("Schema hitted");
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
`;
const resolversLoc = {
  Mutation: {
    new: () => {
      console.log("New Muta");
      return "NEW";
    }
  },
  Query: {
    _empty: () => {
      console.log("_empty");
      return { obsah: "Kde nic, ani cigan nebere" };
    }
  }
};

export const typeDefs = [Query, Mutation, User, Event, Booking];
export const resolvers = merge(
  resolversLoc,
  userResolvers,
  eventResolvers,
  bookingResolvers
);
