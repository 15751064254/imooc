module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    //connect: {
    //  server: {
    //    options: {
    //      open: true,
    //      port: 8000,
    //      hostname: '*',
    //      base: './app/views/pages'
    //    }
    //  }
    //},

    watch: {
      views: {
        files: ['views/**'],
        tasks: ['jade'],
        options: {
          livereload: true
        }
      },

      js: {
        files: ['public/lib/**/*.js', 'public/js/**/*.js', 'models/**/*.js', 'schemas/**/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },

      styles: {
        files: ['public/**/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true,
          livereload: true
        }
      }
    },

    //jade:{
    //  compile: {
    //    options: {
    //      data: {
    //        debug: true
    //      }
    //    }
    //  },
    //  files:{
    //  }
    //},

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: ['public/bower_components/**/*.js']
      },
      all: [
        'Gruntfile.js',
        'app.js',
        'config/*.js',
        'public/js/**/*.js',
        'public/lib/**/*.js',
        'app/**/*.js',
        'test/**/*.js'
      ]
    },

    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'public/dest/demo/index.css': 'public/less/demo/index.less',
          'public/dest/map/index.css': 'public/less/map/index.less',
          'public/dest/index.css': 'public/less/index.less'
        }
      },
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
        livereload: true,
        //mangle: true,
        comments: 'false'
        //preserveComments: false
      },
      development: {
        files: {
          'public/dest/utils/utils.min.js': [
            'public/lib/utils/**/*.js',
          ],
          'public/dest/map/map.min.js': 'public/js/map/map.js',
          'public/dest/admin.min.js': 'public/js/admin.js',
          'public/dest/detail.min.js': [
            'public/js/detail.js'
          ]
        },
        tasks: ['jshint']
        //files: {
        //  'public/dest/index.min.js': ['public/**/*.js']
        //}
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          watchedExtensions: ['js'],
          //watchedFolders: ['app', 'config'],
          watchedFolders: ['./'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },

    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['test/**/*.js']
    },

    concurrent: {
      tasks: ['nodemon', 'watch', 'less', 'uglify', 'jshint'],
      options: {
        logConcurrentOutput: true
      }
    }
  });

  //require('load-grunt-tasks');
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-mocha-test');
  //grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-nodemon');
  //grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.option('force', true);
  grunt.registerTask('default', ['concurrent']);
  grunt.registerTask('test', ['mochaTest']);

};
