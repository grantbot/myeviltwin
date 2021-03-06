'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  url: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Article', ArticleSchema);
