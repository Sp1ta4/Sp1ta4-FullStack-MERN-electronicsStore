const { body } = require('express-validator');

module.exports = registerValidator = [
  body('email').trim().notEmpty().withMessage('Заполните все поля ввода!'),
  body('password').notEmpty().withMessage('Заполните все поля ввода!')
    .isLength({ min: 8 }).withMessage('Пароль должен состоять минимум из 8 символов')
    .isLength({ max: 35 }).withMessage('Пароль должен состоять максимум из 35 символов')
    .matches(/\d/).withMessage('Пароль должен содержать минимум 1 цифру')
    .custom((value, { req }) => value === req.body.passwordConfirmation).withMessage('Пароли не совпадают, проверьте еще раз!'),
  body('username').notEmpty().withMessage('Заполните все поля ввода!')
    .isLength({ min: 3 }).withMessage('Имя пользователя должен состоять минимум из 3 символов')
    .isLength({ max: 20 }).withMessage('Имя пользователя должен состоять максимум из 20 символов')
    .matches(/^[a-zA-Z0-9]+$/).withMessage('Имя пользователя должно состоять из латинских букв')
]