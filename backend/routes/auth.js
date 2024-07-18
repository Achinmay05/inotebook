const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT_SECRET = 'theMantheMythThe$Legend';
var jwt = require('jsonwebtoken');
var fetchUser = require('../middleware/fetchUser'); 


// ROUTE 1 : create a user using : POST "/api/auth/createuser". No login required 
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email id').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
  let success = false;
  // if there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  //check whether the user with this email exists already
  try {


    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "User with this email address alredy exists !" })
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    //create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email
    });

    const data = {
      user: {
        id: user.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);


    // res.json(user)
    success = true;
    res.json({ success, authtoken })
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error has Occured");
  }
})


//ROUTE 2: Authenticate a user using : POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email id').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // if there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res.status(400).json({ error: "Please login with correct Credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({ success, error: "Please login with correct Credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
   success = true;
    res.json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error has Occured");
  }

})

//ROUTE 3: get logged in user details using POST "api/auth/getuser". Login required
router.post('/getuser', fetchUser, async (req, res) => {
try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password") //select all fields except the password
  res.send(user)
} catch (error) {
  console.error(error.message);
  res.status(500).send("Some Error has Occured");
}
})
module.exports = router 