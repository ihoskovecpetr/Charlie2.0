import Event from "../Models-Mongo/Event.js";
import User from "../Models-Mongo/User.js";
import Booking from "../Models-Mongo/Booking.js";
import { transformEvent } from "./merge.js";

export const typeDef = newFunction();
export const resolvers = {
  Query: {
    events: async () => {
      try {
        let allEvents = await Event.find({});
        console.log("allEvents: ", allEvents);
        return allEvents;
      } catch (err) {
        throw err;
      }
    },
    getOneEvent: async (_, _args, context) => {
      try {
        console.log("getOneEvent context isAuth?? : ", context.reqO.req.isAuth);
        console.log("2 ++ userId: ", context.reqO.req.userId);
        console.log("2 ++ email: ", context.reqO.req.email);
        if (context.reqO.req.isAuth) {
          let oneEvent = await Event.findOne({ _id: _args.id });
          if (oneEvent) {
            let areYourAuthor = oneEvent.author == context.reqO.req.userId;
            // let transform1 = {
            //   ...oneEvent._doc,
            //   success: true,
            //   areYouAuthor: areYourAuthor
            // };
            //return transformEvent(oneEvent, true, areYourAuthor);
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
        let allEvents = await Event.find({});
        //console.log("allEvents: ", allEvents);

        return allEvents.map(event => {
          return transformEvent(event);
        });
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    createEvent: async (_, _args, __) => {
      console.log("createEvent MUTATION hitttt: ", _args);
      try {
        let existing = await Event.find({ name: _args.eventInput.name });
        if (existing.length) {
          console.log("Duplicate of EVENT NAME");
          return { success: false };
        } else {
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
            capacityMax: _args.eventInput.capacityMax,
            BYO: _args.eventInput.BYO,
            repeatWeek: _args.eventInput.repeatWeek,
            freeSnack: _args.eventInput.freeSnack,
            freeBeer: _args.eventInput.freeBeer,
            freeMeal: _args.eventInput.freeMeal,
            imagesArr: _args.eventInput.imagesArr,
            description: _args.eventInput.description,
            confirmed: true,
            hide: _args.eventInput.hide
          });
          const result = await newEvent.save();
          console.log("Saved: ", result);
          return { ...result._doc, success: true };
        }
      } catch (err) {
        throw err;
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
    }
  }
};
function newFunction() {
  return `
  extend type Query {
    events(name: String ): [Event]
    getOneEvent(id: ID): Event
    deleteEvents: String
    fewEvents: [Event]
    eventGeoDay(date: String, geoObj: BoundsInput ): [Event]
  }

  extend type Mutation {
    createEvent(eventInput: EventInput!): Event
    deleteOneEvent(delete_id: ID!): Hlaska
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
    areYouGuest: Boolean
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
