const User = require('../models/User');

module.exports = new class ProfileService {
  static async getUser(req, res) {
    try {
      const _id = req.params.id;
      const user = await User.findOne({ _id });
      const { passwordHash, ...userData } = user;
      if (!user) {
        return res.status(404).json({ message: 'Пользователь с таким id не найден, попробуйте позже', error })
      }
      res.json({
        success: true,
        user: userData
      })
    } catch (error) {
      res.status(500).json({ message: 'Сервер не отвечает, попробуйте позже', error })
    }
  }
  static async deleteProfile(req, res) {
    try {
      const _id = req.params.id;
      await User.findOneAndDelete({ _id });
      res.json({
        success: true,
        message: "Профиль был успешно удален, мы будем скучать по вам"
      })
    } catch (error) {
      res.status(500).json({ message: "Не удалось удалить профиль, попробуйте позже", error })
    }
  }
}