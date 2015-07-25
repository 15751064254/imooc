var Movie = require('../models/movie');
var Category = require('../models/category');
var Comment = require('../models/comment');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');

// detail page
exports.detail = function(req, res){
//app.get('/movie/:id', function(req, res){
  var id = req.params.id;

  Movie.update({_id: id}, {$inc: {pv: 1}}, function(err){
    if(err){
      console.log(err);
    }
  });
  
  Movie.findById(id, function(err, movie){
    Comment
      .find({movie: id})
      .populate('from', 'name')
      .populate('reply.from reply.to', 'name')
      .exec(function(err, comments){
        console.log('comments:');
        console.log(comments);
        res.render('detail', {
          title: 'imooc 详情页',
          movie: movie,
          comments: comments
        });
      });
//    Comment.find({movie: id}, function(err, comments){
//      console.log(comments);
//      res.render('detail', {
//        title: 'imooc 详情页',
//        movie: movie,
//        comments: comments
//      });
//    });
//    res.render('detail', {
//      //title: 'imooc' + movie.title,
//      title: movie.title,
//      movie: movie
//    });
  });
};
//});

// admin new page
exports.new = function(req, res){
  Category.find({}, function(err, categories){
    res.render('admin', {
      title: 'imooc 后台录入页',
      categories: categories,
      movie: {}
    });
  });
};
//exports.new = function(req, res){
////app.get('/admin/movie', function(req, res){
//  res.render('admin', {
//    title: 'imooc 后台录入页',
//    movie: {
//      title: '',
//      doctor: '',
//      country: '',
//      year: '',
//      poster: '',
//      flash: '',
//      summary: '',
//      language: ''
//    }
//  });
//};
//});

// admin update movie
exports.update = function(req, res){
//app.get('/admin/update/:id', function(req, res){
  var id = req.params.id;

  if(id){
    Movie.findById(id, function(err, movie){
      Category.find({}, function(err, categories){
        res.reder('admin', {
          title: 'imooc 后台更新页',
          movie: movie,
          categories: categories
        });
      });
//      res.render('admin', {
//        title: 'imooc 后台更新页',
//        movie: movie
//      });
    });
  }
};
//});

// admin poster
exports.savePoster = function(req, res, next){
  var posterData = req.files.uploadPoster;
  var filePath = posterData.path;
  var originalFilename = posterData.originalFilename;

  if(originalFilename){
    fs.readFile(filePaht, function(err, data){
      var timestamp = Date.now();
      var type = posterData.type.split('/')[1];
      var poster = timestamp + '.' + type;
      var newPath = path.join(__dirname, '../../', 'public/upload/' + poster);

      fs.writeFile(newPath, data, function(err){
        req.poster = poster;
        next();
      });
    });
  }
  else{
    next();
  }
};


// admin post movie
exports.save = function(req, res){
//app.post('/admin/movie/new', function(req, res){
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;

  if(req.poster){
    movieObj.poster = req.poster;
  }

//  if(id !== 'undefined'){
  if(id){
    Movie.findById(id, function(err, movie){
      if(err){
        console.log(err);
      }
      _movie = _.extend(movie, movieObj);
      _movie.save(function(err, movie){
        if(err){
          console.log(err);
        }

        res.redirect('/movie/' + movie._id);
      });
    });
  }
  else{
    _movie = new Movie(movieObj);

    var categoryId = movieObj.category;
    var categoryName = movieObj.categoryName;

    _movie.save(function(err, movie){
      if(err){
        console.log(err);
      }
      if(categoryId){
        Category.findById(categoryId, function(err, category){
          category.movies.push(movie._id);

          category.save(function(err, category){
            res.redirect('/movie/' + movie._id);
          });
        });
      }
      else if (categoryName){
        var category = new Category({
          name: categoryName,
          movies: [movie._id]
        });

        category.save(function(err, category){
          movie.category = category._id;
          movie.save(function(err, movie){
            res.redirect('/movie/' + movie._id);
          });
        });
      }
    });
//    _movie = new Movie({
//      doctor: movieObj.doctor,
//      title: movieObj.title,
//      country: movieObj.country,
//      language: movieObj.language,
//      year: movieObj.year,
//      poster: movieObj.poster,
//      summary: movieObj.summary,
//      flash: movieObj.flash
//    });
    
//    _movie.save(function(err, movie){
//      if(err){
//        console.log(err);
//      }
//
//      res.redirect('/movie/' + movie._id);
//    });
  }
};
//});

// list page
exports.list = function(req, res){
//app.get('/admin/list', function(req, res){
  //Movie.fetch(function(err, movies){
  Movie.find({})
    .populate('category', 'name')
    .exec(function(err, movies){
      if(err){
        console.log(err);
      }

      res.render('list', {
        title: 'imooc 列表页',
        movies: movies
      });
    });
};
//});

// list delete movie
exports.del = function(req, res){
//app.delete('/admin/list', function(req, res){
  var id = req.query.id;

  if(id){
    Movie.remove({_id: id}, function(err, movie){
      if(err){
        console.log(err);
        res.json({success: 0});
      }
      else{
        res.json({success: 1});
      }
    });
  }
};
//});
