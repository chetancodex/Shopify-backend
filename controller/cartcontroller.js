const db = require("../models/index");
const cart = db.usercart;
const User = db.Users;
const Product = db.Products;


// Add Product to Cart
exports.addProductToCart = async (req, res) => {
  try {
    const { username, productId } = req.body;

    let cartItem = await cart.findOne({
      where: { username: username, productId: productId },
    });

    if (cartItem) {
      cartItem.quantity++;
      await cartItem.save();
    } else {
      // If the cart item doesn't exist, create a new one
      const product = await Product.findOne({
        where: { id: productId },
      });

      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }

      cartItem = await cart.create({
        username: username,
        productId: productId,
        quantity: 1,
        name: product.name,
        image: product.image,
        description: product.description,
        price: product.price,
      });
    }

    res.status(200).send({ message: "Product added to cart", cartItem });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server issue" });
  }
};
// UPdated Cart Item
exports.updateCartItem = async (req, res) => {
  try {
    const {username , productId, quantity } = req.body;
    const cartItem = await cart.findOne({
      where: { username: username, productId: productId },
    });
    if (!cartItem) {
      res.status(400).send({ message: "Product or User Not Found" });
    } else {
      if (quantity === 0) {
        await cartItem.destroy();
        return res.status(200).send({ message: "cartItem update Success" });
      }
      cartItem.quantity = quantity;
      await cartItem.save();
      return res.status(200).send({ message: "cartItem update Success" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server issue" });
  }
};


// Get cart by Username
exports.getCartByUsername = async (req, res) => {
  try {
    const cartItems = await cart.findAll({
      where: { username: req.body.username },
      attributes: [
        "username",
        "productId",
        "quantity",
        "name",
        "image",
        "description",
        "price",
      ],
    });

    res.status(200).send(cartItems);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Delete Product from Cart
exports.deleteProductFromCart = async (req, res) => {
  try {
    const username = req.body.username;
    const productId = req.body.productId;

    // Check if the cart exists for the given username
    const existingCart = await cart.findOne({
      where: { username: username },
    });

    if (!existingCart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    // Check if the product exists in the cart
    const cartItem = await cart.findOne({
      where: { username: username, productId: productId },
    });

    if (!cartItem) {
      return res.status(404).send({ message: "Product not found in the cart" });
    }

    // Delete the cart item
    await cartItem.destroy();

    return res.status(204).send({ message: "Product deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};
