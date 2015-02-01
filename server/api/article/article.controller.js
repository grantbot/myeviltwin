'use strict';

var _ = require('lodash');
var Article = require('./article.model');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
 

// Get list of articles
exports.index = function(req, res) {
  Article.find(function (err, articles) {
    if(err) { return handleError(res, err); }
    return res.json(200, articles);
  });
};

// Get a single article
exports.show = function(req, res) {
  Article.findById(req.params.id, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    return res.json(article);
  });
};

// Creates a new article in the DB.
exports.create = function(req, res) {
  Article.create(req.body, function(err, article) {
    if(err) { return handleError(res, err); }
    return res.json(201, article);
  });
  var options = {
    auth: {
      api_user: 'myeviltwinlikes',
      api_key: 'myeviltwin1'
    }
  };
  // create reusable transporter object using SMTP transport
  var transporter = nodemailer.createTransport(sgTransport(options));

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: 'Your Evil Twin ✔ <myeviltwinlikes@gmail.com>', // sender address
    to: 'myeviltwinlikes@gmail.com', // list of receivers
    subject: 'Hello', // Subject line
    text: req.body.url.toString(), // plaintext body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
    }else{
      console.log('Message sent: ' + info.response);
    }
  });

};

// Updates an existing article in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Article.findById(req.params.id, function (err, article) {
    if (err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    var updated = _.merge(article, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, article);
    });
  });
};

// Deletes a article from the DB.
exports.destroy = function(req, res) {
  Article.findById(req.params.id, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    article.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}


