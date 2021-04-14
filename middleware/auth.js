const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponce = require("../utils/errorResponse");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.header.authorization &&
    req.header.authorization.startWith("Bearer")
  ) {
    token = req.header.authorization.split("")[1];
  }
  if (!token) {
    return next(new ErrorResponce("not authorized to route", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorResponce("not user found", 404));
    }
    req.user = user;
    next();
  } catch {
    return next(new ErrorResponce("not authorized to route", 401));
  }
};
