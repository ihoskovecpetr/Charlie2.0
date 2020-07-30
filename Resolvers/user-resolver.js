import User from "../Models-Mongo/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authorsEvents } from "./merge.js";
import { updateUserYupSchema } from "./Utils/updateUserYupSchema.js";
import { formatYupError } from "./Utils/formatError.js";
import {
  duplicate_email_Error,
  //duplicate_email_social_Error,
  mismatch_login_Error,
  server_Error,
  email_not_confirmed_Error,
} from "./Utils/errorPile";

const nodemailer = require("nodemailer");
const path = require("path");
const { google } = require("googleapis");

export const typeDef = `
  extend type Query {
    getOneUser(user_id: ID, limit: Int): User
    deleteAllUsers: String
  }

  extend type Mutation {
    newUser(name: String!, password: String!, socialId: String, email: String!, telephone: String, description: String!, picture: String, typeSocial: Boolean, typeDirect: Boolean): ResponseUser
    confirmUser(user_id: ID): ResponseUser
    updateUser(_id: ID, name: String, password: String, socialId: String, email: String, telephone: String, description: String, picture: String, typeSocial: Boolean, typeDirect: Boolean): ResponseUser
    login(emailOrName: String! password: String!): ResponseUser
    loginExternal(email: String! id: String!): ResponseUser
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
    telephone: String
    picture: String
    token: String
    createdEvents: [Event!]
    socialId: String
    typeSocial: Boolean
    typeDirect: Boolean
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
  "240102983847-4rl6l3igfraucda0hf4onpesq4ns8hjr.apps.googleusercontent.com", // ClientID
  "w6myevje4fX4ule3Lnr7_zBI", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token:
    "1//04hOsAJbgaDOgCgYIARAAGAQSNwF-L9IrhdZywiV91vSsjiwrJ1mPSBxqzoiTZ6Kg-mMWIPTeB2jZc9qr_dvuG0pwvpdGkdk5Ma4",
});

const accessToken = oauth2Client.getAccessToken();

const smtpTransport = nodemailer.createTransport({
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

const hbs = require("nodemailer-express-handlebars");

export const resolvers = {
  Mutation: {
    newUser: async (_, _args, __) => {
      try {
        await updateUserYupSchema.validate(_args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }
      try {
        console.log("NEW USER data: ", _args);
        let existing = await User.find({ email: _args.email });
        if (existing.length) {
          if (existing[0].typeSocial && !existing[0].typeDirect) {
            const hashedPasswordUpd = await bcrypt.hash(_args.password, 12);
            let updated = await User.findOneAndUpdate(
              { email: _args.email },
              {
                name: _args.name,
                description: `${existing[0].description} ${_args.description}`,
                password: hashedPasswordUpd,
                socialId: existing[0].socialId,
                telephone: existing[0].telephone + _args.telephone,
                picture: _args.picture,
                typeSocial: existing[0].typeSocial,
                typeDirect: true,
                confirmed: false,
              }
            );
            console.log("UPDATed THIS from direct: ", updated);

            smtpTransport.use(
              "compile",
              hbs({
                viewEngine: {
                  extName: ".handlebars",
                  partialsDir: "./views/",
                  layoutsDir: "./views/",
                  defaultLayout: "confirmEmail.handlebars",
                },
                viewPath: "views",
              })
            );

            var mailOptions2 = {
              from: "Charlie House Party",
              to: _args.email,
              subject: "Confirm your email address",
              template: "confirmEmail",
              context: {
                eventId: updated._id,
                eventFullUrl: `https://www.charliehouseparty.club/confirm/${updated._id}`,
              },
            };
            const resMail1 = await smtpTransport.sendMail(mailOptions2);

            if (resMail1.rejected.length !== 0) {
              return { errorOut: { success: false } };
            } else {
              smtpTransport.close();
              return { dataOut: { success: true, ...updated } };
            }
          }
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
            telephone: _args.telephone ? _args.telephone : "+420--",
            description: _args.description,
            password: hashedPassword,
            picture: picture,
            typeSocial: _args.typeSocial,
            typeDirect: _args.typeDirect,
            confirmed: _args.typeSocial ? true : false, //kdyz se prihlasuju z social tak je confirmed
          });

          const result = await newUser.save();

          const token = jwt.sign(
            { userId: result._doc._id, email: result._doc.email },
            "somesupersecretkeyEvenMore",
            { expiresIn: "5h" }
          );

          //send email with confirm link
          console.log("Result event: ", result);

          if (_args.typeSocial) {
            return { dataOut: { ...result._doc, success: true, token: token } };
          }

          smtpTransport.use(
            "compile",
            hbs({
              viewEngine: {
                extName: ".handlebars",
                partialsDir: "./views/",
                layoutsDir: "./views/",
                defaultLayout: "confirmEmail.handlebars",
              },
              viewPath: "views",
            })
          );

          console.log("Result save new uSEr: ", result);

          var mailOptions1 = {
            from: "Charlie House Party",
            to: _args.email,
            subject: "Confirm your email address",
            template: "confirmEmail",
            context: {
              eventId: result._id,
              eventFullUrl: `https://www.charliehouseparty.club/confirm/${result._id}`,
            },
          };

          const resMail = await smtpTransport.sendMail(mailOptions1);

          if (resMail.rejected.length !== 0) {
            return { errorOut: { success: false } };
          } else {
            smtpTransport.close();
            return { dataOut: { ...result._doc, success: true } };
          }
        }
      } catch (err) {
        throw err;
      }
    },
    updateUser: async (_, _args, context) => {
      console.log("UPDATING START: ", _args);
      try {
        await updateUserYupSchema.validate(_args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }
      try {
        let existing = await User.find({ _id: _args._id });
        if (existing) {
          var preTypeSocial = existing[0].typeSocial;
          var preTypeDirect = existing[0].typeDirect;
        }
        console.log("HAVE EXISTING: _args.typeSocial ", _args.typeSocial);

        existing = await User.findOneAndUpdate(
          { _id: _args._id },
          {
            name: _args.name,
            description: _args.description,
            socialId: _args.socialId,
            picture: _args.picture,
            telephone: _args.telephone,
            typeSocial: _args.typeSocial ? _args.typeSocial : preTypeSocial,
            typeDirect: _args.typeDirect ? _args.typeDirect : preTypeDirect,
          }
        );
        console.log("UPDATed THIS: ", existing);

        return { dataOut: { success: true } };
      } catch (err) {
        throw err;
      }
    },
    confirmUser: async (_, _args, cotnext) => {
      try {
        let existing = await User.findOneAndUpdate(
          { _id: _args.user_id },
          {
            confirmed: true,
          }
        );
        console.log("Confirmed THIS: ", existing);

        return { dataOut: { success: true } };
      } catch (err) {
        return { dataOut: { success: false } };
      }
    },
    login: async (_, _args, __) => {
      try {
        console.log("_args na login: ", _args);
        let foundUserByEmail = await User.findOne({ email: _args.emailOrName });
        let foundUserByName = await User.findOne({ name: _args.emailOrName });
        console.log(
          "foundUserByEmail: foundUserByName: ",
          foundUserByEmail,
          foundUserByName
        );
        let realUser;
        if (foundUserByEmail) {
          realUser = foundUserByEmail;
        }
        if (foundUserByName) {
          realUser = foundUserByName;
        }
        if (!realUser) {
          console.log("No real User, send Err", realUser);
          return mismatch_login_Error;
        }
        if (realUser && !realUser.confirmed) {
          return email_not_confirmed_Error;
        } else {
          const isEqual = await bcrypt.compare(
            _args.password,
            realUser.password
          );

          console.log("Is Equal pass: ", isEqual);

          if (isEqual) {
            const token = jwt.sign(
              { userId: realUser.id, email: realUser.email },
              "somesupersecretkeyEvenMore",
              { expiresIn: "5h" }
            );
            return {
              dataOut: { ...realUser._doc, success: true, token: token },
            };
          }
        }
        return mismatch_login_Error;
      } catch (err) {
        console.log(err);
        return server_Error;
      }
    },
    loginExternal: async (_, _args, __) => {
      console.log("Hitted loginExternal email: ", _args.email);
      try {
        let foundUser = await User.findOne({ email: _args.email });
        console.log("Found User: ", foundUser);
        if (!foundUser) {
          console.log("Noo Found User: ");
          return { dataOut: { success: false } };
        }
        const token = jwt.sign(
          { userId: foundUser.id, email: foundUser.email },
          "somesupersecretkeyEvenMore",
          { expiresIn: "5h" }
        );
        return {
          dataOut: { ...foundUser._doc, success: true, token: token },
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
          console.log("Found LoggedInUser: ", user);
          return { ...user._doc, success: true };
        }
        return { success: false };
      } catch (err) {
        throw err;
      }
    },
    custommerEnquiry: async (_, _args, __) => {
      try {
        console.log(
          "Hitting custommerEnquiry: email, desc: ",
          _args.email,
          _args.desc
        );

        var mailOptions1 = {
          from: "Charlie House Party",
          to: "ihoskovecpetr@gmail.com", //req.body.user_email,
          subject: "User Enquiry",
          text: `${_args.email} ENQUIRY: ${_args.desc}`,
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
            success: false,
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
          success: true,
        };
      } catch (err) {
        throw err;
      }
    },
  },
};
