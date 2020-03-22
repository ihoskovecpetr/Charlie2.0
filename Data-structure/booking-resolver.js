import Event from "../Models-Mongo/Event.js";
import User from "../Models-Mongo/User.js";
import Booking from "../Models-Mongo/Booking.js";
import {
  userLookup,
  singleEvent,
  //transformBooking,
  transformEvent
} from "./merge";
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const hbs = require("nodemailer-express-handlebars");

// const transformBooking = async booking => {
//   console.log("transformBooking: ", booking._doc);
//   return {
//     ...booking._doc,
//     user: await userLookup(x._doc.user),
//     event: await singleEvent(booking._doc.event),
//     createdAt: new Date(booking._doc.createdAt).toISOString(),
//     updatedAt: new Date(booking._doc.updatedAt).toISOString()
//   };
// };

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "119981354324-qlg4hf4dlb1k8dd7r32jkouoaoni0gt7.apps.googleusercontent.com", // ClientID
  "rJKG6kbFTkk80WCAaB1dKgAF", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: "1/51zxtNU8LnjfKH-7McNaqtWK6OCSK0X0vogDTcAhc0U"
});
const accessToken = oauth2Client.getAccessToken();

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "hoskovectest@gmail.com",
    clientId:
      "119981354324-qlg4hf4dlb1k8dd7r32jkouoaoni0gt7.apps.googleusercontent.com",
    clientSecret: "rJKG6kbFTkk80WCAaB1dKgAF",
    refreshToken: "1/51zxtNU8LnjfKH-7McNaqtWK6OCSK0X0vogDTcAhc0U",
    accessToken: accessToken
  }
});

