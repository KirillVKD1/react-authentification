const { Schema, model, Types } = require("mongoose");
const ProductSchema = new Schema({
  input: String,
  checked: { type: Boolean, default: false },
  owner: { type: Types.ObjectId, ref: 'User' },
});
module.exports = model("Post", ProductSchema);