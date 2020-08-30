import express from "express";
const http = require("http");
var path = require("path");
var serveIndex = require("serve-index");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const { PubSub } = require("apollo-server");

const authMiddleware = require("./Middleware/auth.js");
const cronMiddleware = require("./Cron/cron.js");
import { typeDefs, resolvers } from "./schema.js";

const app = express();

// Set because of deprecated warning when doing findAndModify
// mongoose.set("useFindAndModify", false);

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.get("/map", (req, res, next) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.get("/about", (req, res, next) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.get("/create", (req, res, next) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.get("/user", (req, res, next) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.get("/play", (req, res, next) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.get("/play/:id", (req, res, next) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.get("/profile", (req, res, next) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.get("/privacy-policy", (req, res, next) => {
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

app.use(authMiddleware);
// app.use(cronMiddleware);
cronMiddleware();

app.use(
  "/.well-known",
  express.static(".well-known"),
  serveIndex(".well-known")
);

//const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req) => ({ /* pubsub, */ reqO: req }),
  subscriptions: "/subs",
  playground: true,
  introspection: true,
  debug: true,
  engine: false,
});

const httpServer = http.createServer(app);

server.applyMiddleware({
  app,
});

server.installSubscriptionHandlers(httpServer);
//`mongodb+srv://${process.env.MONGO_user}:${process.env.MONGO_password}@cluster0-il454.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_user}:${process.env.MONGO_password}@cluster0-5xb1t.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    const PORT = process.env.PORT || 4005;
    httpServer.listen(PORT, () => {
      console.log(
        `Connected: SERVER - POrtfolio VOTING APP na PORTUU ${PORT} `
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

// const PORT = process.env.PORT || 4005;
// httpServer.listen(PORT, () => {
//         console.log(`SERVER - POrtfolio VOTING APP na PORTUU ${PORT} `);
//       })
