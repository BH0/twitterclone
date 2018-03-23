let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
    tweet: {type: String, required: false}, 
    author: { type: String, required: true }
});

module.exports = mongoose.model('tweet', userSchema);
