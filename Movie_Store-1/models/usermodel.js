let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    email: {
        type: String,
        // required: true,
        unique: true
    },
    firstName: {
        type: String,
    },
    lastName:  { type: String},
    phone: {
        type: String,
        // required: [true]
    },
    age: {
        type: Number,
    },
    gender: String,
    password: {
        type: String,
        // required: [true],
        // minLength: 6,
        // maxLength: 26

    }
});
let userModel = new mongoose.model('User', schema);
module.exports = userModel;