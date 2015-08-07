'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Category = mongoose.model('Category'),
    _ = require('lodash');

/**
 * Create a Category
 */
exports.create = function(req, res) {
  var category = new Category(req.body);

  category.save(function(err){
    if(err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.status(201).json(category);
    }

  });

};

/**
 * Show the current Category
 */
exports.read = function(req, res) {

};

/**
 * Update a Category
 */
exports.update = function(req, res) {

};

/**
 * Delete an Category
 */
exports.delete = function(req, res) {

};

/**
 * List of Categories
 */
exports.list = function(req, res) {
  Category.find().exec(function(err, categories){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(categories);
    }

  });

};
