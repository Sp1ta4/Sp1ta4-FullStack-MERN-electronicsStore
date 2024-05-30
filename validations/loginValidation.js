const { body } = require('express-validator');

module.exports = loginValidator = [
  body('email').trim().notEmpty().withMessage('Заполните все поля ввода!').isEmail().withMessage('Введите корректную электронную почту'),
  body('password').trim().notEmpty().withMessage('Заполните все поля ввода!')
]