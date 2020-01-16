import User from "../Models-Mongo/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const typeDef = `
  extend type Query {
    getUsers(_id: ID name: String): [User]
    getOneUser(user_id: ID): User
    getLoggedInUser: User
    deleteAllUsers: String
  }

  extend type Mutation {
    newUser(name: String! password: String! email: String! picture: String): User
    login(email: String! password: String!): User
  }

  type User {
    _id: ID
    success: Boolean
    name: String
    email: String
    token: String
    password: String
    picture: String
    createdEvents: [Event!]
  }
`;
export const resolvers = {
  Mutation: {
    newUser: async (_, _args, __) => {
      console.log("NeWUser args: ", _args);
      try {
        let existing = await User.find({ email: _args.email });
        if (existing.length) {
          console.log("Found existing one: ", existing);
          return { success: false };
        } else {
          let picture;
          console.log("!_args.picture: ", !_args.picture);
          if (!_args.picture) {
            picture =
              "http://www.queensland-photo.com/wp-content/uploads/2013/01/surfing-burleigh-1024x538.jpg";
          } else {
            picture = _args.picture;
          }
          const hashedPassword = await bcrypt.hash(_args.password, 12);
          let newUser = new User({
            name: _args.name,
            email: _args.email,
            password: hashedPassword,
            picture: picture
          });

          const result = await newUser.save();
          console.log("Saved: ", result);
          return { ...result._doc, success: true };
        }
      } catch (err) {
        throw err;
      }
    },
    login: async (_, _args, __) => {
      try {
        let foundUser = await User.findOne({ email: _args.email });
        console.log("found> ", foundUser);
        if (!foundUser) {
          return { success: false };
        }
        const isEqual = await bcrypt.compare(
          _args.password,
          foundUser.password
        );
        console.log("Is Equal?: ", isEqual);
        if (isEqual) {
          console.log("Is Equal");
          const token = jwt.sign(
            { userId: foundUser.id, email: foundUser.email },
            "somesupersecretkeyEvenMore",
            {
              expiresIn: "1h"
            }
          );
          return { ...foundUser._doc, success: true, token: token };
        }
        return { success: false };
      } catch (err) {
        return { success: false };
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
    },
    getUsers: async (_, _args, __) => {
      try {
        let users = await User.find({});
        console.log("fount all: ", users);
        return users;
      } catch (err) {
        throw err;
      }
    }
  }
};
