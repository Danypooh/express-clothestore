const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClotheTypeSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
});

ClotheTypeSchema.virtual("url").get(function () {
  return `/catalog/clothe-type/${this._id}`;
});

module.exports = mongoose.model("ClotheType", ClotheTypeSchema);
