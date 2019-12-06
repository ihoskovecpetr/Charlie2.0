const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event"
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    guest: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    ratingValue: { type: Number },
    message: { type: String }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Rating || mongoose.model("Rating", RatingSchema);
