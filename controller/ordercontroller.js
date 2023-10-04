const db = require("../models/index");
const User = db.Users;
const Product = db.Products;
const Order = db.Orders
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
exports.addOrders = async(req,res) => {
   try {
    const userId = req.userData.id;
    const productId =  req.body.productId;
    const quantity = req.body.quantity;
    if(userId && productId && quantity) {
       const orderItem = await Order.create({
            userId : userId,
            productId : productId,
            quantity : quantity
        });
        await orderItem.save()
        return res.status(200).send({ message : "Your Order is Placed" })
    } else {
      return res.status(400).send({ message : "Order is not Placed some Error Occured" })
    }
   } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server issue" });
  }
}