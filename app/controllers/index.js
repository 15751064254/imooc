var Movie = require('../models/movie');
var Category = require('../models/category');

// index page
exports.index = function(req, res){
//app.get('/', function(req, res){ 
  //console.log('user in session:');
  //console.log(req.session.user);

  Category
    .find({})
    .populate({
      path: 'movies',
      select: 'title poster',
      options: { limit: 6 }
    })
    .exec(function(err, categories){
      if(err){
        console.log(err);
      }

      res.render('index', {
        title: 'imooc 首页',
        categories: categories
      });
    });

  //var _user = req.session.user;
  //if(_user){
  //  app.locals.user = _user;
  //}

//  Movie.fetch(function(err, movies){
//    if(err){
//      console.log(err);
//    }
//
//    res.render('index', {
//      title: 'imooc 首页',
//      movies: movies
//    });
//  });
};
//});

// search page
exports.search = function(req, res){
  var catId = req.query.cat;
  var q = req.query.q;
  var page = parseInt(req.query.p, 10) || 0;
  var count = 5;
  var index = page * count;


  if(catId){
    Category
      .find({_id: catId})
      .populate({
        path: 'movies',
        select: 'title poster'
      })
      .exec(function(err, categories){
        //console.log(categories);
        if(err){
          console.log(err);
        }
        var category = categories[0] || {};
        var movies = category.movies || [];
        var results = movies.slice(index, index + count);

        res.render('results', {
          title: 'imooc 结果列表页',
          keyword: category.name,
          currentPage: (page + 1),
          query: 'cat=' + catId,
          totalPate: Math.ceil(movies.length / count),
          movies: results
        });
      });
  }
  else{
    Movie
      .find({title: new RegExp(q + '.*', 'i')})
      .exec(function(err, movies){
        if(err){
          console.log(err);
        }
        var results = movies.slice(index, index + count);

        res.render('results', {
          title: 'imooc 结果列表页',
          keyword: q,
          currentPage: (page + 1),
          query: 'q=' + q,
          totalPage: Math.ceil(movies.length / count),
          movies: results
        });
      });
  }
};
