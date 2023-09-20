const express = require("express");
const cors = require("cors");
const db = require("./models/index");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();

//Routes
const productRoute = require("./routes/product.routes"); // Import the router
const userRoute = require('./routes/user.routes');
const userUpdateRoute = require('./routes/userUpdate.routes');
const cartRoutes = require('./routes/cart.routes');
const OrderRoutes = require('./routes/order.routes')

app.use(cors());
app.use(bodyParser.json());
//Using Routes
app.use("/products", productRoute); // Use the router with the '/products' base path
app.use("/user", userRoute);
app.use("/userUpdate", userUpdateRoute);
app.use("/cart", cartRoutes);
app.use('/order',OrderRoutes)

db.sequelize
  .sync()
  .then(() => {
    console.log("db sync to shopify");
  })
  .catch((err) => {
    console.log("Failed to sync: " + err.message);
  });

const PORT = process.env.PORT || 3360;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
