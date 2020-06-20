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
  description: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  confirmed: {
    type: Boolean,
    required: false
  },  
  socialId: {
    type: String,
    required: false
  },
  typeSocial: {
    type: Boolean,
    required: false
  },
  typeDirect: {
    type: Boolean,
    required: false
  },
  rememberSignIn: {
    type: Boolean,
    required: false
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ],
  rating: {
    type: Array,
    required: false
  }
});

userSchema.index({ "name": "text", "description": "text", "email": "text" },{ weights: {name: 1, description: 1, email: 1 }}); //"description": "text"

module.exports = mongoose.models.users || mongoose.model("users", userSchema);
//'VoteHook' is name of new Schema/Model/Collection in DB
