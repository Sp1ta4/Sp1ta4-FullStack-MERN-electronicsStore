const User = require('../models/User');
const Products = require('../models/Product');

module.exports = class Cart {
  static async getAllItems(req, res) {
    try {
      const user = await User.findById(req.userId).populate('cartItems.product');

      if (!user) {
        return res.status(500).json({ message: "Не удалось получить данные, попробуйте позже" })
      }


      res.json({
        success: true,
        cartItems: user.cartItems
      })
    } catch (error) {
      res.status(500).json({ message: "Не удалось получить данные, попробуйте позже", error })
    }
  }
  static async addItem(req, res) {
    try {
      const { productId } = req.body;

      const user = await User.findById(req.userId);
      const product = await Products.findById(productId);

      if (!user || !product) {
        return res.status(404).json({ message: 'User or Product not found' });
      }

      const cartItemIndex = user.cartItems.findIndex(
        item => item.product.toString() === productId
      );

      if (user.cartItems[cartItemIndex]?.quantity >= 1) {
        user.cartItems[cartItemIndex].quantity += 1;
      } else {
        user.cartItems.push({ product: productId, quantity: 1 });
      }
      await user.save();
      const result = (await user.populate('cartItems.product')).cartItems;
      res.json({
        success: true,
        cartItems: result
      })
    } catch (error) {
      res.status(500).json({ message: "Не удалось получить данные, попробуйте позже", error })
    }
  }
  static async minusItem(req, res) {
    try {
      const { productId } = req.body;

      const user = await User.findById(req.userId);
      const product = await Products.findById(productId);

      if (!user || !product) {
        return res.status(404).json({ message: 'User or Product not found' });
      }

      const cartItemIndex = user.cartItems.findIndex(
        item => item.product.toString() === productId
      );


      if (user.cartItems[cartItemIndex]?.quantity > 1) {
        user.cartItems[cartItemIndex].quantity -= 1;
      } else {
        user.cartItems = user.cartItems.filter(
          item => item.product.toString() !== productId
        );
      }
      await user.save();

      const result = (await user.populate('cartItems.product')).cartItems;
      res.json({
        success: true,
        cartItems: result
      })
    } catch (error) {
      res.status(500).json({ message: "Не удалось получить данные, попробуйте позже", error })
    }
  }

  static async deleteItem(req, res) {
    try {
      const { productId } = req.params;
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.cartItems = user.cartItems.filter(
        item => item.product.toString() !== productId
      );
      await user.save();

      const result = (await user.populate('cartItems.product')).cartItems;
      res.json({
        success: true,
        cartItems: result
      })
    } catch (error) {
      res.status(500).json({ message: "Не удалось получить данные, попробуйте позже", error })
    }
  }

}