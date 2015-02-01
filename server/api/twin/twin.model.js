'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TwinSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Twin', TwinSchema);