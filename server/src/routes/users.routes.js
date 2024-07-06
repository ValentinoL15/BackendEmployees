const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController')


router.post('/signup',  userController.createUser);

router.post('/signin', userController.signIn);

router.get('/public-users', userController.public);

router.get('/private-users', (req,res,next) => req.app.verifyToken(req,res,next), userController.private)




module.exports = router