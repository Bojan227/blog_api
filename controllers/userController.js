const User = require('../models/userModel');
var jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '3d' });
};

const signupUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.signup(username, password);

    res.status(200).json({ message: 'Successfully singed up' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.login(username, password);
  
      const token = createToken(user._id);
  
      res.status(200).json({
        message: 'You are now logged in',
        token,
        user: user.username,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  




module.exports = {
    signupUser,
    loginUser
}