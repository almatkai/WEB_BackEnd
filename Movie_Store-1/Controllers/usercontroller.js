const UserModel = require('../models/usermodel')
let ejs = require('ejs');
// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.email || !req.body.firstname || !req.body.lastname || !req.body.phone || !req.body.age || !req.body.password) {
        if (req.body.password>5 && req.body.password<26){
            return res.render('Signup',{errormsg1: "Password must be at least 6 characters"})
        }
        if (req.body.age<5){
            return res.render('Signup',{errormsg1: "Your age must be greater than 6"})
        }
        //res.status(400).send({ message: "Content can not be empty!" });
        // res.status(400).render('results', {mydata: "Content can not be empty!"})
        return res.render('Signup',{errormsg1: "Content can not be empty!"})
    }
    let Gender = req.body.gender;
    if (Gender == "on"){ Gender = "Male";}
    else{ Gender = "Female";}

    const user = new UserModel({
        email: req.body.email,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        phone: req.body.phone,
        age: req.body.age,
        gender: Gender,
        password: req.body.password
    });

    await user.save().then(data => {
        res.render('index.ejs', {nameProfile: req.body.firstname})
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};

// Find a single User
exports.findOne = async (req, res) => {
    // const user = await UserModel.find()

    UserModel.findOne({email: req.body.email, password: req.body.password}, function (err, user) {

        if (err) {
            console.log(err);
        }
        if (!user) {
            error_msg = "Invalid login or password"
            return res.render('signin',{errormsg: error_msg})
        }
        return res.render('index.ejs'/*, {nameProfile: {mydata: user.firstName}}*/);
    })
}
