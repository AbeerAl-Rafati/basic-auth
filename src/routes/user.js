'use strict';
const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const Interface = require('../models/interface');
const user = new Interface(userModel);

const bcrypt = require('bcrypt');
const base64 = require('base-64');






let signUp = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const newUser = new user(req.body);
    const record = await newUser.save(req.body);
    res.status(200).json(record);
  } catch (error) {
    res.status(403).send('you can\'t create user');
  }
}



let signIn = async (req, res, next) => {

  let basicHeaderParts = req.headers.authorization.split(' ');
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');

  try {
    const newUser = await user.findOne({ username: username })
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(newUser);
    }
    else {
      // throw new Error('Invalid User')
      next('invalid usre')
    }
  } catch (error) { res.status(403).send("Invalid Login"); }


}



router.post('/signup', signUp);
router.post('/signin', signIn);



module.exports = router;
