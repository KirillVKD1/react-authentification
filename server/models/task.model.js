const { Schema, model } = require("mongoose");

const schemaTask = new Schema({
  input: String,
  checked: { type: Boolean, default: false },
  owner: { type: String },
});
module.exports = model("Task", schemaTask);