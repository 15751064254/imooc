var Movie = require('../models/movie');
var Catetory = require('../models/category');

// index page
exports.index = function(req, res){
//app.get('/', function(req, res){ 
  console.log('user in session:');
  console.log(req.session.user);

  Catetory
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
