const express = require("express");
const cors = require("cors");
const db = require("./models/index");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();

//Routes
const productRoute = require("./routes/productroutes"); // Import the router
const userRoute = require('./routes/userroutes');
const userUpdateRoute = require('./routes/userUpdateroutes');
const cartRoutes = require('./routes/cartroutes');

app.use(cors());
app.use(bodyParser.json());
//Using Routes
app.use("/products", productRoute); // Use the router with the '/products' base path
app.use("/user", userRoute);
app.use("/userUpdate", userUpdateRoute);
app.use("/cart", cartRoutes);

db.sequelize
  .sync()
  .then(() => {
    console.log("db sync to shopify");
  })
  .catch((err) => {
    console.log("Failed to sync: " + err.message);
  });

app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      function (err, decode) {
        if (err) {
          req.user = undefined;
        } else {
          req.user = decode;
          console.log(req.user)
        }
      }
    );
  } else {
    req.user = undefined;
  }
});
const PORT = process.env.PORT || 3360;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
