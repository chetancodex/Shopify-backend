const db = require('../models/index');
const UserUpdate = db.Userupdate;

exports.postUserUpdate = (req,res) => {
    const username = req.params.username
    UserUpdate.findOne({username : username }).then((user)=> {
        console.log(user)
        if(!user) {
            console.log("increate")
            user =  UserUpdate.create({
               username : username,
                contactNumber : req.body.contactNumber,
                city : req.body.city,
                street : req.body.street,
                houseNumber : req.body.houseNumber,
                zipcode : req.body.zipcode
            });
        } else {
            console.log("in update")
            user.contactNumber = req.body.contactNumber;
            user.city = req.body.city;
            user.street = req.body.street;
            user.houseNumber = req.body.houseNumber;
            user.zipcode = req.body.zipcode;
            user.save()
         
        }
        return res.status(200).send(user);

    }).catch((err) => {
        return res.status(500).send({message : err})
    })
}