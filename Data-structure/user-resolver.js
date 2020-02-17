import User from "../Models-Mongo/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userYupSchema } from "./Utils/userYupSchema.js";
import { formatYupError } from "./Utils/formatError.js";
import {
  duplicate_email_Error,
  mismatch_login_Error,
  server_Error
} from "./Utils/errorPile";

export const typeDef = `
  extend type Query {
    getOneUser(user_id: ID): User
    getLoggedInUser: User
    deleteAllUsers: String
  }

  extend type Mutation {
    newUser(name: String! password: String! email: String! description: String!  picture: String): ResponseUser
    login(email: String! password: String!): ResponseUser
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
  }

  type ResponseUser {
    dataOut: User
    errorOut:[Error]
  }
`;
export const resolvers = {
  Mutation: {
    newUser: async (_, _args, __) => {
      console.log("NeWUser args: ", _args);
      try {
        await userYupSchema.validate(_args, { abortEarly: false });
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
            picture: picture
          });

          const result = await newUser.save();
          console.log("Saved: ", result);
          return { dataOut: { ...result._doc, success: true } };
        }
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
            {
              expiresIn: "1h"
            }
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
    }
  },
  Query: {
    deleteAllUsers: async (_, _args, context, info) => {
      let result = await User.deleteMany({});
      return result.deletedCount;
    },
    getLoggedInUser: async (_, _args, context, info) => {
      try {
        if (context.reqO.req.isAuth) {
          let user = await User.findById(context.reqO.req.userId);
          console.log("fount all: ", user);
          return { ...user._doc, success: true };
        }
        return { success: false };
      } catch (err) {
        throw err;
      }
    },
    getOneUser: async (_, _args, __) => {
      try {
        let user = await User.findById(_args.user_id);
        return { ...user._doc, success: true };
      } catch (err) {
        throw err;
      }
    }
  }
};
