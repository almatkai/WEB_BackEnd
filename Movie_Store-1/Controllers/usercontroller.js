const UserModel = require('../models/usermodel')
let ejs = require('ejs');
// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone && !req.body.birthday && !req.body.gender) {
        //res.status(400).send({ message: "Content can not be empty!" });
        res.status(400).render('results', {mydata: "Content can not be empty!"})
    }

    let Gender = req.body.gender;
    if (Gender == "on"){ Gender = "Male";}
    else{ Gender = "Female";}

    const user = new UserModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        age: req.body.age,
        gender: Gender,
        password: req.body.password
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
    });
};

// Find a single User
exports.findOne = async (req, res) => {

        console.log("hello")
        UserModel.findOne({email: req.body.email, password: req.body.password}, function (err, user) {
            if (err) {
                console.log(err);
            }

            if (!user) {
                   /* ejs.filters.get = function(obj, prop, def) {
                        return obj[prop] === undefined ? def : obj[prop];
                    };
*/


/*
                    window.document.getElementById("error_box").style.display = "block";
*/


                /*const errormsg = "Invalid login or password"
                return res.render('signin'/!*,{error: errormsg}*!/)*/
            }


            return res.render('index.ejs');

        })


}
        //change params to query
        //const user = await UserModel.findById(req.query.id); //change params to query
        //res.status(200).json(user);
        /*else
        {
            res.status(200).render('index', {
                mydata: "user :" + user.firstName
/!*
                    + user.lastName + " " + user.email + " " + user.phone
*!/


            })
        }
    } catch(error) {
        //res.status(404).json({ message: error.message});
        res.status(404).render('temp', {mydata: error.message})
    }*/

