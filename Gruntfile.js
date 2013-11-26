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
      all: ['Gruntfile.js', '../assets/js/main.js', '../assets/js/admin.js']
    }, 
    imagemin: {                            // Task
        // static: {                          // Target
        //   options: {                       // Target options
        //     optimizationLevel: 3
        //   },
        //   files: {                         // Dictionary of files
        //     '../assets/img/dist/img.png': '../assets/img/src/img.png', // 'destination': 'source'
        //     '../assets/img/dist/img.jpg': '../assets/img/src/img.jpg',
        //     '../assets/img/dist/img.gif': '../assets/img/src/img.gif'
        //   }
        // },
        // dynamic: {                         // Another target
        //   files: [{
        //     expand: true,                  // Enable dynamic expansion
        //     cwd: '../assets/img/src',                   // Src matches are relative to this path
        //     src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
        //     dest: '../assets/img/dist'                  // Destination path prefix
        //   }]
        // }
        dist: {
                options: {
                    optimizationLevel: 4,
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: '../assets/img/',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '../assets/img/'
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
          baseUrl: "../assets/js",
          mainConfigFile: "../assets/js/config.js",
          fileExclusionRegExp: /^\.|node_modules|Gruntfile|\.md|package.json/,
          dir: '../assets/js/dist',
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
        src: ['../assets/css/**/*.css']
      },
      strict: {
        options: {
          import: 2
        },
        src: ['../assets/css/**/*.css']
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: '../assets/css/',
        src: ['*.css', '!*.min.css'],
        dest: '../assets/css/',
        ext: '.min.css'
      }
    },
    watch: {
        options: {
            nospawn: true
        },
        stylesheets: {
            files: '../assets/css/**/*.css',
            tasks: ['csslint', 'cssmin']
        },
        scripts: {
            files: '../assets/js/**/*.js',
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
