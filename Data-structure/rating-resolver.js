import Event from "../Models-Mongo/Event.js";
import User from "../Models-Mongo/User.js";
import Rating from "../Models-Mongo/Rating.js";
import {
  userLookup,
  singleEvent,
  //transformBooking,
  transformEvent
} from "./merge";

export const typeDef = newFunction();
export const resolvers = {
  Query: {
    showRatings: async (_, _args, __) => {
      try {
        console.log("ShowBookings args: ", _args.event_id);
        let ratings;
        if (_args.event_id) {
          ratings = await Rating.find({ event: _args.event_id });
        } else if (_args.host_id) {
          ratings = await Rating.find({ host: _args.host_id });
        }
        console.log("showRatings found: ", ratings);
        return ratings.map(rating => {
          return {
            ...rating._doc,
            createdAt: new Date(rating._doc.createdAt).toISOString(),
            success: true
          };
        });
        return ratings;
      } catch (err) {
        throw err;
      }
    },
    deleteRatings: async (_, _args, __) => {
      try {
        let result = await Rating.deleteMany({});
        console.log("showRatings: ", result);
        return result.deletedCount;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    rateEvent: async (_, _args, __) => {
      try {
        //const fetchedEvent = await Event.findOne({ _id: _args.event_id });
        console.log("Rating hitted");
        const rating = new Rating({
          event: _args.event_id,
          host: _args.host_id,
          guest: _args.guest_id,
          ratingValue: _args.ratingValue,
          message: _args.message
        });
        const result = await rating.save();

        console.log("rating.save() result: ", result);
        return { ...result._doc, success: true };
      } catch (err) {
        throw err;
      }
    }
  },
  Rating: {
    event: async a => {
      try {
        const event = await Event.findById(a.event);
        return transformEvent(event);
      } catch (err) {
        throw err;
      }
    },
    guest: async (a, b, c) => {
      try {
        console.log("RATING guest:: ", a.guest);
        const user = await User.findById(a.guest);
        console.log("RATING guest:: ", user);
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
    showRatings(event_id: ID, host_id: ID): [Rating]
    deleteRatings: String
  }

  extend type Mutation {
    rateEvent(event_id: ID!, host_id: ID!, guest_id: ID!, ratingValue: Int! message: String): Rating
  }

  type Rating { 
    event: Event!
    host: ID!
    guest: User!
    ratingValue: Int
    message: String
    createdAt: String
    success: Boolean
  }
`;
}
