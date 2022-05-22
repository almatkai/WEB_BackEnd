const express = require('express')
const UserController = require('../Controllers/usercontroller')
const router = express.Router();
router.post('/signin', UserController.findOne);
router.post('/sign_up', UserController.create);
module.exports = router