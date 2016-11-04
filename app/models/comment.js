var mongoose = require('mongoose');
var CommentSchema = require('../schemas/comment');
var CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = CommentModel;
