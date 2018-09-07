var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
var MovieModel = mongoose.model('Movie', MovieSchema);

module.exports = MovieModel;