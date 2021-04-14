const User = require("../models/User");
const ErrorResponce = require("../utils/errorResponse");
exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
  
    try {
      const user = await User.create({
        username,
        email,
        password,
      });
  
      sendToken(user, 200, res);
    } catch (error) {
      next(error);
    }
  };
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponce("provide valid email and password ", 400));
  }
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponce("invalid credntionals", 401));
    }
    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponce("invalid credentials", 401));
    }
    
    sendToken(user, 200, res);

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.forgotpassword = (req, res, next) => {
  const {email}=req.body;
  try{
    const user = await User.findOne((email));
    if(!user){
      return next(new ErrorResponce("email not send",404))
    }
    const resetToken = user.getResetPasswordToken();
    await user.save();
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`
    const message = `<h1>password reset request found</h1>`
  }catch (error){

  }
};
exports.resetpassword = (req, res, next) => {
  res.send("rpassword reset  route");
};
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ sucess: true, token });
  };
