const base64 = require('base-64');
const bcrypt = require('bcrypt');
const userModel = require('../models/user');




module.exports = async (req, res, next) => {

  if (!req.headers.authorization) {
    next('Invalid Login');
    return;
  }

  let basicHeaderParts = req.headers.authorization.split(' ');
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');

  try {
    const newUser = await userModel.findOne({ username: username })
    const valid = await bcrypt.compare(password, newUser.password);
    if (valid) {
      res.status(200).json(newUser);
      console.log(req.headers.authorization);
    }
    else {
      // throw new Error('Invalid User')
      next('invalid usre')
    }
  } catch (error) {
    res.status(403).send("Invalid Login xxxx");
    // console.log(req);
    // console.log(req.headers);
    console.log(req.headers.authorization);
    console.log(base64.decode(req.headers.authorization.split(' ').pop()));
    console.log(userModel);
  }

}