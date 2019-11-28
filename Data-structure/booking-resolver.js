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
        const existingBooking = await Booking.findOne({
          event: _args.event_id
        });

        console.log("Exisrting Booking: ", existingBooking);
        if (existingBooking) {
          console.log("Updatni existing Booking: ");
          const result = await Booking.update(
            { event: _args.event_id, user: _args.user_id },
            { $set: { cancelled: false } }
          );
          console.log("booking.update() result: ", result);

          if (result.ok) {
            return { success: true };
          } else return { success: false };
        } else {
          const fetchedEvent = await Event.findOne({ _id: _args.event_id });

          const booking = new Booking({
            user: _args.user_id,
            event: fetchedEvent,
            confirmed: true,
            cancelled: false
          });
          const result = await booking.save();

          console.log("booking.save() result: ", result);

          if (result.ok) {
            return { success: true };
          } else return { success: false };
        }
      } catch (err) {
        throw err;
      }
    },
    cancelBooking: async (_, _args, __) => {
      try {
        const result = await Booking.update(
          { event: _args.event_id, user: _args.user_id },
          { $set: { cancelled: true } }
        );
        //const result = await booking.save();

        console.log("Cancelling finished: ", result);
        if (result.ok) {
          return { success: true };
        } else {
          return { success: false };
        }
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
    bookEvent(event_id: String!, user_id: String!): Hlaska!
    cancelBooking(event_id: String!, user_id: String!): Hlaska!
  }

  type Hlaska { 
    success: String
  }

  type Booking {
    _id: ID! 
    event: Event!
    user: User!
    createdAt: String!
    udpatedAt: String! 
    confirmed: Boolean
    cancelled: Boolean
    success: Boolean
  }
`;
}
