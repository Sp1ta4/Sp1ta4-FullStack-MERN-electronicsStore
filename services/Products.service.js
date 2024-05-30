const Product = require('../models/Product');
const { validationResult } = require('express-validator')

module.exports = class ProductsServices {
  static async getAllProducts(req, res) {
    try {
      const products = await Product.find();
      if (!products) {
        return res.status(500).json({ message: "Не удалось получить данные, попробуйте позже" })
      }
      res.json({
        success: true,
        products
      })
    } catch (error) {
      res.status(500).json({ message: "Не удалось получить данные, попробуйте позже", error })
    }
  }
  static async addProduct(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }
      const { title, description, price, specifications, colors, images } = req.body;

      const product = new Product({ title, description, price, specifications, colors, images, rating: 0.0, reviews: [] });
      await product.save();
      res.json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({ message: 'Не удалось добавить товар, попробуйте позже', error })
    }

  }
  static async deleteProduct(req, res) {
    try {
      const _id = req.params.id;
      await Product.findOneAndDelete({ _id });
      res.json({
        success: true,
        message: "Товар был успешно удален"
      })
    } catch (error) {
      res.status(500).json({ message: "Не удалось удалить товар, попробуйте позже", error })
    }
  }
  static async getOneProduct(req, res) {
    try {
      const productId = req.params.id;
      const product = await Product.findOne({ _id: productId });
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Товар не найден"
        })
      }
      res.json({
        success: true,
        product
      })
    } catch (error) {
      res.status(500).json({ message: 'Не удалось открыть страницу товара, попробуйте позже', error })
    }

  }
}