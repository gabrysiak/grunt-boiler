module.exports = function(grunt) {
    pkg: grunt.file.readJSON('package.json'),

    grunt.initConfig({
        "jsbeautifier": {
            files: ["src/**/*.css", "src/**/*.js", "Gruntfile.js"],
            options: {}
        },
        jshint: {
            all: ['Gruntfile.js', 'src/js/main.js']
        },
        //  imagemin: {                            // Task
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
        //    dist: {
        //            options: {
        //                optimizationLevel: 4,
        //                progressive: true
        //            },
        //            files: [{
        //                expand: true,
        //                cwd: 'public/img/',
        //                src: '{,*/}*.{png,jpg,jpeg}',
        //                dest: 'img/'
        //            }]
        //        }
        //},
        clean: {
            options: {
                force: true
            }
        },
        autoprefixer: {
            options: {
                // Task-specific options go here.
            },
            // prefix all files
            //single_file: {
            //options: {
            //},
            //src: 'src/css/styles.min.css',
            //    dest: 'dist/css/styles.css'
            //},
            dist: {
                files: {
                    'dist/css/styles.min.css': 'dist/css/styles.min.css'
                }
            }
            //multiple_files: {
            //    expand: true,
            //    flatten: true,
            //    src: 'src/css/**/*.css', // -> src/css/file1.css, src/css/file2.css
            //	dest: 'dist/css/' // -> dest/css/file1.css, dest/css/file2.css
            // }
        },
        csslint: {

            lax: {
                options: {
                    import: false
                },
                src: ['src/css/**/*.css']
            },
            strict: {
                options: {
                    import: 2
                },
                src: ['src/css/**/*.css']
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'src/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/css/',
                ext: '.min.css'
            }
        },
        watch: {
            options: {
                nospawn: true
            },
            stylesheets: {
                files: 'src/css/**/*.css',
                tasks: ['jsbeautifier', 'csslint', 'cssmin', 'autoprefixer']
            },
            scripts: {
                files: 'src/js/**/*.js',
                tasks: ['jshint', 'jsbeautifier']
            }
        }
    });

    // load tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //  grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Execute watch 
    //grunt.event.on('watch', function(action, filepath) {
    //    if (grunt.file.isMatch(grunt.config('watch.stylesheets.files'), filepath)) {
    //        var cssminSrc = filepath.replace(grunt.config('cssmin.minify.cwd'), '');
    //        var prefixerDest = filepath.replace(grunt.config('cssmin.minify.dest'), '');
    //	    grunt.config('autoprefixer', [prefixerDest]);
    //        grunt.config('jsbeautifier', [filepath]);
    //          grunt.config('csslint', [filepath]);
    //       grunt.config('cssmin.minify.src', [cssminSrc]);
    // }

    //  if (grunt.file.isMatch(grunt.config('watch.scripts.files'), filepath)) {
    //      grunt.config('jsbeautifier', [filepath]);
    //      grunt.config('jshint.all', [filepath]);
    //  }
    // });

    // extra tasks

    // register task
    grunt.registerTask('default', [
        'clean',
        'concat',
        'jsbeautifier',
        'autoprefixer',
        'jshint',
        'csslint',
        'watch'
        //'imagemin'
    ]);

};
