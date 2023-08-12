const db = require("../models/index");
const Product = db.Products;
// Get all products
exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured while fetching data" });
  }
};
// Post a Product
exports.postProduct = (req, res) => {
  console.log("here");
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const product = {
    image: req.body.image,
    name: req.body.name,
    description: req.body.description,
    rating: req.body.rating,
    price: req.body.price,
    brand: req.body.brand,
    modelName: req.body.modelName,
    color: req.body.color,
  };
  Product.create(product).then((data) => {
    res.status(200).send(data);
  });
};

exports.FindOneProductById = (req, res) => {
  const id = req.params.id;
  console.log("here");

  Product.findByPk(id)
  .then(product => {
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(400).send({message : "product not found"});
    }
  })
  .catch(error => {
    res.status(500).send('Error:', error);
  });

};

exports.updateProduct = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const id = req.params.id;
  Product.update(req.body, {
    where: { id: id }
  })
    .then(updatedRows => {
      if (updatedRows[0] === 0) {
        res.status(404).send({ message: `Product with ID ${id} not found` });
      } else {
        res.status(200).send({ message: 'Product updated successfully' });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send({ message: 'Error updating product' });
    });
};
exports.deleteOneProduct = (req, res) => {
  const id = req.params.id;
 
  Product.destroy({
    where: { id: id }
  })
    .then(deletedRows => {
      if (deletedRows === 0) {
        res.status(404).send({ message: `Product with ID ${id} not found` });
      } else {
        res.status(200).send({ message: `Product with ID ${id} deleted successfully` });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send({ message: 'Error deleting product' });
    });
};
