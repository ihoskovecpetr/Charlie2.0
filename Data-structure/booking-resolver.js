import Event from "../Models-Mongo/Event.js";
import User from "../Models-Mongo/User.js";
import Booking from "../Models-Mongo/Booking.js";
import { userLookup, singleEvent } from "./merge";

const transformBooking = booking => {
  return {
    ...booking._doc,
    user: userLookup.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: new Date(booking._doc.createdAt).toISOString(),
    updatedAt: new Date(booking._doc.updatedAt).toISOString()
  };
};

export const typeDef = newFunction();
export const resolvers = {
  Query: {
    showBookings: async (_, _args, __) => {
      try {
        console.log("ShowBookings args: ", _args.id);
        let bookings = await Booking.find({ event: _args.id });
        console.log("ShowBookings: ", bookings);
        return bookings;
      } catch (err) {
        throw err;
      }
    },
    deleteBookings: async (_, _args, __) => {
      try {
        let result = await Booking.deleteMany({});
        return result.deletedCount;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    bookEvent: async (_, _args, __) => {
      try {
        const fetchedEvent = await Event.findOne({ _id: _args.event_id });

        const booking = new Booking({
          user: _args.user_id,
          event: fetchedEvent,
          confirmed: true
        });
        const result = await booking.save();

        console.log("Booking finished: ", result);
        return { ...transformBooking(result), success: true };
      } catch (err) {
        throw err;
      }
    }
  },
  Booking: {
    event: async a => {
      try {
        const event = await Event.findById(a.event);
        return event;
      } catch (err) {
        throw err;
      }
    },
    user: async a => {
      try {
        const user = await User.findById(a.user);
        return user;
      } catch (err) {
        throw err;
      }
    }
  }
};

function newFunction() {
  return `
  extend type Query {
    showBookings(id: ID): [Booking]
    deleteBookings: String
  }

  extend type Mutation {
    bookEvent(event_id: String!, user_id: String!): Booking!
  }

  type Booking {
    _id: ID! 
    event: Event!
    user: User!
    createdAt: String!
    udpatedAt: String! 
    confirmed: Boolean
    success: Boolean
  }
`;
}
