module.exports = function(grunt) {
  
    // load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),
    jshint: {
      all: ['Gruntfile.js', 'public/js/main.js']
    }, 
    imagemin: {                            // Task
    //    static: {                          // Target
    //      options: {                       // Target options
    //        optimizationLevel: 3
    //      },
    //      files: {                         // Dictionary of files
    //        'img/dist/img.png': 'img/src/img.png', // 'destination': 'source'
    //        'img/dist/img.jpg': 'img/src/img.jpg',
    //        'img/dist/img.gif': 'img/src/img.gif'
    //      }
    //    },
    //    dynamic: {                         // Another target
    //      files: [{
    //        expand: true,                  // Enable dynamic expansion
    //        cwd: 'img/src',                   // Src matches are relative to this path
    //        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
    //        dest: 'img/dist'                  // Destination path prefix
    //      }]
    //    }
        dist: {
                options: {
                    optimizationLevel: 4,
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: 'public/img/',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: 'img/'
                }]
            }
    },
    clean: {
      options: { force: true }
    },
    requirejs: {
      compile: {
        options: {
          // name: 'main',
          baseUrl: "js",
          mainConfigFile: "public/js/config.js",
          fileExclusionRegExp: /^\.|node_modules|Gruntfile|\.md|package.json/,
          dir: 'public/js/dist',
          modules: [
                    {
                        name: 'main'
                    }
                ]
          // out: '../assets/js/optimized.js'
        }
      }
    },
    csslint: {
      
      lax: {
        options: {
          import: false
        },
        src: ['public/css/**/*.css']
      },
      strict: {
        options: {
          import: 2
        },
        src: ['public/css/**/*.css']
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'public/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'css/',
        ext: '.min.css'
      }
    },
    watch: {
        options: {
            nospawn: true
        },
        stylesheets: {
            files: 'public/css/**/*.css',
            tasks: ['csslint', 'cssmin']
        },
        scripts: {
            files: 'public/js/**/*.js',
            tasks: ['jshint', 'requirejs']
        }
    }
  });
    
    // Execute watch 
    grunt.event.on('watch', function(action, filepath) {
        if (grunt.file.isMatch(grunt.config('watch.stylesheets.files'), filepath)) {
            var cssminSrc = filepath.replace(grunt.config('cssmin.minify.cwd'), '');
            grunt.config('csslint', [filepath]);
            grunt.config('cssmin.minify.src', [cssminSrc]);
        }
 
        if (grunt.file.isMatch(grunt.config('watch.scripts.files'), filepath)) {
            // var requirejsSrc = filepath.replace(grunt.config('requirejs.compile.options.baseUrl'), '../assets/js/');
            grunt.config('jshint.all', [filepath]);
            // grunt.config('requirejs.compile.options.mainConfigFile', [filepath]);
        }
    });

    // extra tasks

    // register task
    grunt.registerTask('default', [
        'clean',
        'jshint',
        'csslint',
        'imagemin'
    ]);
 
};
