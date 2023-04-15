const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { requireSignIn, userMiddleware } = require("../common-middleware");
exports.requireSignIn = (req, res, next) => {
  if (req.headers.autherization === null) {
    return res.status(400).json({ message: "Authorization required" });
  }
  console.log(req.headers)
  const token = req.headers.authorization.split(' ')[1];
  const user = jwt.verify(token, process.env.TOKEN_SECRET);
  req.user = user;
  next();
};
exports.reqUserEmail = (req, res, next) => {    
    if (Object.keys(req.cookies).length==0) {
      return res.status(400).json({ message: "User email required" });
    }
    else{
        next();
    }
    
  };
exports.requireCustomerEmail=(req, res, next)=>{
    if (req.headers.autherization === null) {
        return res.status(400).json({ message: "Authorization required" });
      }
      
    next()
}  
exports.userMiddleware = (req, res, next) => {
  if (req.user._id) {
    User.findOne({ _id: req.user._id }).exec((error, user) => {
      if (error || user.role !== "user") {
        return res
          .status(400)
          .json({ message: "Only user can acces this area" });
      }
    });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user._id) {
    User.findOne({ _id: req.user._id }).exec((error, user) => {
      if (error || user.role !== "admin") {
        return res
          .status(400)
          .json({ message: "Only admin can acces this area" });
      }
    });
  }
  next();
};
