const express = require('express')
const UserController = require('../Controllers/usercontroller')
const router = express.Router();
/*router.get('/', UserController.findAll);
//router.get('/:id', UserController.findOne);*/
router.post('/signin', UserController.findOne);
router.post('/sign_up', UserController.create);
//router.patch('/:id', UserController.update);
/*router.patch('/:email', UserController.update);
//router.delete('/:id', UserController.destroy);
router.delete('/:email', UserController.destroy);*/
module.exports = router