# imooc
    We recommend every repository include a README, LICENSE, and .gitignore.
    …or create a new repository on the command line

## Git

    echo # imooc >> README.md
    git init
    git add README.md
    git commit -m "first commit"
    git remote add origin https://github.com/15751064254/imooc.git
    git push -u origin master
    …or push an existing repository from the command line

    git remote add origin https://github.com/15751064254/imooc.git
    git push -u origin master
    …or import code from another repository
    
    You can initialize this repository with code from a Subversion, Mercurial, or TFS project.
    Import code


    git push origin master

## grunt test

    grunt test

## npm install

    npm install async bcrypt connect-mongo crypto express grunt grunt-concurrent grunt-contrib-jshint grunt-contrib-less grunt-contrib-uglify grunt-contrib-watch grunt-mocha-test grunt-nodemon jade moment mongoose underscore body-parser cookie-parser express-session morgan connect-multiparty mocha should serve-static --save --save-dev

## start

    npm install
    npm rebuild
    grunt

## nodejs模块bcrypt失败

    npm cache verify --force
    npm install -g node-gyp
    node-gyp --python /path/to/python2.7
    npm install bcrypt

    
    启动mongodb数据库
    cd /opt/mongodb
    ./bin/mongod -config conf/mongod.conf

    post
    http://192.168.200.215:3000/user/signup
    http://192.168.200.215:3000/user/signin
    http://192.168.200.215:3000/movie/
    http://192.168.200.215:3000/admin/movie/update/
    http://192.168.200.215:3000/admin/movie/list
    http://192.168.200.215:3000/user/comment
    http://192.168.200.215:3000/admin/category



    get
    http://192.168.200.215:3000/
    http://192.168.200.215:3000/signin
    http://192.168.200.215:3000/signup
    http://192.168.200.215:3000/logout
    http://192.168.200.215:3000/admin/user/list
    http://192.168.200.215:3000/admin/movie/new
    http://192.168.200.215:3000/admin/movie/list
    http://192.168.200.215:3000/admin/category/new
    http://192.168.200.215:3000/admin/category/list
    http://192.168.200.215:3000/results

## yarn Install

    yarn add async  bcrypt  body-parser  connect-mongo  connect-multiparty  cookie-parser  crypto  express  express-session  grunt  grunt-concurrent  grunt-contrib-clean  grunt-contrib-copy  grunt-contrib-jshint  grunt-contrib-less  grunt-contrib-uglify  grunt-contrib-watch  grunt-mocha-test  grunt-nodemon  jade  jshint-stylish  load-grunt-tasks  mocha  moment  mongoose  morgan  serve-static  should  time-grunt  underscore --save