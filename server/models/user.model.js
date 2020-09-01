const { Schema, model, Types } = require('mongoose');

const schemaUser = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [{ type: Types.ObjectId, ref: "Post" }]

});

module.exports = model("User", schemaUser);