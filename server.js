const express = require("express");
const http = require("http");
var path = require("path");
const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");
const { PubSub } = require("apollo-server");
const authMid = require("./Middleware/auth.js");
const { resolvers } = require("./resolvers/index");
const { typeDefsS, resolversS } = require("./schema.js");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

console.log("__dirname: ", __dirname);

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

const typeDefs = gql`
  type Subscription {
    newVote: Vote!
  }

  type Query {
    Votes: [Vote!]
  }

  type Mutation {
    voteAction(inputVote: InputVote!): Vote!
    Login(inputLogin: InputLogin): Token!
    testing: Test!
  }

  type Test {
    test: String
  }

  type Vote {
    _id: ID
    vote: Float
    country: String
  }

  type Token {
    token: String
  }

  input InputVote {
    vote: Float
    country: String!
  }
  input InputLogin {
    user: String
    pass: String
  }
`;

// const resolvers = {
//   Subscription: {
//     newVote: {
//       subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_VOTE)
//     }
//   },
//   Query: {
//     Votes: async (_, __, { pubsub }) => {
//       try {
//         const result = await Vote.find({});
//         console.log("results: :", result);
//         return result;
//       } catch (err) {
//         throw err;
//       }
//     }
//   },
//   Mutation: {
//     voteAction: async (
//       _,
//       { inputVote: { vote: voteValue, country: countryValue } },
//       { pubsub }
//     ) => {
//       console.log("MUTANT: inputVote: ", voteValue);
//       try {
//         console.log("Trying this resolver Mutation");
//         const voting = new Vote({
//           vote: voteValue,
//           country: countryValue
//         });

//         pubsub.publish(NEW_VOTE, { newVote: voting });

//         const result = await voting.save();
//         console.log("voting :", result);
//         return result;
//       } catch (err) {
//         throw err;
//       }
//     },
//     Login: (
//       _,
//       { inputLogin: { user: userValue, pass: passValue } },
//       { pubsub }
//     ) => {
//       console.log("MUTATION LOGIN HIT", userValue, passValue);
//       return { token: "MUTATION - token from Server serviert" };
//     },
//     ...graphQlResolvers
//   }
// };

const pubsub = new PubSub();

const server = new ApolloServer({
  //typeDefs,
  //resolvers,
  typeDefsS,
  resolversS,
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

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_user}:${process.env.MONGO_password}@cluster0-il454.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    const PORT = process.env.PORT || 4005;
    httpServer.listen(PORT, () => {
      console.log(`SERVER - POrtfolio VOTING APP na PORTUU ${PORT} `);
    });
  })
  .catch(err => {
    console.log(err);
  });
