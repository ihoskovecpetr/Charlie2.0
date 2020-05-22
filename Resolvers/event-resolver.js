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
      console.log("Her")
      try {
        if (true) { //context.reqO.req.isAuth
          let oneEvent = await Event.findOne({ _id: _args.event_id });
          if (oneEvent) {
            let areYouAuthor = oneEvent.author == context.reqO.req.userId;
            return transformEvent(oneEvent, areYouAuthor) 
            {
              // ...oneEvent._doc,
              // dateStart: new Date(oneEvent._doc.dateStart).toISOString(),
              // success: true,
              // areYouAuthor: areYouAuthor
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
    eventGeoDay: async (_, _args, context) => {
      try {
        let startD = new Date(_args.date);
        let nextD = new Date(_args.date);
        nextD.setDate(nextD.getDate() + 1);
        //let isoDen = den.toISOString().split("T")[0];
        const allEvents = await Event.find({
          dateStart: { $gte: startD, $lte: nextD },
          hide: false
        });
        return allEvents.map(event => {
          return transformEvent(event);
        });
      } catch (err) {
        throw err;
      }
    },
    userEvents: async (_, _args, context) => {
      try {
        const userEvents = await Event.find({ author: _args.user_id }).sort({
          "dateStart": -1
        });
        if (userEvents) {
          return userEvents.map(event => {
            let areYouAuthor = event.author == context.reqO.req.userId;
            return transformEvent(event, areYouAuthor);
          });
        } else {
          return [{ success: false }];
        }
      } catch (err) {
        throw err;
      }
    },
    getJoinEvents: async (_, _args, context) => {
      try {
        if (context.reqO.req.isAuth) {
          let nowD = new Date(); // end of duration
          let nextD = new Date().toISOString().split("T")[0];
          nextD = new Date(nextD)
          nextD.setDate(nextD.getDate() + _args.playInput.plusDays + 1);
  
          let playEvents = await Event.find({
            dateEnd: { $gte: nowD },
            dateStart: { $lte: nextD }, 
            geometry:{
              $near: {
                    $geometry: {
                                type: "Point",
                                coordinates: [ _args.playInput.lng, _args.playInput.lat]
                            },
                            $maxDistance: _args.playInput.radius * 1000
                        } }
            
          })
          .sort(
            "dateStart"
          )
          if (playEvents) {
            let filtered // = playEvents.filter((item) => item.dateStart > new Date()) 
  
            filtered = playEvents.filter((item) => {
              if(_args.playInput.shownEvents){
                return !_args.playInput.shownEvents.includes(item._id.toString())
              }else{
                return true
              }
            }) 
            let FILTD = await Promise.all(filtered.map(async event => {
              return await transformEvent(event, event.author == context.reqO.req.userId);
            }));
            return FILTD
  
          } else {
            return {
              success: false,
              message: "This event is worhere to be seen, check url and repeat"
            };
          }
        } else {
          console.log("You are no authorised XX")
          return {
            success: false,
            message: "You are not authorised, login first to continue"
          };
        }
      } 
      catch (err) {
        throw err;
      }
    },
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
          const dateEnd = new Date(_args.eventInput.dateStart).setHours(new Date(_args.eventInput.dateStart).getHours() + _args.eventInput.duration)
          let newEvent = new Event({
            name: _args.eventInput.name,
            author: _args.eventInput.author,
            geometry: {
              coordinates: [_args.eventInput.lng, _args.eventInput.lat]
            },
            address: _args.eventInput.address,
            eventType: _args.eventInput.eventType,
            dateStart: _args.eventInput.dateStart,
            dateEnd: dateEnd,
            duration: _args.eventInput.duration,
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
            hide: false,
            seen: false
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
    cancelEvent: async (_, _args, __) => {
      console.log("DEL One Event", _args);
      try {
        let result = await Event.findOneAndUpdate({ _id: _args.event_id }, {hide: true});
        // let result = await Event.deleteOne({ _id: _args.delete_id });
        console.log("findOneAndUpdate", result);

        if (result.ok) {
          return { success: true };
        } else {
          return { success: false };
        }
      } catch (err) {
        throw err;
      }
    },
    getPlayEvents: async (_, _args, context) => {
      try {
        if (context.reqO.req.isAuth) {
          let nowD = new Date(); // end of duration
          let nextD = new Date().toISOString().split("T")[0];
          nextD = new Date(nextD)
          nextD.setDate(nextD.getDate() + _args.playInput.plusDays + 1);

          let playEvents = await Event.find({
            dateEnd: { $gte: nowD },
            dateStart: { $lte: nextD }, 
            geometry:{
              $near: {
                    $geometry: {
                                type: "Point",
                                coordinates: [ _args.playInput.lng, _args.playInput.lat]
                            },
                            $maxDistance: _args.playInput.radius * 1000
                        } }
            
          })
          .sort(
            "dateStart"
          )
          if (playEvents) {
            let filtered // = playEvents.filter((item) => item.dateStart > new Date()) 

            filtered = playEvents.filter((item) => {
              if(_args.playInput.shownEvents){
                return !_args.playInput.shownEvents.includes(item._id.toString())
              }else{
                return true
              }
            }) 
            let FILTD = await Promise.all(filtered.map(async event => {
              return await transformEvent(event, event.author == context.reqO.req.userId);
            }));
            return FILTD


            // return {
            //   ...oneEvent._doc,
            //   dateStart: new Date(oneEvent._doc.dateStart).toISOString(),
            //   success: true,
            //   areYouAuthor: areYouAuthor
            // };
          } else {
            return {
              success: false,
              message: "This event is worhere to be seen, check url and repeat"
            };
          }
        } else {
          console.log("You are no authorised XX")
          return {
            success: false,
            message: "You are not authorised, login first to continue"
          };
        }
      } 
      catch (err) {
        throw err;
      }
    },
    markEventSeen: async (_, _args, __) => {
      console.log("DEL One Event", _args);
      // try {
      //   let result = await Event.findOneAndUpdate({ _id: _args.delete_id }, {hide: true});
      //   // let result = await Event.deleteOne({ _id: _args.delete_id });
      //   console.log("findOneAndUpdate", result);

      //   if (result.ok) {
      //     return { success: true };
      //   } else {
      //     return { success: false };
      //   }
      // } catch (err) {
      //   throw err;
      // }
    },
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
    getOneEvent(event_id: ID): Event
    eventGeoDay(date: String, geoObj: BoundsInput ): [Event]
    userEvents(user_id: ID!): [Event]
    getJoinEvents(playInput: PlayInput): [Event]
  }

  extend type Mutation {
    createEvent(eventInput: EventInput!): ResponseEvent
    cancelEvent(event_id: ID!): Hlaska
    getPlayEvents(playInput: PlayInput): [Event]
    markEventSeen(event_id: ID!): Hlaska
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
    duration: Float
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

  input PlayInput {
    plusDays: Int!
    lng: Float
    lat: Float
    radius: Int,
    shownEvents: [ID]
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
    duration: Float
    happeningNow: Boolean
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
    seen: Boolean
    areYouAuthor: Boolean
    bookings: [Booking]
    createdAt: String
    updatedAt: String
    score: Float
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
