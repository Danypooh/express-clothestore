const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorieSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
});

CategorieSchema.virtual("url").get(function () {
  return `/catalog/categorie/${this._id}`;
});

module.exports = mongoose.model("Categorie", CategorieSchema);
