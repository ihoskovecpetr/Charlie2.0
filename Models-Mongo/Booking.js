const mongoose = require("mongoose");
const Schema = mongoose.Schema;

console.log("Defining schema Votes");

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event"
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
    }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.VoteHook || mongoose.model("Bookings", bookingSchema);
//'VoteHook' is name of new Schema/Model/Collection in DB
