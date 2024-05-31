const express = require('express');
const router = express.Router();
const loginValidator = require('../validations/loginValidation');
const registerValidator = require('../validations/registerValidator');
const AuthServices = require('../services/Auth.service');
const CheckAuth = require('../utils/CheckAuth');

router.post('/registration', registerValidator, AuthServices.registration);
router.post('/login', loginValidator, AuthServices.login);
router.get('/getUser', CheckAuth, AuthServices.getUser);

module.exports = router;
