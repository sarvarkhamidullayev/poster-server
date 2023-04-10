const { mongoose } = require("mongoose");
const { User } = require("../users/user.model");
const Order = require("./order.model");
const _ = require('lodash');

// Create a new order
const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { products, user } = req.body;

    let checkUser = await User.findOne({ phone: user.phone }).session(session);
    if (!checkUser) {
      checkUser = new User({
        ...user
      });
      await checkUser.save({ session });
    }
    const order = new Order({
      products: products.map(p => {
        return _.pick(p, ['_id', 'title', 'price', 'quantity', 'measure' ]);
      }),
      user: checkUser._id
    });
    const totalSum = products.reduce((acc, item) => {
      return acc + item.quantity * item.price
    }, 0)
    order.total = totalSum;

    // Create the order
    await order.save({ session });


    await session.commitTransaction();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    await session.abortTransaction();
    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};
// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    .populate('products')
    .populate('user')

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const updateOrderById = async(req, res) =>{
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, {$set: {status: req.body.status}}, {new: true})
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}




module.exports = {
  createOrder,
  getAllOrders,
  updateOrderById
};