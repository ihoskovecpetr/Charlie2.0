const Vote = require("../Models-Mongo/Vote.js");

const NEW_VOTE = "NEW_VOTE";

const resolver1 = {
  Subscription: {
    newVote: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_VOTE)
    }
  },
  Query: {
    Votes: async (_, __, { pubsub }) => {
      try {
        const result = await Vote.find({});
        console.log("results: :", result);
        return result;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    voteAction: async (
      _,
      { inputVote: { vote: voteValue, country: countryValue } },
      { pubsub }
    ) => {
      console.log("MUTANT: inputVote: ", voteValue);
      try {
        console.log("Trying this resolver Mutation");
        const voting = new Vote({
          vote: voteValue,
          country: countryValue
        });

        pubsub.publish(NEW_VOTE, { newVote: voting });

        const result = await voting.save();
        console.log("voting :", result);
        return result;
      } catch (err) {
        throw err;
      }
    },
    Login: (
      _,
      { inputLogin: { user: userValue, pass: passValue } },
      { pubsub }
    ) => {
      console.log("MUTATION LOGIN HIT", userValue, passValue);
      return { token: "MUTATION - token from Server serviert" };
    }
  }
};

module.exports = {
  resolver1
};
