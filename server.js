//const express = require("express");
import express from "express";
const http = require("http");
var path = require("path");
const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");
const { PubSub } = require("apollo-server");
const authMid = require("./Middleware/auth.js");
//const { resolvers } = require("./resolvers/index");
import { typeDefs, resolvers } from "./schema.js";
//const resolvers = require("./resolvers.js");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function(req, res, next) {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(authMid);

// const typeDefs = gql`
//   type Subscription {
//     newVote: Vote!
//   }

//   type Query {
//     Votes: [Vote!]
//   }

//   type Mutation {
//     voteAction(inputVote: InputVote!): Vote!
//     Login(inputLogin: InputLogin): Token!
//     testing: Test!
//   }

//   type Test {
//     test: String
//   }

//   type Vote {
//     _id: ID
//     vote: Float
//     country: String
//   }

//   type Token {
//     token: String
//   }

//   input InputVote {
//     vote: Float
//     country: String!
//   }
//   input InputLogin {
//     user: String
//     pass: String
//   }
// `;

// const resolvers = {
//   // Subscription: {
//   //   // newVote: {
//   //   //   subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_VOTE)
//   //   // }
//   // },
//   Query: {
//     Votes: async (_, __, { pubsub }) => {
//       try {
//         //const result = await Vote.find({});
//         //console.log("results: :", result);
//         return {id: '54sd6sad65', name: 'String NAme'};
//       } catch (err) {
//         throw err;
//       }
//     }
//   },
//   Mutation: {

//   }
// };

const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ pubsub }),
  subscriptions: "/subs",
  playground: true,
  introspection: true,
  debug: true,
  engine: false
});

server.applyMiddleware({
  app
});

const httpServer = http.createServer(app);

server.installSubscriptionHandlers(httpServer);
//`mongodb+srv://${process.env.MONGO_user}:${process.env.MONGO_password}@cluster0-il454.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_user}:${process.env.MONGO_password}@cluster0-5xb1t.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    const PORT = process.env.PORT || 4005;
    httpServer.listen(PORT, () => {
      console.log(
        `Connected: SERVER - POrtfolio VOTING APP na PORTUU ${PORT} `
      );
    });
  })
  .catch(err => {
    console.log(err);
  });

// const PORT = process.env.PORT || 4005;
// httpServer.listen(PORT, () => {
//         console.log(`SERVER - POrtfolio VOTING APP na PORTUU ${PORT} `);
//       })
