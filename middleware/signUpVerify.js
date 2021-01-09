const db = require("../models");
const User = db.user;

checkDuplicateUser = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(500).json({
        success: false,
        message: "Failed! Username is already in use!",
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(500).json({
          success: false,
          message: "Failed! Email is already in use!",
        });
        return;
      }

      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUser: checkDuplicateUser,
};

module.exports = verifySignUp;
