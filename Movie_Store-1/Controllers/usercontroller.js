const UserModel = require('../models/usermodel')
// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone && !req.body.birthday && !req.body.gender) {
        //res.status(400).send({ message: "Content can not be empty!" });
        res.status(400).render('results', {mydata: "Content can not be empty!"})
    }

    const user = new UserModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        birthday: req.body.birthday,
        gender: req.body.gender
    });

    await user.save().then(data => {
        /*res.send({
            message:"User created successfully!!",
            user:data
        });*/
        res.render('index.ejs')
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
       /* res.render('results', {mydata: err.message || "Some error occurred while creating user"})*/
    });
};

// Find a single User
exports.findOne = async (req, res) => {
        UserModel.findOne({email: req.body.email, password: req.body.password}, function (err, user) {
            if (err) {
                console.log(err);
            }

            if (!user) {
                error_msg = "Invalid login or password"
                return res.render('signin',{errormsg: error_msg})
            }
            return res.render('index.ejs');
        })
}

