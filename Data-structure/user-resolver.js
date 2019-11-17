import User from "../Models-Mongo/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const typeDef = `
  extend type Query {
    getUsers(_id: ID name: String): [User]
  }

  extend type Mutation {
    newUser(name: String! password: String! email: String!): User
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
  }
`;
export const resolvers = {
  Mutation: {
    newUser: async (_, _args, __) => {
      console.log("newUser MUTATION hitttt");
      try {
        let existing = await User.find({ email: _args.email });
        if (existing.length) {
          console.log("Found email: ", existing);
          return { success: false };
        } else {
          const hashedPassword = await bcrypt.hash(_args.password, 12);

          let newUser = new User({
            name: _args.name,
            email: _args.email,
            password: hashedPassword
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
        throw err;
      }
    }
  },
  Query: {
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
