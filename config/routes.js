//var Movie = require('../models/movie');
//var User = require('../models/user');
//var _ = require('underscore');
var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
var Comment = require('../app/controllers/comment');

module.exports = function(app){
  // pre handle user
  app.use(function(req, res, next){
    var _user = req.session.user;
    app.locals.user = _user;
    console.log(_user);
    next();
    //if(_user){
    //  app.locals.user = _user;
    //}
    //return next();
  });

//  // index page
  app.get('/', Index.index);
//  app.get('/', function(req, res){ 
//    console.log('user in session:');
//    console.log(req.session.user);
//
//    //var _user = req.session.user;
//    //if(_user){
//    //  app.locals.user = _user;
//    //}
//
//    Movie.fetch(function(err, movies){
//      if(err){
//        console.log(err);
//      }
//
//      res.render('index', {
//        title: 'imooc 首页',
//        movies: movies
//      });
//    });
//  });

//  // signup
  app.post('/user/signup', User.signup);
//  app.post('/user/signup', function(req, res){
//    var _user = req.body.user;
//    //var user = new User(_user);
//
//    User.find({name: _user.name}, function(err, user){
//      if(err){
//        console.log(err);
//      }
//
//      if(user){
//        return res.redirect('/');
//      }
//      else {
//        var user = new User(_user);
//        user.save(function(err, user){
//          if(err){
//            console.log(err);
//          }
//          res.redirect('/admin/userlist');
//        });
//      }
//    });
//
//    //user.save(function(err, user){
//    //  if(err){
//    //    console.log(err);
//    //  }
//
//    // res.redirect('/admin/userlist');
//      //console.log(user);
//    //});
//
//    // /user/signup/:userid
//    // var _userid = req.params.userid
//
//    // /user/signup/11111?userid=11112
//    // var _userid = req.query.userid
//
//    // form submit
//    // var _userid = req.body.userid
//
//    //req.param('user');
//
//    // /user/signup/1111?userid=1112
//    // {userid: 1113}
//
//    // req.param('userid'); //routing-boday-url
//    // 1. 1111
//    // 2. 1113
//    // 3. 1112
//
//    //console.log(_user);
//  });
//
//  // signin
  app.post('/user/signin', User.signin);
//  app.post('/user/signin', function(req, res){
//    var _user = req.body.user;
//    var name = _user.name;
//    var password = _user.password;
//
//    User.findOne({name: name}, function(err, user){
//      if(err){
//        console.log(err);
//      }
//
//      if(!user){
//        return res.redirect('/');
//      }
//
//      user.comparePassword(password, function(err, isMatch){
//        if(err){
//          console.log(err);
//        }
//
//        if(isMatch){
//          console.log('Password is matched');
//          req.session.user = user;
//          return res.redirect('/');
//        }
//        else{
//          console.log('Password is not matched');
//        }
//      });
//    });
//  });
//
  app.get('/signin', User.showSignin);
  app.get('/signup', User.showSignup);
//  // logout
  app.get('/logout', User.logout);
//  app.get('/logout', function(req, res){
//    delete req.session.user;
//    delete app.locals.user;
//    res.redirect('/');
//  });

//
//  // userlist page
    //app.get('/admin/userlist', User.signinRequired, User.adminRequired, User.list);
  app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list);
//  app.get('/admin/userlist', function(req, res){
//    User.fetch(function(err, users){
//      if(err){
//        console.log(err);
//      }
//
//      res.render('userlist', {
//        title: 'imooc 用户列表页',
//        users: users
//      });
//    });
//  });

//  // detail page
  app.get('/movie/:id', Movie.detail);
//  app.get('/movie/:id', function(req, res){
//    var id = req.params.id;
//    
//    Movie.findById(id, function(err, movie){
//      res.render('detail', {
//        //title: 'imooc' + movie.title,
//        title: movie.title,
//        movie: movie
//      });
//    });
//  });
//
//  // admin page
    //app.get('/admin/new', Movie.new);
    //app.get('/admin/new', User.signinRequired, User.adminRequired, Movie.new);
  app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new);
//  app.get('/admin/new', function(req, res){
//    res.render('admin', {
//      title: 'imooc 后台录入页',
//      movie: {
//        title: '',
//        doctor: '',
//        country: '',
//        year: '',
//        poster: '',
//        flash: '',
//        summary: '',
//        language: ''
//      }
//    });
//  });
//
//  // admin update movie
    //app.get('/admin/update/:id', Movie.update);
    //app.get('/admin/update/:id', User.signinRequired, User.adminRequired, Movie.update);
  app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update);
//  app.get('/admin/update/:id', function(req, res){
//    var id = req.params.id;
//
//    if(id){
//      Movie.findById(id, function(err, movie){
//        res.render('admin', {
//          title: 'imooc 后台更新页',
//          movie: movie
//        });
//      });
//    }
//  });
//
//
//  // admin post movie
    //app.post('/admin/movie', Movie.save);
  app.post('/admin/movie', User.signinRequired, User.adminRequired, Movie.save);
//  app.post('/admin/movie/new', function(req, res){
//    var id = req.body.movie._id;
//    var movieObj = req.body.movie;
//    var _movie;
//
//    if(id !== 'undefined'){
//      Movie.findById(id, function(err, movie){
//        if(err){
//          console.log(err);
//        }
//        _movie = _.extend(movie, movieObj);
//        _movie.save(function(err, movie){
//          if(err){
//            console.log(err);
//          }
//
//          res.redirect('/movie/' + movie._id);
//        });
//      });
//    }
//    else{
//      _movie = new Movie({
//        doctor: movieObj.doctor,
//        title: movieObj.title,
//        country: movieObj.country,
//        language: movieObj.language,
//        year: movieObj.year,
//        poster: movieObj.poster,
//        summary: movieObj.summary,
//        flash: movieObj.flash
//      });
//      _movie.save(function(err, movie){
//        if(err){
//          console.log(err);
//        }
//
//        res.redirect('/movie/' + movie._id);
//      });
//    }
//  });
//
//  // list page
    //app.get('/admin/list', Movie.list);
    //app.get('/admin/list', User.signinRequired, User.adminRequired, Movie.list);
  app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list);
//  app.get('/admin/list', function(req, res){
//    Movie.fetch(function(err, movies){
//      if(err){
//        console.log(err);
//      }
//
//      res.render('list', {
//        title: 'imooc 列表页',
//        movies: movies
//      });
//    });
//  });
//
//  // list delete movie
    //app.delete('/admin/list', Movie.del);
    //app.delete('/admin/list', User.signinRequired, User.adminRequired, Movie.list);
  app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list);
//  app.delete('/admin/list', function(req, res){
//    var id = req.query.id;
//
//    if(id){
//      Movie.remove({_id: id}, function(err, movie){
//        if(err){
//          console.log(err);
//        }
//        else{
//          res.json({success: 1});
//        }
//      });
//    }
//  });


//  // Comment
  app.post('/user/comment', User.signinRequired, Comment.save);
};
