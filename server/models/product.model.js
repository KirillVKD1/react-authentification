// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// let ProductSchema = new Schema({
//     input: {type: String, required: true, max: 50},
//     checked: {type: Boolean, required: true},
// });


// // Export the model
// module.exports = mongoose.model('Product', ProductSchema); 


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
  input: String,
  checked: { type: Boolean, default: false }
});

module.exports = mongoose.model("Post", Post);