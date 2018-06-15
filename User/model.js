const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
})
UserSchema.pre('save', function(next){
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    return next()
  })
})
UserSchema.methods.verifyPassword = function(submittedPass, cb){
  bcrypt.compare(submittedPass, this.password)
    .then(verified => {
      cb(verified)
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = mongoose.model('User', UserSchema, 'users')