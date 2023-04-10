const bcrypt = require('bcrypt');
const _ = require('lodash')
const jwt = require('jsonwebtoken');
const { User } = require('../users/user.model');

module.exports.authController = {
  signin: async (req, res) => {
    try {
      const { login, password } = req.body
      console.log(req.body);
        const user = await User.findOne({login: login})
        if(!user){
          throw new Error('Bunday foydalanuvchi mavjud emas!')
        }
        const checkpass = await bcrypt.compare(password, user.password)
        if(!checkpass){
          throw new Error('Parolingiz xato bo\'lishi mumkin!')
        }
        console.log(user);
        const token =  jwt.sign({nickname: user.nickname, _id: user._id, role: user.role}, process.env.ZOROBOT_KEY, {expiresIn: '1d' })
        return res.status(200).json({token: token, user: {id: user._id, tgId: user.tgId}})
    } catch (error) {
      console.log(error.message);
      res.status(209).send(error.message);
    }
  },
  
  resetPassword: async(req, res) => {
    try {
      const user = await User.findOne({phone: req.body.phone})
    if(user){
      const resPass = await bcrypt.compare(req.body.oldPassword, user.password)
      if(resPass){
        console.log('1');
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.newPassword, salt)
        await user.save()
        return res.status(200).json(user)
      }
      throw new Error("Eski parolingiz noto'g'ri kiritilgan!")
    }
    throw new Error("Bunday foydalanuvchi mavjud emas!")
    } catch (error) {
      console.log(2);
      res.status(409).json(error.message);
    }
  }
};
