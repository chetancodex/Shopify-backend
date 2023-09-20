const db = require("../models/index");
const UserUpdate = db.Userupdate;
const authMiddleware = require("../middleware/auth");

exports.postUserUpdate = async (req, res) => {
  const username = req.userData.username;
  const { contactNumber, city, street, houseNumber, zipcode } = req.body;

  try {
    // Check if the user already exists
    let user = await UserUpdate.findOne({ where: { username: username } });

    if (!user) {
      // User doesn't exist, create a new user
      user = await UserUpdate.create({
        username: username,
        contactNumber: contactNumber,
        city: city,
        street: street,
        houseNumber: houseNumber,
        zipcode: zipcode,
      });
    } else {
      // User exists, update user's information
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
