const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');


let userSchema = new schema({
    firstname : {type:String, required: true, trim:true},
    lastname  : {type:String, required: true, trim:true},
    email     : {type:String, unique:1, required:true, unique:true, trim:true},
    password  : {type:String, required:true},
    profile_pic:String,
    address   : String,
    state     : String,
    joined    : Date,
    reports   : Number,
    posts     : Number,
    reviews   : Number,
    feedbacks : Number,
    hash      : String,
    verified  : Boolean,
    isAdmin   : Boolean
})


userSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified || !user.isNew) { // don't rehash if it's an old user
      next();
    } else {
      bcrypt.hash(user.password, 10 , function(err, hash) {
        if (err) {
          console.log('Error hashing password for user', user.name);
          next(err);
        } else {
          user.joined = new Date().toISOString();
          user.password = hash;
          next();
        }
      });
    }
  });

let userModel = mongoose.model('User', userSchema);

module.exports = userModel;



