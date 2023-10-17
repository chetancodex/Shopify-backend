const db = require("../models/index");
const User = db.Users;
const Product = db.Products;
const Order = db.Orders;
const cart = db.usercart
const authMiddleware = require('../middleware/auth');
// Get Order
exports.getOrders = async (req, res) => {
  try {
    // Step 1: Find all user orders for the given user
    const userOrders = await Order.findAll({
      where: { userId: req.userData.id },
      attributes: ["productId", "quantity"],
    });

    // Extract product IDs from the user orders
    const productIds = userOrders.map((order) => order.productId);

    // Step 2: Find all products with the extracted product IDs
    const products = await Product.findAll({
      where: { id: productIds },
      attributes: ["id", "name", "price"], // Include 'id' in the attributes
    });

    // Step 3: Create a mapping of product IDs to product details for easy lookup
    const productMap = {};
    products.forEach((product) => {
      productMap[product.id] = {
        name: product.name,
        price: product.price,
      };
    }); 
  

    // Step 4: Generate the desired response format
    const response = userOrders.map((order) => ({
      productId: order.productId,
      quantity: order.quantity,
      name: productMap[order.productId].name,
      price: productMap[order.productId].price,
    }));

    // Step 5: Send the response
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server issue" });
  }
};


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
