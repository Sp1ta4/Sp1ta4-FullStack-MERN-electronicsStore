const express = require('express');
const router = express.Router();
const loginValidator = require('../validations/loginValidation');
const registerValidator = require('../validations/registerValidator');
const AuthServices = require('../services/Auth.service');

router.post('/registration', registerValidator, AuthServices.registration);
router.post('/login', loginValidator, AuthServices.login);

module.exports = router;
