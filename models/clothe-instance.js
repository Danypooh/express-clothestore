const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClotheInstanceSchema = new Schema({
  clothe: { type: Schema.Types.ObjectId, ref: "Clothe", required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Out of Stock", "Pre-Order", "On Sale"],
    default: "Available",
  },
});

ClotheInstanceSchema.virtual("url").get(function () {
  return `/catalog/clothe-instance/${this._id}`;
});

module.exports = mongoose.model("ClotheInstance", ClotheInstanceSchema);
