const User = require("../model/user");
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const qrcode = require("qrcode");
// Register
// ...

router.post("/register", async (req, res) => {
    // Our register logic starts here
  
    try {
      // Get user input
      console.log('req.body',req.body)
      const { name, email, password, type } = req.body;
  
      // Validate user input
      if (!(email && password &&  name )) {
        res.status(400).send({"message":"All input is required"});
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      // Encrypt user password
      let encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
        type
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
  
      // return new user
      res.status(201).json({ token });
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });
  
  // ...
  ;

// Login
// ...

router.post("/login", async (req, res) => {
    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).json({"message":"All input is required"});
      }
  
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        return res.status(200).json({ token });
      }
      return res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    // Our login logic ends here
  });
  
  // ...
  

module.exports = router;