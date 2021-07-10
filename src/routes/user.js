'use strict';
const express = require('express');
const router = express.Router();
const user = require('../models/user');
const bcrypt = require('bcrypt');


const basic = require('../middlewares/basic')





let signUp = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const exist = await user.findOne({ username: req.body.username })
    const newUser = new user(req.body);
    const record = await newUser.save(req.body);
    res.status(200).json(record);
  } catch (error) {
    res.status(403).json({ message: error.message })
  }
}



let signIn = async (req, res, next) => {

  res.status(200).json(req.user);

}



router.post('/signup', signUp);
router.post('/signin', basic, signIn);



module.exports = router;
