'use strict';

class Interface {
  constructor(model) {
    this.model = model;
  }

  read(_id) {
    if (_id) {
      return this.model.find({ _id });
    }
    return this.model.find({});
  }

  create(obj) {
    const doc = new this.model(obj);
    return doc.save();
  }


}

module.exports = Interface;
