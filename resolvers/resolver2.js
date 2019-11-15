const Vote = require("../Models-Mongo/Vote.js");

const resolver2 = {
  Query: {
    Bookings: async (_, __, { pubsub }) => {
      try {
        console.log("Hit VOte");
        const result = await Vote.find({});
        console.log("results: :", result);
        return result;
      } catch (err) {
        throw err;
      }
    }
  }
};

module.exports = {
  resolver2
};
