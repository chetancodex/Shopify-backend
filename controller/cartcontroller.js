const db = require('../models/index');
const cart = db.cart;
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
        const { uid, productId, quantity } = req.body;
        const newCartItem = await cart.create({
            uid: uid,
            productId: productId,
            quantity: quantity
        });
        res.status(201).send(newCartItem);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server Issue" });
    }
};
