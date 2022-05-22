const UserModel = require('../models/usermodel')
let bcrypt = require('bcrypt');

// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.email || !req.body.firstname || !req.body.lastname || !req.body.phone || !req.body.age || !req.body.password) {
        if (req.body.password>5 && req.body.password<26){
            return res.render('Signup',{errormsg1: "Password must be at least 6 characters"})
        }
        if (req.body.age<5){
            return res.render('Signup',{errormsg1: "Your age must be greater than 6"})
        }
        return res.render('Signup',{errormsg1: "Content can not be empty!"})
    }
    let Gender = req.body.gender;
    if (Gender == "on"){ Gender = "Male";}
    else{ Gender = "Female";}

    bcrypt.hash(req.body.password, 10, function (err, hash){
        const user = new UserModel({
            email: req.body.email,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            phone: req.body.phone,
            age: req.body.age,
            gender: Gender,
            password: hash
        });
        user.save().then(data => {
            res.render('index.ejs', {nameProfile: 'Hi,'+req.body.firstname})
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating user"
            });
        });
    })
};

// Find a single User
exports.findOne = async (req, res) => {
    // const user = await UserModel.find()

    UserModel.findOne({email: req.body.email}, function (err, user) {

        if (err) {
            console.log(err);
        }
        else if (!user) {
            error_msg = "User with email " + req.body.email + " does not exist"
            return res.render('signin',{errormsg: error_msg})
        }
        if (user){
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if(result == true){
                    return res.render('index.ejs', {nameProfile: 'Hi,'+ user.firstName});
                }
                else{
                    return res.render('signin',{errormsg: "Wrong password"})
                }
            })
        }

    })
}
