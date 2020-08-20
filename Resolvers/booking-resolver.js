import Event from "../Models-Mongo/Event.js";
import User from "../Models-Mongo/User.js";
import Booking from "../Models-Mongo/Booking.js";
import createEmailBody from "../Helpers/createEmailBody.js";
import {
  userLookup,
  singleEvent,
  // transformBooking,
  transformUser,
  transformEvent,
} from "./merge";
import {
  not_author_Error,
  not_found_Error,
  server_Error,
} from "./Utils/errorPile";

import QRCode from "qrcode";

const Promise = require("bluebird");
var base64Img = require("base64-img");
const nodemailer = require("nodemailer");
const path = require("path");
const { google } = require("googleapis");
const hbs = require("nodemailer-express-handlebars");
// var pdf = require("pdf-creator-node");
// const pdf = Promise.promisifyAll(require("html-pdf"));
const PDFDocument = require("pdfkit");
var fs = require("fs");

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "240102983847-4rl6l3igfraucda0hf4onpesq4ns8hjr.apps.googleusercontent.com", // ClientID
  "w6myevje4fX4ule3Lnr7_zBI", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token:
    "1//04hOsAJbgaDOgCgYIARAAGAQSNwF-L9IrhdZywiV91vSsjiwrJ1mPSBxqzoiTZ6Kg-mMWIPTeB2jZc9qr_dvuG0pwvpdGkdk5Ma4",
});

const accessToken = oauth2Client.getAccessToken();

const smtpTransport0 = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "charliehouseparty@gmail.com",
    clientId:
      "240102983847-4rl6l3igfraucda0hf4onpesq4ns8hjr.apps.googleusercontent.com",
    clientSecret: "w6myevje4fX4ule3Lnr7_zBI",
    refreshToken:
      "1//04hOsAJbgaDOgCgYIARAAGAQSNwF-L9IrhdZywiV91vSsjiwrJ1mPSBxqzoiTZ6Kg-mMWIPTeB2jZc9qr_dvuG0pwvpdGkdk5Ma4",
    accessToken: accessToken,
  },
});

const smtpTransport1 = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "charliehouseparty@gmail.com",
    clientId:
      "240102983847-4rl6l3igfraucda0hf4onpesq4ns8hjr.apps.googleusercontent.com",
    clientSecret: "w6myevje4fX4ule3Lnr7_zBI",
    refreshToken:
      "1//04hOsAJbgaDOgCgYIARAAGAQSNwF-L9IrhdZywiV91vSsjiwrJ1mPSBxqzoiTZ6Kg-mMWIPTeB2jZc9qr_dvuG0pwvpdGkdk5Ma4",
    accessToken: accessToken,
    // accessToken: "ya29.a0AfH6SMCegn8JH9GTLnDbjLoxkrLcs-YS02QiGLwSjJZj8ReenO_ucdznv8SP3R-vqHCFNl-wNqpDpfJg2Ebl53uC0hGnSXKKi55gI-b2XCeetc5aqQ1kmXg6kFy8Tfw3vA_00EeRG_GxbaV2_tR7BRkszbj4lTSVKbA"
  },
});

