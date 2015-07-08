var express = require('express');//加载 express 模块
var bodyParser = require('body-parser');
var path = require('path');//引入path模块
var mongoose = require('mongoose');//引入mongoose模块
var _ = require('underscore');
var Movie = require('./models/movie');
var port = process.env.PORT || 3000;// process 全局变量，获得传入参数
var app = express();//启动 web 服务器

mongoose.connect('mongodb://localhost/imooc');

app.set('views','./views/pages');//设置视图根目录
app.set('view engine','jade');//设置默认模板引擎
//app.use(express.bodyParser); //格式化数据
//app.use(bodyParser.urlencoded({ extended: false }));//TypeError: Cannot read property '_id' of undefined
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); //dirname当前目录
app.locals.moment = require('moment');
app.listen(port);//监听端口

console.log('imooc startd on port '+ port);//打印日志

//路由编写

// index page
//app.get('/', function(req, res){
//  res.render('index1', {
//    title: 'imooc 首页'
//   });
//});

// index page
//app.get('/', function(req, res){
//  res.render('index', {
//    title: 'imooc 首页',
//    movies: [{
//      title: '机械战警',
//      _id: 1,
//      poster: 'http://www.imooc.com/video/1226'
//    },{
//      title: '机械战警',
//      _id: 2,
//      poster: 'http://www.imooc.com/video/1226'
//    },{
//      title: '机械战警',
//      _id: 3,
//      poster: 'http://www.imooc.com/video/1226'
//    },{
//      title: '机械战警',
//      _id: 4,
//      poster: 'http://www.imooc.com/video/1226'
//    },{
//      title: '机械战警',
//      _id: 5,
//      poster: 'http://www.imooc.com/video/1226'
//    }]
//  });
//});

// index page
app.get('/', function(req, res){ 
  Movie.fetch(function(err, movies){
    if(err){
      console.log(err);
    }

    res.render('index', {
      title: 'imooc 首页',
      movies: movies
    });
  });
});


// detail page
//app.get('/movie/id', function(req, res){
//  res.render('detail1', {
//    title: 'imooc 详情页'
//  });
//});

// detail page
//app.get('/movie/:id', function(req, res){
//  res.render('detail', {
//    title: 'imooc 详情页',
//    movie: {
//      doctor: '何塞',
//     country: '美国',
//      title: '机械战警',
//      year: 2014,
//      poster: 'http://www.imooc.com/video/1226',
//      language: '英语',
//      flash: 'http://v.youku.com/v_show/id_XNjYyNzk5MTE2.html?from=y1.3-idx-uhome-1519-20887.205905.3-1.1-8-1-3-0',
//      sumary: 'DotA顶级操作特辑之2009（大酒神结尾献声）.'
//    }
//  });
//});


// detail page
app.get('/movie/:id', function(req, res){
  var id = req.params.id;
  
  Movie.findById(id, function(err, movie){
    res.render('detail', {
      title: 'imooc' + movie.title,
      movie: movie
    });
  });
});

// admin page
//app.get('/admin/movie', function(req, res){
//  res.render('admin1', {
//    title: 'imooc 后台录入页'
//  });
//});

// admin page
app.get('/admin/movie', function(req, res){
  res.render('admin', {
    title: 'imooc 后台录入页',
    movie: {
      title: '',
      doctor: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  });
});

// admin update movie
app.get('/admin/update/:id', function(req, res){
  var id = req.params.id;

  if(id){
    Movie.findById(id, function(err, movie){
      res.render('admin', {
        title: 'imooc 后台更新页',
        movie: movie
      });
    });
  }
});


// admin post movie
app.post('/admin/movie/new', function(req, res){
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;

  if(id !== 'undefined'){
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
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    });
    _movie.save(function(err, movie){
      if(err){
        console.log(err);
      }

      res.redirect('/movie/' + movie._id);
    });
  }
});

// list page
//app.get('/admin/list', function(req, res){
//  res.render('list1', {
//    title: 'imooc 列表页'
//  });
//});

//list page
//app.get('/admin/list', function(req, res){
//  res.render('list', {
//    title: 'imooc 列表页',
//    movies: [{
//      title: '机械战警',
//      _id: 1,
//      doctor: '何塞',
//      country: '美国',
//      year: 2014,
//      language: '英语',
//      flash: 'http://v.youku.com/v_show/id_XNjYyNzk5MTE2.html?from=y1.3-idx-uhome-1519-20887.205905.3-1.1-8-1-3-0'
//    }]
//  });
//});

// list page
app.get('/admin/list', function(req, res){
  Movie.fetch(function(err, movies){
    if(err){
      console.log(err);
    }

    res.render('list', {
      title: 'imooc 列表页',
      movies: movies
    });
  });
});

// list delete movie
app.delete('/admin/list', function(req, res){
  var id = req.query.id;

  if(id){
    Movie.remove({_id: id}, function(err, movie){
      if(err){
        console.log(err);
      }else{
        res.json({success: 1});
      }
    });
  }
});
