const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    let user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    if (user) {
      // By default the user is given the default user role
      // We can add functionality to add user type later on
      try {
        await user.setRoles([1]).then(() => {
          res.json({
            success: true,
            message: "User was registered successfully!",
          });
        });
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not found." });
    }
    var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).json({
          success: false,
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 604800, // 1 week
      });

      res.status(200).json({
        success: true,
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });

  }
};
