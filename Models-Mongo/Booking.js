const mongoose = require("mongoose");
const Schema = mongoose.Schema;

console.log("Defining schema Votes");

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event"
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    confirmed: {
      type: Boolean
    },
    cancelled: {
      type: Boolean
    },
    decided: {
      type: Boolean
    },
    message: {
      type: String
    },
    response: {
      type: String
    },
    seenUser: {
      type: Boolean
    },
    seenHost: {
      type: Boolean
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.VoteHook || mongoose.model("Bookings", bookingSchema);
//'VoteHook' is name of new Schema/Model/Collection in DB
