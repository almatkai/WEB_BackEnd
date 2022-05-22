let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    firstName: {
        type: String,
    },
    lastName:  { type: String},
    phone: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: String,
    password: {
        type: String,
    }
});
let userModel = new mongoose.model('User', schema);
module.exports = userModel;