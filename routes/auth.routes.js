const router = require("express").Router();

const autho = require("../controllers/auth.controller.js");

const { verifySignUp } = require("../middleware");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Signup function
router.post(
  "/auth/signup",
  [verifySignUp.checkDuplicateUser],
  autho.signup // Verifies that the user does not already exist
);

//Route for Signin
router.post("/auth/signin", autho.signin);

module.exports = router;
