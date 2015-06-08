module.exports = function(grunt) {

  "use strict";

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.initConfig({

    assemble: {
       
      options: {
          collections: [{
          name: 'post',
          sortby: 'posted',
          sortorder: 'descending'
        }],
        helpers: './app/js/helpers/helpers.js',
        layout: 'page.hbs',
        layoutdir: './src/templates/layouts/',
        partials: './src/templates/partials/**/*.hbs'
      },

      posts: {
        files: [{
          cwd: './src/content/',
          dest: './_build/',
          expand: true,
          src: ['posts/*.hbs', '!_pages/**/*.hbs']
        }, {
          cwd: './src/content/_pages/',
          dest: './_build/',
          expand: true,
          src: '**/*.hbs'
        }]
      }
    },

    sass: {

      dev: {
        options: {
          style: "compressed",
          sourcemap : "auto"
        },

        files : {
          "_build/css/app.min.css": "app/scss/main.scss"
        }
      }
    },

    uglify: {

      dev: {
        options: {
          compress: true,
          mangle: true,
          preserveComments: false
        },

        files: {
          "_build/js/app.min.js" : ["app/js/libs/jquery-1.11.2.min.js", 
                                   "app/js/app/app.js",
                                   "app/js/helpers/helpers.js"]
        }
      }
    },

    connect: {

      server : {
        options: {
          open: true,
          base: './_build/'
        }
      }
    },

    watch: {

      js: {
        files: ["app/js/**/*.js"],
        tasks: ["uglify:dev"],
        options: {
    			livereload: true,
    		}
    },

    scss: {
      files: ["app/scss/**/*.scss"],
      tasks: ["sass:dev"],
      options: {
  			livereload: true,
    		}
      }
    }
  });

  grunt.registerTask("make", ["assemble", "sass:dev", "uglify:dev", "connect:server", "watch"]);
};