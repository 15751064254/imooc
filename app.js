var express = require('express');//加载 express 模块
var path = require('path');//引入path模块
var mongoose = require('mongoose');//引入mongoose模块

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multipart = require('connect-multiparty');
var session = require('express-session');
//var mongoStore = require('connect-mongo')(express);
var MongoStore = require('connect-mongo')(session);
var morgan = require('morgan');
var serveStatic = require('serve-static');
//var Movie = require('./models/movie');
//var User = require('./models/user');
//var _ = require('underscore');

var port = process.env.PORT || 3000;// process 全局变量，获得传入参数

var app = express();//启动 web 服务器
var fs = require('fs');
var dbUrl = 'mongodb://192.168.200.250/imooc';
//mongoose.connect('mongodb://localhost/imooc');
mongoose.connect(dbUrl);

// models loading
var models_path = __dirname + '/app/models';
var walk = function (path) {
  fs
    .readdirSync(path)
    .forEach(function (file) {
      var newPath = path + '/' + file;
      var stat = fs.statSync(newPath);

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(newPath);
        }
      }
      else if (stat.isDirectory()) {
        walk(newPath);
      }
    });
};
walk(models_path);

//app.set('views','./views/pages');//设置视图根目录
app.set('views', './app/views/pages');//设置视图根目录
app.set('view engine', 'jade');//设置默认模板引擎
//app.use(express.bodyParser); //格式化数据
//app.use(bodyParser.urlencoded({ extended: false }));//TypeError: Cannot read property '_id' of undefined
//app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.cookieParser());
app.use(cookieParser());
app.use(multipart());

app.use(session({
  secret: 'imooc',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: dbUrl,
    collection: 'sessions'
  })
}));

//app.use(express.session({
//  secret: 'imooc',
//  store: new mongoStore({
//    url: dbUrl,
//    collection: 'sessions'
//  })
//}));

//设置入口文件，输出日志和错误信息
if ('development' === app.get('env')) {
  app.set('showStackError', true);
  //app.user(express.logger(':method :url :status'));
  app.use(morgan(':method :url :status'));
  app.locals.pretty = true; //格式化代码
  mongoose.set('debug', true);
  //app.locals.pretty = false; //格式化代码
  //mongoose.set('debug', false);
}


require('./config/routes')(app);

//app.use(function(err, req, res, next){
//  console.error(err.stack);
//  res.status(err.status || 500);
//  res.render('error', {
//    message: err.message,
//    error: err
//  });
//});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.locals.moment = require('moment');
//app.use(express.static(path.join(__dirname, 'public'))); //dirname当前目录
app.use(serveStatic(path.join(__dirname, 'public'))); //dirname当前目录

app.listen(port, () =>
  console.log('imooc startd on port ' + port));//监听端口
//console.log('imooc startd on port ' + port);//打印日志



