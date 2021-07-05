const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
// User model
const User = require("../../models/User");

/** 
 * @route  POST api/users
 * @desc   Register a new user
 * @access Public
*/
router.post("/", (req,res) => {
  const { name, email, password } = req.body;

  // Validation
  if(!name) {
    return res.status(400).json({ msg: "Please enter username" });
  } else if(!email) {
    return res.status(400).json({ msg: "Please enter email" });
  } else if(!password) {
    return res.status(400).json({ msg: "Please enter password" })
  }

  // Check if user exists
  User.findOne({ email })
    .then(user => {
      if(user) {
        return res.status(400).json({ msg: "User already exists" })
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;

            // Save new user to db
            newUser.save()
              .then(user => {

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

      }
    })
}) 

module.exports = router;