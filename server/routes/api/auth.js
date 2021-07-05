const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User model
const User = require("../../models/User");

/** 
 * @route  POST api/auth
 * @desc   Authenticate user
 * @access Public
*/
router.post("/", (req,res) => {
  const { email, password } = req.body;

  // Validation
  if(!email) {
    return res.status(400).json({ msg: "Please enter email" });
  } else if(!password) {
    return res.status(400).json({ msg: "Please enter password" })
  }

  // Check if user exists
  User.findOne({ email })
    .then(user => {
      if(!user) return res.status(400).json({ msg: "User does not exist" });

      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ msg: "Password or email is incorrect" });

          jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: 7200 },
            (err, token) => {
              if(err) throw err;
              res.json({
                token,
                user: {
                  id: user._id,
                  name: user.name,
                  email: user.email
                }
              })
            }
          )

        })

    })
}) 


/** 
 * @route  GET api/auth/user
 * @desc   Get user data
 * @access Private
*/
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user))
})


module.exports = router;