export const typeDef = newFunction();
export const resolvers = {
  Query: {
    showBookings: async (_, _args, __) => {
      try {
        let bookings = await Booking.find({ event: _args.event_id });
        return bookings.map(async (booking, index) => {
          return {
            ...booking._doc,
            createdAt: new Date(booking._doc.createdAt).toISOString(),
            updatedAt: new Date(booking._doc.updatedAt).toISOString(),
          };
        });
      } catch (err) {
        throw err;
      }
    },
    acceptShowBooking: async (_, _args, context) => {
      try {
        let oneBooking = await Booking.findOne({
          event: _args.event_id,
          user: _args.user_id,
        });
        if (oneBooking) {
          let areYouAuthor = oneBooking.host == context.reqO.req.userId;
          if (areYouAuthor) {
            return {
              dataOut: {
                ...oneBooking._doc,
                createdAt: new Date(oneBooking._doc.createdAt).toISOString(),
                updatedAt: new Date(oneBooking._doc.updatedAt).toISOString(),
              },
            };
          } else {
            return not_author_Error;
          }
        } else {
          return not_found_Error;
        }
      } catch (err) {
        console.log(err);
        return server_Error;
      }
    },
    showUserBookings: async (_, _args, __) => {
      try {
        let bookings = await Booking.find({ user: _args.user_id }).sort({
          "event.dateStart": -1,
        });
        //return bookings;
        return bookings.map(async (booking, index) => {
          return {
            ...booking._doc,
            createdAt: new Date(booking._doc.createdAt).toISOString(),
            updatedAt: new Date(booking._doc.updatedAt).toISOString(),
          };
        });
      } catch (err) {
        throw err;
      }
    },
    showHostBookings: async (_, _args, __) => {
      try {
        console.log("showHostBookings: _args ", _args);
        let bookings = await Booking.find({ host: _args.host_id }).sort({
          "event.dateStart": -1,
        });

        //return bookings;
        return bookings.map(async (booking, index) => {
          console.log("Iter Booking: ", booking);
          console.log("Iter _doc.Booking: ", booking._doc);
          return {
            ...booking._doc,
            user: await transformUser(booking._doc.user),
            host: await transformUser(booking._doc.host),
            createdAt: new Date(booking._doc.createdAt).toISOString(),
            updatedAt: new Date(booking._doc.updatedAt).toISOString(),
          };
        });
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    bookEvent: async (_, _args, __) => {
      //is this user at all??
      try {
        const existingBooking = await Booking.findOne({
          event: _args.event_id,
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
          console.log("FETCHED EVENT: ", fetchedEvent);

          const booking = new Booking({
            event: fetchedEvent,
            host: fetchedEvent.author,
            user: _args.user_id,
            message: _args.message,
            confirmed: false,
            cancelled: false,
            decided: false,
            entered: false,
            seenUser: true,
            seenHost: false,
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
          confirmed: true,
        }).sort("-dateStart");
        console.log("Bookings count: ", bookings);
        // return {
        //   ...bookings,
        //   createdAt: new Date(bookings.createdAt)
        // };
        return bookings.map(async (booking, index) => {
          return {
            ...booking._doc,
            createdAt: new Date(booking._doc.createdAt).toISOString(),
          };
        });

        //return bookings[0];
      } catch (err) {
        throw err;
      }
    },
    requestBookEvent: async (_, _args, __) => {
      try {
        console.log("Hitting requestBookEvent");
        let event = await Event.findById(_args.event_id);
        let author = await User.findById(event.author);
        //poslat mail a udelat booking with confirmed false
        let existingBooking = await Booking.find({
          event: _args.event_id,
          user: _args.guest_id,
        });

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
          const fetchedEventRequesting = await Event.findOne({
            _id: _args.event_id,
          });
          const booking = new Booking({
            host: fetchedEventRequesting.author,
            user: _args.guest_id,
            event: _args.event_id,
            message: _args.message,
            confirmed: false,
            cancelled: false,
            decided: false,
            entered: false,
            seenUser: true,
            seenHost: false,
          });
          const result = await booking.save();
          if (result._id) {
            console.log("Setting mail inquiry.handlebars");
            smtpTransport0.use(
              "compile",
              hbs({
                viewEngine: {
                  extName: ".handlebars",
                  partialsDir: "./views/",
                  layoutsDir: "./views/",
                  defaultLayout: "inquiry.handlebars",
                },
                viewPath: "views",
              })
            );

            var eventURL = `https://www.charliehouseparty.club/profile`;

            console.log("mail/post ENDPOINT pOSt: eventURL ", eventURL);

            const mailOptions0 = {
              from: "Charlie Party App",
              to: author.email, //req.body.user_email,
              subject: `Charlie house party - ${_args.guest_name} is asking for permission`,
              template: "inquiry",
              context: {
                eventURL: eventURL,
                guest_name: _args.guest_name,
                guest_inquiry: _args.message,
                event_name: event.name,
              },
            };

            const resMail = await smtpTransport0.sendMail(mailOptions0);

            if (resMail.rejected.length !== 0) {
              return {
                success: false,
                message: `Sending mail to ${author.email} has failed`,
              };
            } else {
              smtpTransport0.close();
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
    deleteBooking: async (_, _args, __) => {
      try {
        const result = await Booking.findOneAndDelete({
          event: _args.event_id,
          user: _args.user_id,
        });
        //const result = await booking.save();

        console.log("deleting Booking finished: ", result);
        if (result) {
          return { success: true };
        } else {
          return { success: false };
        }
      } catch (err) {
        throw err;
      }
    },
    confirmBooking: async (_, _args, __) => {
      try {
        console.log("confirmBooking _args: ", _args);
        const guest = await User.find({ _id: _args.user_id });
        const event = await Event.find({ _id: _args.event_id });
        const result = await Booking.update(
          { event: _args.event_id, user: _args.user_id },
          {
            $set: {
              confirmed: _args.decision,
              response: _args.response,
              decided: true,
              seenUser: false,
            },
          }
        );

        console.log("confirmBooking result: ", result);

        if (result.ok) {
          console.log("Setting clasicGranted mail");
          smtpTransport1.use(
            "compile",
            hbs({
              viewEngine: {
                extName: ".handlebars",
                partialsDir: "./views/",
                layoutsDir: "./views/",
                defaultLayout: "clasicGranted.handlebars", //clasicGranted
              },
              viewPath: "views",
            })
          );
          const QRKod = await QRCode.toDataURL(
            `https://www.charliehouseparty.club/?accept_event=${event[0]._id}&accept_user=${guest[0]._id}`
          );

          const eventURL = `https://www.charliehouseparty.club/?event=${_args.event_id}`;
          const dateString = new Date(event[0].dateStart)
            .toISOString()
            .split("T");
          const timeString = dateString[1].split(":");

          // let html = createEmailBody({
          //   QRCode: QRKod,
          //   message: _args.response,
          //   event_name: event[0].name,
          //   event_address: event[0].address,
          //   event_dateStart:
          //     dateString[0] + " " + timeString[0] + ":" + timeString[1],
          //   event_description: event[0].description,
          //   guest_name: guest[0].name,
          // });

          var html = fs.readFileSync(
            path.join(__dirname, "../htmlTemplates/ticket.html"),
            "utf8"
          );

          // var options = {
          //   format: "A3",
          //   orientation: "portrait",
          //   border: "10mm",
          //   header: {
          //     height: "45mm",
          //     contents:
          //       '<div style="text-align: center;">Author: Shyam Hajare</div>',
          //   },
          //   footer: {
          //     height: "28mm",
          //     contents: {
          //       first: "Cover page",
          //       2: "Second page", // Any page number is working. 1-based index
          //       default:
          //         '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          //       last: "Last Page",
          //     },
          //   },
          // };

          // var users = [
          //   {
          //     name: "Shyam",
          //     age: "26",
          //   },
          //   {
          //     name: "Navjot",
          //     age: "26",
          //   },
          // ];

          // var document = {
          //   html: html,
          //   data: {
          //     users: users,
          //   },
          //   path: `./PDFNEW/${event[0].name}-${guest[0].name}.pdf`,
          // };
          // const pdfResult = await pdf.create(document, options);

          // const pdfResult = await pdf.createAsync(html, {
          //   format: "A4",
          //   phantomPath: "./node_modules/phantomjs-prebuilt/bin/phantomjs", // PhantomJS binary which should get downloaded automatically
          //   filename: `PDF/${guest[0].name} - ${event[0].name}.pdf`,
          // });

          const doc = new PDFDocument();

          doc.pipe(fs.createWriteStream(`ticket.pdf`));
          doc
            .fontSize(25)
            .text(`Ticket QR code for event ${event[0].name}`, 100, 100);
          doc.image(QRKod);
          doc.end();

          console.log("New pdf KIT job: ", doc);

          const mailOptions1 = {
            from: "Charlie Party: " + event[0].name,
            to: guest[0].email, //req.body.user_email,
            subject: `Your request got ${
              _args.decision ? "CONFIRMED" : "DECLINED"
            }`,
            template: "clasicGranted",
            context: {
              eventURL: eventURL,
              event_QRCode: QRKod,
              event_name: event[0].name,
              event_dateStart:
                dateString[0] + " " + timeString[0] + ":" + timeString[1],
              message: _args.response,
              decision: _args.decision ? "CONFIRMED" : "DECLINED",
            },
            attachments: _args.decision
              ? [
                  {
                    filename: `Event ${event[0].name}.pdf'`, // <= Here: made sure file name match
                    // path: path.join(__dirname, '../PDF/pozdrav.pdf'), // <= Here
                    path: `ticket.pdf`,
                    // content: pdfResult.filename,
                    contentType: "application/pdf",
                  },
                ]
              : [],
          };

          const resMail = await smtpTransport1.sendMail(mailOptions1);

          console.log("resMail: ", resMail);

          if (resMail && resMail.rejected.length !== 0) {
            // pdfResult &&
            return {
              success: false,
              message: `Sending mail to ${guest[0].email} has failed`,
            };
          } else {
            smtpTransport1.close();
            return { success: true, message: "Email has been sent" };
          }
        } else {
          return { success: false, message: "Creating of booking failed" };
        }
      } catch (err) {
        throw err;
      }
    },
    markBookingSeen: async (_, _args, __) => {
      try {
        let userHost;
        if (_args.user === true) {
          userHost = { seenUser: true };
        } else {
          userHost = { seenHost: true };
        }
        const result = await Booking.update(
          { _id: _args.booking_id },
          { $set: userHost }
        );

        if (result.ok) {
          return { success: true };
        } else {
          return { success: false };
        }
      } catch (err) {
        throw err;
      }
    },
    markEntered: async (_, _args, __) => {
      try {
        console.log(
          "markEntered: markEntered: ",
          _args.event_id,
          _args.user_id
        );
        const result = await Booking.update(
          { event: _args.event_id, user: _args.user_id },
          { $set: { entered: true } }
        );

        console.log("Entered: res: ", result);

        if (result.ok) {
          return { success: true };
        } else {
          return { success: false };
        }
      } catch (err) {
        throw err;
      }
    },
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
    },
  },
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
    showBookings(event_id: ID!): [Booking]
    acceptShowBooking(event_id: ID!, user_id: ID!): ResponseAcceptBooking
    showUserBookings(user_id: ID!): [Booking]
    showHostBookings(host_id: ID!): [Booking]
  }

  extend type Mutation {
    requestBookEvent(event_id: String!, guest_id: String!, guest_name: String!, message: String!): Hlaska!
    bookEvent(event_id: String!, user_id: String!, message: String): Hlaska!
    cancelBooking(event_id: String!, user_id: String!): Hlaska!
    deleteBooking(event_id: ID!, user_id: ID!): Hlaska!
    confirmBooking(event_id: ID!, user_id: ID!, host_id: ID, response: String, decision: Boolean): Hlaska!
    markBookingSeen(booking_id: ID!, user: Boolean): Hlaska
    markEntered(event_id: ID!, user_id: ID!): Hlaska
    newestUserBookings(user_id: ID!): [Booking]
  }

  type Hlaska { 
    _id: String
    success: Boolean
    message: String
  }

  type ResponseAcceptBooking {
    dataOut: Booking
    errorOut:[Error]
  }

  type Booking {
    _id: ID! 
    event: Event
    host: User
    user: User
    message: String
    response: String
    createdAt: String!
    updatedAt: String! 
    confirmed: Boolean
    cancelled: Boolean
    decided: Boolean
    entered: Boolean
    success: Boolean
    seenUser: Boolean
    seenHost: Boolean
  }
`;
}
