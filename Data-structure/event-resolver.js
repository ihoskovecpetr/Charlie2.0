import Event from "../Models-Mongo/Event.js";
import User from "../Models-Mongo/User.js";
import Booking from "../Models-Mongo/Booking.js";
import { transformEvent } from "./merge.js";
import { eventYupSchema } from "./Utils/eventYupSchema.js";
import { formatYupError } from "./Utils/formatError.js";
import { duplicate_name_Error, server_Error } from "./Utils/errorPile";

export const typeDef = newFunction();
export const resolvers = {
  Query: {
    getOneEvent: async (_, _args, context) => {
      try {
        if (context.reqO.req.isAuth) {
          let oneEvent = await Event.findOne({ _id: _args.id });
          if (oneEvent) {
            let areYourAuthor = oneEvent.author == context.reqO.req.userId;
            return {
              ...oneEvent._doc,
              dateStart: new Date(oneEvent._doc.dateStart).toISOString(),
              success: true,
              areYouAuthor: areYourAuthor
            };
          } else {
            return {
              success: false,
              message: "This event is worhere to be seen, check url and repeat"
            };
          }
        } else {
          return {
            success: false,
            message: "You are not authorised, login first to continue"
          };
        }
      } catch (err) {
        throw err;
      }
    },
    getPlayEvents: async (_, _args, context) => {
      try {
        //  if (context.reqO.req.isAuth) {
          let playEvents = await Event.find({}).sort(
            "dateStart"
          )
          console.log("playEvents", playEvents)
          if (playEvents) {
            //let areYourAuthor = oneEvent.author == context.reqO.req.userId;
            let filtered = playEvents.filter((item) => item.dateStart > new Date()) 
            return filtered.map(event => {
              return transformEvent(event);
            });
            // return {
            //   ...oneEvent._doc,
            //   dateStart: new Date(oneEvent._doc.dateStart).toISOString(),
            //   success: true,
            //   areYouAuthor: areYourAuthor
            // };
          // } else {
            return {
              success: false,
              message: "This event is worhere to be seen, check url and repeat"
            };
          // }
        } else {
          return {
            success: false,
            message: "You are not authorised, login first to continue"
          };
        }
      } catch (err) {
        throw err;
      }
    },
    deleteEvents: async () => {
      try {
        let result = await Event.deleteMany({});
        console.log("allEvents: ", result);
        return result.deletedCount;
      } catch (err) {
        throw err;
      }
    },
    eventGeoDay: async (_, _args, context) => {
      console.log("Args: ", _args);
      try {
        console.log("Geo date>>> ", _args.date);

        let startD = new Date(_args.date);
        let nextD = new Date(_args.date);
        nextD.setDate(nextD.getDate() + 1);
        //let isoDen = den.toISOString().split("T")[0];
        console.log("From: ", startD);
        console.log("To: ", nextD);
        const allEvents = await Event.find({
          dateStart: { $gte: startD, $lte: nextD }
        });
        console.log("aktualni Eventy: ", allEvents);

        return allEvents.map(event => {
          return transformEvent(event);
        });
      } catch (err) {
        throw err;
      }
    },
    userEvents: async (_, _args, __) => {
      try {
        const userEvents = await Event.find({ author: _args.user_id }).sort(
          "dateStart"
        );
        if (userEvents) {
          return userEvents.map(event => {
            //let result = await transformEvent(event);
            //console.log("RESOLVR LEVL: ", result);
            return transformEvent(event);
          });
        } else {
          return [{ success: false }];
        }
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createEvent: async (_, _args, __) => {
      console.log("createEvent FIRST ", _args);
      try {
        await eventYupSchema.validate(_args.eventInput, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }
      try {
        let existing = await Event.find({ name: _args.eventInput.name });
        if (existing.length) {
          console.log("Duplicate of EVENT NAME");
          return duplicate_name_Error;
        } else {
          console.log("CRE-ENT: curry ", _args.eventInput.currency);
          let newEvent = new Event({
            name: _args.eventInput.name,
            author: _args.eventInput.author,
            geometry: {
              coordinates: [_args.eventInput.lat, _args.eventInput.lng]
            },
            address: _args.eventInput.address,
            eventType: _args.eventInput.eventType,
            dateStart: _args.eventInput.dateStart,
            dateEnd: _args.eventInput.dateEnd,
            price: _args.eventInput.price,
            currency: _args.eventInput.currency,
            capacityMax: _args.eventInput.capacityMax,
            BYO: _args.eventInput.BYO,
            repeatWeek: _args.eventInput.repeatWeek,
            freeSnack: _args.eventInput.freeSnack,
            freeBeer: _args.eventInput.freeBeer,
            freeMeal: _args.eventInput.freeMeal,
            imagesArr: _args.eventInput.imagesArr,
            description: _args.eventInput.description,
            confirmed: true,
            hide: false
          });
          const result = await newEvent.save();
          console.log("Saved: ", result);
          return { dataOut: { ...result._doc, success: true } };
        }
      } catch (err) {
        console.log(err);
        return server_Error;
      }
    },
    deleteOneEvent: async (_, _args, __) => {
      console.log("DEL One Event", _args);
      try {
        let result = await Event.deleteOne({ _id: _args.delete_id });
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
  Event: {
    author: async a => {
      try {
        const author = await User.findById(a.author);
        return author;
      } catch (err) {
        throw err;
      }
    },
    bookings: async a => {
      try {
        console.log("Event.bookings.a: ", a);
        const bookingsArr = await Booking.find({ event: a });
        return bookingsArr;
      } catch (err) {
        throw err;
      }
    }
  }
};
function newFunction() {
  return `
  extend type Query {
    events(name: String ): [Event]
    getOneEvent(id: ID): Event
    getPlayEvents: [Event]
    deleteEvents: String
    eventGeoDay(date: String, geoObj: BoundsInput ): [Event]
    userEvents(user_id: ID!): [Event]
  }

  extend type Mutation {
    createEvent(eventInput: EventInput!): ResponseEvent
    deleteOneEvent(delete_id: ID!): Hlaska
  }

  type ResponseEvent {
    dataOut: Event
    errorOut:[Error]
  }

  input EventInput {
    name: String
    lng: Float
    lat: Float
    addressGoogle: String
    addressCustom: String
    address: String
    author: String!
    eventType: Int
    dateStart: String
    dateEnd: String
    price: Float
    currency: String
    capacityMax: Int
    BYO: Boolean
    repeatWeek: Boolean
    freeSnack: Boolean
    freeBeer: Boolean
    freeMeal: Boolean
    imagesArr: [ImageInput]
    description: String
    confirmed: Boolean 
    hide: Boolean
  }

  input BoundsInput {
    ne: Float
    nw: Float
    se: Float
    sw: Float
  }

  input ImageInput {
    caption: String
    src: String
    thumbnail: String
    thumbnailHeight: Int
    thumbnailWidth:Int
    scaletwidth: Int
    marginLeft: Int
    vwidth: Int
    isSelected: Boolean
  }

  type Event {
    _id: ID
    success: Boolean
    message: String
    name: String
    geometry: Geometry
    addressGoogle: String
    addressCustom: String
    address: String
    author: User
    eventType: Int
    dateStart: String
    dateEnd: String
    price: Float
    currency: String
    capacityMax: Int
    BYO: Boolean
    repeatWeek: Boolean
    freeSnack: Boolean
    freeBeer: Boolean
    freeMeal: Boolean
    imagesArr: [Image]
    description: String
    confirmed: Boolean 
    hide: Boolean
    areYouAuthor: Boolean
    bookings: [Booking]
  }

  type Geometry{
    coordinates: [Float]
  }

  type Image {
    caption: String
    src: String
    thumbnail: String
    thumbnailHeight: Int
    thumbnailWidth:Int
    scaletwidth: Int
    marginLeft: Int
    vwidth: Int
  }
`;
}
