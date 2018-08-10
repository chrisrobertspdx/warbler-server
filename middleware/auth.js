require("dotenv").load();
const jwt = require("jsonwebtoken");

exports.loginRequired = function(req,res,next) {
  try {
    let token = "";
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
    else {
      token = "123";
    }
    console.log(token);
    jwt.verify(token,process.env.SECRET_KEY, function(err, payload) {
      if (payload) {
        console.log("payload",payload);
        return next();
      }
      else {
        return next({
          status: 401,
          message: "Please log in first"
        })
      }
    })
  } catch (err) {
    return next(err);
  }
};

exports.ensureCorrectUser = function(req,res,next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
          return next({
            status: 401,
            message: "Unauthorized"
          });
      }
    })
  } catch(err) {
      return next(err);
  }
}