const { User } = require("./user.model");
const bcrypt = require("bcrypt");

module.exports.userController = {
  create: async (req, res) => {
    try {
      console.log(req.body);
      let user = await User.findOne({ phone: req.body.phone });
      if (user) {
        throw new Error("Bu raqam orqali ro'yhatdan alaqachon o'tilgan");
      }
      user = new User(req.body);
      if(req.body.role === 'admin'){
        if(!user.password||!user.login){
          throw new Error("Barcha qatorlarni to'ldiring!")
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      return res.status(422).json({message: error.message});
    }
  },
  getAll: async (req, res) => {
    try {
      console.log('get');
        const users = await User.find()
        .sort({name: 1})
        res.status(200).json(users)
    } catch (error) {
      return res.status(404).send(error.message);
    }
  },
  delete: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndRemove(req.params.id)
      res.status(200).json(deletedUser)
    } catch (error) {
      return res.status(404).send(error.message);
    }
  },
  update: async (req, res) => {
    try {
      delete req.body.role
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
      res.status(200).json(updatedUser)
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
};
