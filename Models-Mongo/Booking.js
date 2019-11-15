const mongoose = require("mongoose");
const Schema = mongoose.Schema;

console.log("Defining schema Votes");

voteSchema = new Schema({
  vote: {
    type: Number,
    required: false
  },
  country: {
    type: String,
    required: false
  }
});

module.exports =
  mongoose.models.VoteHook || mongoose.model("VoteHook", voteSchema);
//'VoteHook' is name of new Schema/Model/Collection in DB
