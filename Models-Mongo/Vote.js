const mongoose = require("mongoose");
const Schema = mongoose.Schema;

voteSchema = new Schema({
  vote: {
    type: Number,
    required: false
  },
  country: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("VoteHook", voteSchema);
//'VoteHook' is name of new Schema/Model/Collection in DB
