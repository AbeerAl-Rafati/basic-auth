'use strict';

const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true }
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel;