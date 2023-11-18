const db = require("../config/index");
const UserUpdate = db.Userupdate;
const authMiddleware = require("../middleware/auth");

exports.postUserUpdate = async (req, res) => {
  const username = req.userData.username;
  const { contactNumber, city, street, houseNumber, zipcode } = req.body;

  try {
    let user = await UserUpdate.findOne({ where: { username: username } });

    if (!user) {
      user = await UserUpdate.create({
        username: username,
        contactNumber: contactNumber,
        city: city,
        street: street,
        houseNumber: houseNumber,
        zipcode: zipcode,
      });
    } else {
      user.contactNumber = contactNumber;
      user.city = city;
      user.street = street;
      user.houseNumber = houseNumber;
      user.zipcode = zipcode;
      await user.save();
    }

    return res.status(200).send(user);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Server Error", error: error.message });
  }
};
exports.getUserDetails = async(req,res) => {
  try {
    const username = req.userData.username
    const userDetails = await UserUpdate.findOne({ where : { username : username}});
    if(!userDetails) {
      res.status(201).send({ message : 'Data not Available'})
    }
    res.status(200).send(userDetails)
  } catch (error) {
    res.status(500).send({ message : 'Internal Server Error'})
  }
}