////路由编写
//
//// index page
////app.get('/', function(req, res){
////  res.render('index1', {
////    title: 'imooc 首页'
////   });
////});
//
//// index page
////app.get('/', function(req, res){
////  res.render('index', {
////    title: 'imooc 首页',
////    movies: [{
////      title: '机械战警',
////      _id: 1,
////      poster: 'http://www.imooc.com/video/1226'
////    },{
////      title: '机械战警',
////      _id: 2,
////      poster: 'http://www.imooc.com/video/1226'
////    },{
////      title: '机械战警',
////      _id: 3,
////      poster: 'http://www.imooc.com/video/1226'
////    },{
////      title: '机械战警',
////      _id: 4,
////      poster: 'http://www.imooc.com/video/1226'
////    },{
////      title: '机械战警',
////      _id: 5,
////      poster: 'http://www.imooc.com/video/1226'
////    }]
////  });
////});
//
//// pre handle user
//app.get(function(req, res, next){
//  var _user = req.session.user;
//
//  if(_user){
//    app.locals.user = _user;
//  }
//
//  return next();
//});
//
//// index page
//app.get('/', function(req, res){
//  //console.log('user in session:');
//  //console.log(req.session.user);
//
//  //var _user = req.session.user;
//  //if(_user){
//  //  app.locals.user = _user;
//  //}
//
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
//});
//
//// signup
//app.post('/user/signup', function(req, res){
//  var _user = req.body.user;
//  //var user = new User(_user);
//
//  User.find({name: _user.name}, function(err, user){
//    if(err){
//      console.log(err);
//    }
//
//    if(user){
//      return res.redirect('/');
//    }
//    else {
//      var user = new User(_user);
//      user.save(function(err, user){
//        if(err){
//          console.log(err);
//        }
//        res.redirect('/admin/userlist');
//      });
//    }
//  });
//
//  //user.save(function(err, user){
//  //  if(err){
//  //    console.log(err);
//  //  }
//
//  // res.redirect('/admin/userlist');
//    //console.log(user);
//  //});
//
//  // /user/signup/:userid
//  // var _userid = req.params.userid
//
//  // /user/signup/11111?userid=11112
//  // var _userid = req.query.userid
//
//  // form submit
//  // var _userid = req.body.userid
//
//  //req.param('user');
//
//  // /user/signup/1111?userid=1112
//  // {userid: 1113}
//
//  // req.param('userid'); //routing-boday-url
//  // 1. 1111
//  // 2. 1113
//  // 3. 1112
//
//  //console.log(_user);
//});
//
//// signin
//app.post('/user/signin', function(req, res){
//  var _user = req.body.user;
//  var name = _user.name;
//  var password = _user.password;
//
//  User.findOne({name: name}, function(err, user){
//    if(err){
//      console.log(err);
//    }
//
//    if(!user){
//      return res.redirect('/');
//    }
//
//    user.comparePassword(password, function(err, isMatch){
//      if(err){
//        console.log(err);
//      }
//
//      if(isMatch){
//        console.log('Password is matched');
//        req.session.user = user;
//        return res.redirect('/');
//      }
//      else{
//        console.log('Password is not matched');
//      }
//    });
//  });
//});
//
//// logout
//app.get('/logout', function(req, res){
//  delete req.session.user;
//  delete app.locals.user;
//  res.redirect('/');
//});
//
//// userlist page
//app.get('/admin/userlist', function(req, res){
//  User.fetch(function(err, users){
//    if(err){
//      console.log(err);
//    }
//
//    res.render('userlist', {
//      title: 'imooc 用户列表页',
//      users: users
//    });
//  });
//});
//
//
//// detail page
////app.get('/movie/id', function(req, res){
////  res.render('detail1', {
////    title: 'imooc 详情页'
////  });
////});
//
//// detail page
////app.get('/movie/:id', function(req, res){
////  res.render('detail', {
////    title: 'imooc 详情页',
////    movie: {
////      doctor: '何塞',
////     country: '美国',
////      title: '机械战警',
////      year: 2014,
////      poster: 'http://www.imooc.com/video/1226',
////      language: '英语',
////      flash: 'http://v.youku.com/v_show/id_XNjYyNzk5MTE2.html?from=y1.3-idx-uhome-1519-20887.205905.3-1.1-8-1-3-0',
////      sumary: 'DotA顶级操作特辑之2009（大酒神结尾献声）.'
////    }
////  });
////});
//
//
//// detail page
//app.get('/movie/:id', function(req, res){
//  var id = req.params.id;
//
//  Movie.findById(id, function(err, movie){
//    res.render('detail', {
//      title: 'imooc' + movie.title,
//      movie: movie
//    });
//  });
//});
//
//// admin page
////app.get('/admin/movie', function(req, res){
////  res.render('admin1', {
////    title: 'imooc 后台录入页'
////  });
////});
//
//// admin page
//app.get('/admin/movie', function(req, res){
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
//});
//
//// admin update movie
//app.get('/admin/update/:id', function(req, res){
//  var id = req.params.id;
//
//  if(id){
//    Movie.findById(id, function(err, movie){
//      res.render('admin', {
//        title: 'imooc 后台更新页',
//        movie: movie
//      });
//    });
//  }
//});
//
//
//// admin post movie
//app.post('/admin/movie/new', function(req, res){
//  var id = req.body.movie._id;
//  var movieObj = req.body.movie;
//  var _movie;
//
//  if(id !== 'undefined'){
//    Movie.findById(id, function(err, movie){
//      if(err){
//        console.log(err);
//      }
//      _movie = _.extend(movie, movieObj);
//      _movie.save(function(err, movie){
//        if(err){
//          console.log(err);
//        }
//
//        res.redirect('/movie/' + movie._id);
//      });
//    });
//  }
//  else{
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
//  }
//});
//
//// list page
////app.get('/admin/list', function(req, res){
////  res.render('list1', {
////    title: 'imooc 列表页'
////  });
////});
//
////list page
////app.get('/admin/list', function(req, res){
////  res.render('list', {
////    title: 'imooc 列表页',
////    movies: [{
////      title: '机械战警',
////      _id: 1,
////      doctor: '何塞',
////      country: '美国',
////      year: 2014,
////      language: '英语',
////      flash: 'http://v.youku.com/v_show/id_XNjYyNzk5MTE2.html?from=y1.3-idx-uhome-1519-20887.205905.3-1.1-8-1-3-0'
////    }]
////  });
////});
//
//// list page
//app.get('/admin/list', function(req, res){
//  Movie.fetch(function(err, movies){
//    if(err){
//      console.log(err);
//    }
//
//    res.render('list', {
//      title: 'imooc 列表页',
//      movies: movies
//    });
//  });
//});
//
//// list delete movie
//app.delete('/admin/list', function(req, res){
//  var id = req.query.id;
//
//  if(id){
//    Movie.remove({_id: id}, function(err, movie){
//      if(err){
//        console.log(err);
//      }
//      else{
//        res.json({success: 1});
//      }
//    });
//  }
//});
