let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,

    },
    lastName:  String,
    phone: {
        type: String,
        required: [true, 'User phone number required!']
    },
    age: { type: Number, min: 6, max: 90 },
    gender: String,
    password: {
        type: String,
        required: [true, 'User password required'],
        minLength: [6, "Password can't be less than 6 characters!"],
        maxLength: [26, "Password can't be longer than 26 characters!"]

    }
});
let userModel = new mongoose.model('User', schema);
module.exports = userModel;