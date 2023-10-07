const db = require("../models/index");
const User = db.Users;
const Product = db.Products;
const Order = db.Orders;
const cart = db.usercart
const authMiddleware = require('../middleware/auth');
// Get Order
exports.getOrders = async(req,res) => {
    try {
        const UserOrders = await Order.findAll({where : { userId : req.userData.id }});
        res.status(200).send(UserOrders)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server issue" });
      }
}

// Add Order
exports.addOrders = async (req, res) => {
  try {
    const userId = req.userData.id;
    const username = req.userData.username;

    // Find all items in the user's cart
    const userCart = await cart.findAll({ where: { username: username } });

    if (!userCart || userCart.length === 0) {
      return res.status(401).send({ message: "Your Cart is Empty" });
    }

    for (const cartItem of userCart) {
      const productId = cartItem.productId;
      const quantity = cartItem.quantity;

      if (userId && productId && quantity) {
        const orderItem = await Order.create({
          userId: userId,
          productId: productId,
          quantity: quantity,
        });

        await orderItem.save();
        await cartItem.destroy({where : {username :req.userData.username}});
       
      } else {
        return res
          .status(400)
          .send({ message: "Order is not Placed, some Error Occurred" });
      }
    }

    return res.status(200).send({ message: "Your Orders are Placed" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server issue" });
  }
};
