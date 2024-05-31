const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = class Auth {
  static async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json(errors.array());
      }

      const { email, password, username } = req.body;
      const salt = await bcrypt.genSalt(9);
      const passwordHash = await bcrypt.hash(password, salt);
      const user = new User({ email, username, passwordHash });
      await user.save();
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '90d' });

      res.json({
        success: true,
        token: token,
        username: username
      });
    } catch (error) {
      res.status(500).json({ message: 'Не удалось зарегистрироваться, попробуйте чуть позже', error })
    }
  }
  static async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: 'Введите правильный логин или пароль' })
      }

      const password = req.body.password;
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        return res.status(404).json({ message: 'Введите правильный логин или пароль' })
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '90d' });

      res.json({
        success: true,
        token: token,
        username: user.username
      });
    } catch (error) {
      res.status(500).json({ message: 'Не удалось авторизоваться, попробуйте чуть позже', error })
    }
  }
  static async getUser(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.userId });
      if (!user) {
        return res.status(404).json({ success: false, message: "Пользователь не найден" });
      }
      const { passwordHash, ...userData } = user._doc;
      return res.json({ success: true, userData });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Пользователь не найден, попробуйте позже" });
    }
  }

}