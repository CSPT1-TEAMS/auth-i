const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
    username: { type: String, required: true, unique: true, index: 1 },
    password: { type: String, required: true }
})

User.pre('save', function (next) {
    bcrypt.hash(this.password, 11, (err, hash) => {
        if (err) {
            return next(err)
        } else {
            this.password = hash;
            return next()
        }
    })
})

User.methods.comparePasswords = function(plainText, cb) {
    bcrypt.compare(plainText, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

module.exports = mongoose.model('User', User);
