import User from "../Models-Mongo/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authorsEvents } from "./merge.js";
import { updateUserYupSchema } from "./Utils/updateUserYupSchema.js";
import { formatYupError } from "./Utils/formatError.js";
import {
  duplicate_email_Error,
  mismatch_login_Error,
  server_Error
} from "./Utils/errorPile";

const nodemailer = require("nodemailer");
const path = require('path');
const { google } = require("googleapis");

export const typeDef = `
  extend type Query {
    getOneUser(user_id: ID, limit: Int): User
    deleteAllUsers: String
  }

  extend type Mutation {
    newUser(name: String!, password: String!, email: String!, description: String!, picture: String, type: String): ResponseUser
    updateUser(name: String, email: String, description: String, picture: String): ResponseUser
    login(email: String! password: String!): ResponseUser
    loginExternal(email: String! id: String! type: String): ResponseUser
    getLoggedInUser: User
    custommerEnquiry(email: String! desc: String!): SucsResp
  }

  type User {
    _id: ID
    success: Boolean
    name: String
    password: String
    description: String
    email: String
    picture: String
    token: String
    createdEvents: [Event!]
    type: String
  }

  type ResponseUser {
    dataOut: User
    errorOut:[Error]
  }
  type SucsResp {
    success: Boolean
  }

`;


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


export const resolvers = {
  Mutation: {
    newUser: async (_, _args, __) => {
      try {
        await updateUserYupSchema.validate(_args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }
      try {
        let existing = await User.find({ email: _args.email });
        if (existing.length) {
          return duplicate_email_Error;
        } else {
          if (!_args.picture) {
            var picture =
              "http://www.queensland-photo.com/wp-content/uploads/2013/01/surfing-burleigh-1024x538.jpg";
          } else {
            var picture = _args.picture;
          }
          const hashedPassword = await bcrypt.hash(_args.password, 12);
          let newUser = new User({
            name: _args.name,
            email: _args.email,
            description: _args.description,
            password: hashedPassword,
            picture: picture,
            type: _args.type
          });

          const result = await newUser.save();
          return { dataOut: { ...result._doc, success: true } };
        }
      } catch (err) {
        throw err;
      }
    },
    updateUser: async (_, _args, context) => {
      console.log("UPDATING START: ", _args, context);
      try {
        await updateUserYupSchema.validate(_args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }


      try {
        let existing = await User.findOneAndUpdate({ _id: context.reqO.req.userId }, {
          name: _args.name,
          description: _args.description,
          picture: _args.picture
        });
        console.log("UPDATING THIS: ", existing);

          return { dataOut: { success: true } };

      } catch (err) {
        throw err;
      }
      
    },
    login: async (_, _args, __) => {
      try {
        let foundUser = await User.findOne({ email: _args.email });
        if (!foundUser) {
          return mismatch_login_Error;
        }
        const isEqual = await bcrypt.compare( _args.password, foundUser.password );

        if (isEqual) {
          const token = jwt.sign(
            { userId: foundUser.id, email: foundUser.email },
            "somesupersecretkeyEvenMore",
            {expiresIn: "5h" }
          );
          return {
            dataOut: { ...foundUser._doc, success: true, token: token }
          };
        }
        return mismatch_login_Error;
      } catch (err) {
        console.log(err);
        return server_Error;
      }
    },
    loginExternal: async (_, _args, __) => {
      console.log("Hitted loginExternal email: ", _args.email)
      try {
        let foundUser = await User.findOne({ email: _args.email });
        console.log("Found User: ", foundUser)
        if (!foundUser) {
          console.log("Noo Found User: ")
          return {dataOut: {success: false}}
        }
          const token = jwt.sign(
            { userId: foundUser.id, email: foundUser.email },
            "somesupersecretkeyEvenMore",
            {expiresIn: "5h" }
          );
          return {
            dataOut: { ...foundUser._doc, success: true, token: token }
          };
      } catch (err) {
        console.log(err);
        return server_Error;
      }
    },
    getLoggedInUser: async (_, _args, context, info) => {
      try {
        if (context.reqO.req.isAuth) {
          let user = await User.findById(context.reqO.req.userId);
          return { ...user._doc, success: true };
        }
        return { success: false };
      } catch (err) {
        throw err;
      }
    },
    custommerEnquiry: async (_, _args, __) => {
      try {

        console.log("Hitting custommerEnquiry: email, desc: ", _args.email, _args.desc)

        var mailOptions1 = {
          from: "Charlie House Party",
          to: 'ihoskovecpetr@gmail.com', //req.body.user_email,
          subject: "User Enquiry",
          text: `${_args.email} ENQUIRY: ${_args.desc}`
          // template: "granted",
          // context: {
          //   eventURL: eventURL,
          //   event_QRCode: QRKod,
          //   event_name: event[0].name,
          //   event_dateStart: dateString[0] + " " + timeString[0] + ":" + timeString[1],
          //   message: _args.response,
          //   decision: _args.decision ? "CONFIRMED" : "DECLINED"
          // },

        };

        const resMail = await smtpTransport.sendMail(mailOptions1);

        if (resMail.rejected.length !== 0) {
          return {
            success: false
          };
        } else {
          smtpTransport.close();
          return { success: true, message: "Email has been sent" };
        }

      } catch (err) {
        console.log(err);
        return server_Error;
      }
    },
  },
  Query: {
    deleteAllUsers: async (_, _args, context, info) => {
      let result = await User.deleteMany({});
      return result.deletedCount;
    },
    getOneUser: async (_, _args, __) => {
      try {
        let user = await User.findById(_args.user_id);
        // return authorsEvents()
        return { 
          ...user._doc,
          createdEvents: authorsEvents(user.id), 
          success: true };
      } catch (err) {
        throw err;
      }
    }
  }
};
