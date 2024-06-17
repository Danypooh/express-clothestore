const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClotheSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
  description: { type: String, required: true, maxLength: 100 },
  clotheType: {
    type: Schema.Types.ObjectId,
    ref: "ClotheType",
    required: true,
  },
  price: { type: Number, required: true },
  categorie: { type: Schema.Types.ObjectId, ref: "Categorie", required: true },
});

ClotheSchema.virtual("url").get(function () {
  return `/catalog/clothe/${this._id}`;
});

module.exports = mongoose.model("Clothe", ClotheSchema);