export const typeDef = newFunction();
export const resolvers = {
  Query: {
    showBookings: async (_, _args, __) => {
      try {
        let bookings = await Booking.find({ event: _args.id });
        return bookings;
      } catch (err) {
        throw err;
      }
    },
    showUserBookings: async (_, _args, __) => {
      try {
        let bookings = await Booking.find({ user: _args.user_id }).sort({
          "event.dateStart": -1
        });
        //return bookings;
        return bookings.map(async (booking, index) => {
          return {
            ...booking._doc,
            createdAt: new Date(booking._doc.createdAt).toISOString(),
            updatedAt: new Date(booking._doc.updatedAt).toISOString()
          };
        });
      } catch (err) {
        throw err;
      }
    },
    showHostBookings: async (_, _args, __) => {
      try {
        let bookings = await Booking.find({ host: _args.host_id }).sort({
          "event.dateStart": -1
        });
        //return bookings;
        return bookings.map(async (booking, index) => {
          return {
            ...booking._doc,
            createdAt: new Date(booking._doc.createdAt).toISOString(),
            updatedAt: new Date(booking._doc.updatedAt).toISOString()
          };
        });
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
        if (existingBooking) {
          const result = await Booking.update(
            { event: _args.event_id, user: _args.user_id },
            { $set: { cancelled: false, message: _args.message } }
          );

          if (result.ok) {
            return { success: true };
          } else return { success: false };
        } else {
          const fetchedEvent = await Event.findOne({ _id: _args.event_id });
          console.log("FETCHED EVENT: ", fetchedEvent)

          const booking = new Booking({
            event: fetchedEvent,
            host: fetchedEvent.author,
            user: _args.user_id,
            message: _args.message,
            confirmed: false,
            cancelled: false,
            decided: false
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
    newestUserBookings: async (_, _args, __) => {
      try {
        //let bookings = await Booking.count();
        let bookings = await Booking.find({
          user: _args.user_id,
          confirmed: true
        }).sort("-dateStart");
        console.log("Bookings count: ", bookings);
        // return {
        //   ...bookings,
        //   createdAt: new Date(bookings.createdAt)
        // };
        return bookings.map(async (booking, index) => {
          return {
            ...booking._doc,
            createdAt: new Date(booking._doc.createdAt).toISOString()
          };
        });

        //return bookings[0];
      } catch (err) {
        throw err;
      }
    },
    requestBookEvent: async (_, _args, __) => {
      try {
        let event = await Event.findById(_args.event_id);
        let author = await User.findById(event.author);
        //poslat mail a udelat booking with confirmed false
        let existingBooking = await Booking.find({
          event: _args.event_id,
          user: _args.guest_id
        });
        console.log("existingBooking: ", existingBooking);

        if (existingBooking.length) {
          console.log("There was existing BBBB: ", existingBooking);
          const result = await Booking.update(
            { event: _args.event_id, user: _args.guest_id },
            { $set: { cancelled: false, confirmed: false } }
          );
          if (result.ok) {
            return { success: true, _id: result.electionId };
          } else {
            return { success: false, _id: result.electionId };
          }
        } else {
          const fetchedEventRequesting = await Event.findOne({ _id: _args.event_id });
          const booking = new Booking({
            host: fetchedEventRequesting.author,
            user: _args.guest_id,
            event: _args.event_id,
            message: _args.message,
            confirmed: false,
            cancelled: false
          });
          const result = await booking.save();
          if (result._id) {
            smtpTransport.use(
              "compile",
              hbs({
                viewEngine: {
                  extName: ".handlebars",
                  partialsDir: "./views/",
                  layoutsDir: "./views/",
                  defaultLayout: "inquiry.handlebars"
                },
                viewPath: "views"
              })
            );

            var eventURL = "https://www.charlieparty.club/event/"; //+ req.body.event._id

            console.log("mail/post ENDPOINT pOSt: eventURL ", eventURL);

            var mailOptions1 = {
              from: "Charlie Party App",
              to: author.email, //req.body.user_email,
              subject: "You just created CHARLIE event",
              template: "monkey",
              context: {
                eventURL: eventURL,
                guest_name: _args.guest_name,
                guest_inquiry: _args.message,
                event_name: _args.event_name
              }
            };

            const resMail = await smtpTransport.sendMail(mailOptions1);

            if (resMail.rejected.length !== 0) {
              return {
                success: false,
                message: `Sending mail to ${author.email} has failed`
              };
            } else {
              smtpTransport.close();
              return { success: true, message: "Email has been sent" };
            }
          } else {
            return { success: false, message: "Creating of booking failed" };
          }
        }
      } catch (err) {
        throw err;
      }
    },
    cancelBooking: async (_, _args, __) => {
      try {
        const result = await Booking.update(
          { event: _args.event_id, user: _args.user_id },
          { $set: { cancelled: true, decided: true } }
        );
        //const result = await booking.save();

        console.log("Cancelling finished: ", result);
        if (result.ok) {
          return { success: true, _id: result.electionId };
        } else {
          return { success: false, _id: result.electionId };
        }
      } catch (err) {
        throw err;
      }
    },
    confirmBooking: async (_, _args, __) => {
      try {
        const result = await Booking.update(
          { event: _args.event_id, user: _args.user_id },
          { $set: { confirmed: _args.decision, response: _args.response, decided: true }}
        );
        //const result = await booking.save();

        console.log("confirming finished: ", result);
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
        return transformEvent(event);
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
    },
    host: async a => {
      try {
        const user = await User.findById(a.user);
        return user;
      } catch (err) {
        throw err;
      }
    }
  }
  // Evt: {
  //   event: async a => {
  //     try {
  //       const event = await Event.findById(a.event);
  //       return transformEvent(event);
  //     } catch (err) {
  //       throw err;
  //     }
  //   }
  // }
};

function newFunction() {
  return `
  extend type Query {
    showBookings(id: ID): [Booking]
    showUserBookings(user_id: ID!): [Booking]
    showHostBookings(host_id: ID!): [Booking]
    deleteBookings: String
  }

  extend type Mutation {
    requestBookEvent(event_id: String!, guest_id: String!, guest_name: String!, message: String!): Hlaska!
    bookEvent(event_id: String!, user_id: String!, message: String): Hlaska!
    cancelBooking(event_id: String!, user_id: String!): Hlaska!
    confirmBooking(event_id: ID!, user_id: ID!, response: String, decision: Boolean): Hlaska!
    newestUserBookings(user_id: ID!): [Booking]
  }

  type Hlaska { 
    _id: String
    success: Boolean
    message: String
  }

  type Booking {
    _id: ID! 
    event: Event
    host: User!
    user: User!
    message: String
    response: String
    createdAt: String!
    updatedAt: String! 
    confirmed: Boolean
    cancelled: Boolean
    decided: Boolean
    success: Boolean
  }
`;
}
