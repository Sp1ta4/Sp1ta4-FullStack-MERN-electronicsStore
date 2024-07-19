const User = require('../models/User');
const Products = require('../models/Product');

module.exports = class Cart {
  static async getAllItems(req, res) {
    try {
      const user = await User.findOne({ _id: req.userId });
      if (!user) {
        return res.status(500).json({ message: "Не удалось получить данные, попробуйте позже" })
      }
      const cartItems = await user.cartItems;
      res.json({
        success: true,
        cartItems: cartItems || []
      })
    } catch (error) {
      res.status(500).json({ message: "Не удалось получить данные, попробуйте позже", error })
    }
  }
  static async addItem(req, res) {
    const { productId } = req.body;
    try {
      console.log(productId);
      const product = await Products.findOne({ _id: productId });
      if (!product) {
        return res.status(500).json({ message: "Не удалось получить данные, попробуйте позжеffffffffff" })
      }
      await User.updateOne(
        { _id: req.userId },
        { $push: { cartItems: product } }
      );
      res.json({
        success: true,
      })
    } catch (error) {
      res.status(500).json({ message: "Не удалось получить данные, попробуйте позже", error })
    }
  }

  static async deleteItem(req, res) {
    const { productId } = req.body;
    try {
      const product = await Products.findOne({ _id: productId });
      if (!product) {
        return res.status(500).json({ message: "Не удалось получить данные, попробуйте позже" })
      }
      await User.updateOne(
        { _id: req.userId },
        { $pull: { cartItems: product } },
      );
      res.json({
        success: true,
      })
    } catch (error) {
      res.status(500).json({ message: "Не удалось получить данные, попробуйте позже", error })
    }
  }

}