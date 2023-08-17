const db = require('../models/index');
const cart = db.usercart;
const User = db.Users;
const Product = db.Products
// Get All carts
exports.getAllCarts = async(req,res) => {
try {
 const Allcarts = await cart.findAll({
    include : [db.Users,db.Products]
 });
 res.status(200).send(Allcarts)
} catch (error) {
    console.log(error);
    res.status(500).send({ message : "Internal server Issue"})
}
};
// Add Product to Cart
exports.addProductToCart = async (req, res) => {
    try {
        const usercartItem = {
            username : req.body.username,
            productId : req.body.productId,
            quantity : req.body.quantity
        }
        const newCartItem = await cart.create({
            username: usercartItem.username,
            productId: usercartItem.productId,
            quantity: usercartItem.quantity
        });
        res.status(200).send(newCartItem);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server Issue" });
    }
};
// Get cart by Username 
exports.getCartByUsername = async(req,res) => {
    try {
        const cartItems = await cart.findAll({ where: { username : req.body.username } });
        res.status(200).send(cartItems);

    } catch (error) {
        console.log(error);
        res.status(500).send({message : "Internal Server Error "});
    }
}
