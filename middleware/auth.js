const jwt = require('jsonwebtoken');
const secretkey = "your_secret_key_here";
module.exports = (req,res,next) => {
   try{
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const decode = jwt.verify(token, secretkey, null)
    req.userData = decode;
   } catch(error) {
    return res.status(401).send({ message : "Auth Fail"})
   }
    next();
}