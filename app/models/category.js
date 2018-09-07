var mongoose = require('mongoose');
var CategorySchema = require('../schemas/category');
var CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;