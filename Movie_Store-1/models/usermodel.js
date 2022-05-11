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
        required: [true, 'User phone number required']
    },
    age: Number,
    gender: String,
    password: {
        type: String,
        required: [true, 'User password required']
    }
});
let userModel = new mongoose.model('User', schema);
module.exports = userModel;