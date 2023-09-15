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
        const product = await Product.findOne({
            where : {id : usercartItem.productId}
        })
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        const newCartItem = await cart.create({
            username: usercartItem.username,
            productId: usercartItem.productId,
            quantity: usercartItem.quantity,
            name : product.name,
            image : product.image,
            description: product.description,
            price : product.price
        });
        res.status(200).send(newCartItem);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server Issue" });
    }
};
// Get cart by Username 
exports.getCartByUsername = async (req, res) => {
    try {
      const cartItems = await cart.findAll({
        where: { username: req.body.username },
        attributes: ["username", "productId", "quantity", "name", "image", "description", "price"],
      });
  
      res.status(200).send(cartItems);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
  
//IncrementSingleCartItem
exports.incrementSingleCartItem = async(req,res) => {
    try {
        const username = req.body.username;
        const productId = req.body.productId;
        const checkUser = await cart.findOne({
            where : { username : username }
        });
        if(!checkUser) {
            return res.status(404).send({ message : 'Cart not found'})
        };
        const cartItem = await cart.findOne({
            where : { username : username , productId : productId}
        });
        if(!cartItem) {
            return res.status(400).send({ message : 'Product Not Found In Cart'})
        }
         cartItem.quantity++;
         await cartItem.save();
        return res.status(200).send({ message : 'Product Increment'})
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}
// Delete Product from Cart
exports.deleteProductFromCart = async (req, res) => {
    try {
        const username = req.body.username; 
        const productId = req.body.productId; 

        // Check if the cart exists for the given username
        const existingCart = await cart.findOne({
            where: { username: username }
        });

        if (!existingCart) {
            return res.status(404).send({ message: 'Cart not found' });
        }
        
        // Check if the product exists in the cart
        const cartItem = await cart.findOne({
            where: { username: username, productId: productId }
        });

        if (!cartItem) {
            return res.status(404).send({ message: 'Product not found in the cart' });
        }

        // Delete the cart item
        await cartItem.destroy();

        return res.status(204).send({ message: "Product deleted" }  );
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

