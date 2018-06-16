let mongoose = require("mongoose");
let bcrypt = require('bcrypt-nodejs');
let Schema = mongoose.Schema;

// friend = following 
let friendSchema = new Schema({ 
    name: {type: String } 
}); 

let userSchema = new Schema({ 
    email: {type: String, required: true}, 
    password: {type: String, required: true}, 
    friends: [friendSchema]
}); 

/* 
let userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }, 
    following: [{
        type: String 
    }], 
    followers: [{
        type: String 
    }]
}); 
*/ 

// possibly an example of prototypical inheritance  
/* 
userSchema.methods.encryptPassword = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null); 
}

userSchema.methods.validPassword = password => {
    return bcrypt.compareSync(password, this.password); 
} 
*/

userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
