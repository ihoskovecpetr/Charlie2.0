const mongoose = require("mongoose");
const Schema = mongoose.Schema;

console.log("Defining schema user");

userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  rating: {
    type: Array,
    required: false
  }
});

module.exports = mongoose.models.users || mongoose.model("users", userSchema);
//'VoteHook' is name of new Schema/Model/Collection in DB
