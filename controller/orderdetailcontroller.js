const db = require("../config/index");
const User = db.Users;
const Orderdetails = db.Orderdetails;
const authMiddleware = require('../middleware/auth');

exports.setOrderDetails = async  (req,res) => {
    try {
        const total_amt = req.body.amt;
        const userId = req.userData.id;
        if(!userId) {
            res.status(400).send({ message : 'Invalid userId'})
        };
        const orderdetails = {
            total_amt  : total_amt,
            userId : userId
        }
        await Orderdetails.create(orderdetails)
        res.status(200).send({message : 'Order Details is Set'})
    } catch(error) {
        res.status(500).send({message : 'Internal server Error'})
    }
};
exports.getOrderDetails = async (req,res) => {
    try {
        const userId = req.userData.id
        const orderdetails = Orderdetails.findOne({where : {userId : userId }});
        if(orderdetails) {
            res.status(200).send(orderdetails)
        }
        res.status(400).send({ message : "Client Side Error"});

    } catch (error) {
        res.status(500).send({ message : 'Internal Server Error' })
    }
}