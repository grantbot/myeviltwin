'use strict';

var _ = require('lodash');
var Twin = require('./twin.model');

// Get list of twins
exports.index = function(req, res) {
  Twin.find(function (err, twins) {
    if(err) { return handleError(res, err); }
    return res.json(200, twins);
  });
};

// Get a single twin
exports.show = function(req, res) {
  Twin.findById(req.params.id, function (err, twin) {
    if(err) { return handleError(res, err); }
    if(!twin) { return res.send(404); }
    return res.json(twin);
  });
};

// Creates a new twin in the DB.
exports.create = function(req, res) {
  Twin.create(req.body, function(err, twin) {
    if(err) { return handleError(res, err); }
    return res.json(201, twin);
  });
};

// Updates an existing twin in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Twin.findById(req.params.id, function (err, twin) {
    if (err) { return handleError(res, err); }
    if(!twin) { return res.send(404); }
    var updated = _.merge(twin, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, twin);
    });
  });
};

// Deletes a twin from the DB.
exports.destroy = function(req, res) {
  Twin.findById(req.params.id, function (err, twin) {
    if(err) { return handleError(res, err); }
    if(!twin) { return res.send(404); }
    twin.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}