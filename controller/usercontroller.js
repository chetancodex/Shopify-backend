const db = require('../models/index');
const User = db.Users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretkey = "your_secret_key_here";
//For Register
exports.register = (req,res) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        hash_password: bcrypt.hashSync(req.body.password, 10), // Hash the password
      };
      
      User.create(user)
        .then((user) => {
          res.status(200).send(user);
        })
        .catch((error) => {
          console.error('Error:', error);
          res.status(500).send({
            message: 'An error occurred while creating the user.'})
         });
};
// For Sign IN 
exports.signIn = async(req,res) => {
try {
    const user = await User.findOne({ where : {email : req.body.email} });
    if(!user || !user.comparePassword(req.body.password)) {
        return res.status(400).send({message : "Email or Password is Invalid"});
    }
    const token = jwt.sign(
        {
            email : user.email,
            username: user.username,
            id : user.id
        },
        secretkey
    );
    res.header('Authorization', `Bearer ${token}`);
    return res.status(200).send({ token, username: user.username });
} catch (error) {
  return  res.status(500).send({message : "Server Not Responding", er:error})
}
}

// function authenticateToken(req, res, next) {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, secretkey);
//     req.user = decoded; // Set user information in the request
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: 'Invalid token' });
//   }
// }


exports.delete = (req,res) => {
 User.destroy({
  where: { id: req.params.id }
})
  .then(deletedRows => {
    if (deletedRows === 0) {
      res.status(404).send({ message: ` User with ID ${id} not found` });
    } else {
      res.status(200).send({ message: `User with ID ${id} deleted successfully` });
    }
  })
  .catch(error => {
    console.error('Error:', error);
    res.status(500).send({ message: 'Error deleting User' });
  });

}

// module.exports = authenticateToken;