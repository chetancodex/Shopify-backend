const jwt = require('jsonwebtoken');
const secretkey = "your_secret_key_here";
module.exports = (req,res,next) => {
   try{
    const token = req.headers.authorization.split(" ")[1];
    console.log("middleware : " + token)
    const decode = jwt.verify(token, secretkey, null);
    if (decode.exp <= Math.floor(Date.now() / 1000)) {
        return res.status(401).send({ message: "Token has expired" });
      }
    req.userData = decode;
   } catch(error) {
    return res.status(401).send({ message : "Auth Fail"})
   }
    next();
}   