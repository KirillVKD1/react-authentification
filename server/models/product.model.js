const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  input: String,
  checked: { type: Boolean, default: false }
});

module.exports = mongoose.model("Post", ProductSchema);