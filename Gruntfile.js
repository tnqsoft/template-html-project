module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sourceDir: 'src',
        buildDir: 'dist',
        vendorDir: 'vendor',
        tmpDir: 'tmp',

        banner: [
            '/**',
            ' * HTML Design v<%= pkg.version %> (<%= pkg.homepage %>)',
            ' *',
            ' * @author      <%= pkg.author.name %>',
            ' * @copyright   (c) 2016 <%= pkg.author.name %>',
            ' * @license     MIT',
            ' * @build       ' + Date().toString(),
            ' */\n\n'
        ].join('\n'),

        clean: ['<%= buildDir %>/*'],

        copy: {
            main: {
                files: [{
                    dest: '<%= buildDir %>',
                    src: ['img/**', 'js/*', 'fonts/*'],
                    cwd: '<%= sourceDir %>/',
                    expand: true,
                    //flatten: true,
                    filter: 'isFile'
                }, {
                    dest: '<%= buildDir %>/vendor/bootstrap',
                    src: ['css/*.min.*', 'js/*.min.*', 'fonts/*'],
                    cwd: '<%= vendorDir %>/bootstrap/dist/',
                    expand: true,
                    //flatten: true,
                    filter: 'isFile'
                }, {
                    dest: '<%= buildDir %>/vendor/font-awesome/',
                    src: ['css/*.min.*', 'fonts/*'],
                    cwd: '<%= vendorDir %>/font-awesome/',
                    expand: true,
                    //flatten: true,
                    filter: 'isFile'
                }, {
                    dest: '<%= buildDir %>/vendor/',
                    src: 'html5shiv.min.js',
                    expand: true,
                    cwd: '<%= vendorDir %>/html5shiv/dist/'
                }, {
                    dest: '<%= buildDir %>/vendor/',
                    src: 'respondmore.min.js',
                    expand: true,
                    cwd: '<%= vendorDir %>/respondmore/'
                }, {
                    dest: '<%= buildDir %>/vendor/',
                    src: 'jquery.min.js',
                    expand: true,
                    cwd: '<%= vendorDir %>/jquery/dist/'
                }, {
                    dest: '<%= buildDir %>/vendor/',
                    src: 'moment-with-locales.min.js',
                    expand: true,
                    cwd: '<%= vendorDir %>/moment/min/'
                }, {
                    dest: '<%= buildDir %>/vendor/swiper',
                    src: ['css/*.min.*', 'js/*.min.*'],
                    cwd: '<%= vendorDir %>/Swiper/dist/',
                    expand: true,
                    //flatten: true,
                    filter: 'isFile'
                }, {
                    dest: '<%= buildDir %>/vendor/mCustomScrollbar',
                    src: ['*.min.*', 'mCSB_buttons.png'],
                    cwd: '<%= vendorDir %>/malihu-custom-scrollbar-plugin/',
                    expand: true,
                    //flatten: true,
                    filter: 'isFile'
                }]
            }
            // html_files: {
            //     dest: '<%= buildDir %>',
            //     src: '*.html',
            //     expand: true,
            //     cwd: '<%= tmpDir %>',
            //     options: {
            //         process: function (content, srcpath) {
            //             return grunt.template.process(content);
            //         }
            //     }
            // }
        },

        less: {
            development: {
                options: {
                    //banner: '<%= banner %>',
                    paths: ['<%= sourceDir %>/less']
                },
                files: {
                    '<%= buildDir %>/css/style.css': '<%= sourceDir %>/less/style.less'
                }
            }
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: '<%= buildDir %>/css/',
                src: ['*.css'],
                dest: '<%= buildDir %>/css/',
                ext: '.min.css'
            },
            add_banner: {
                options: {
                    //banner: '<%= banner %>'
                },
                files: {
                    '<%= buildDir %>/css/style.min.css': ['<%= buildDir %>/css/style.css']
                }
            }
        },

        uglify: {
            options: {
                //banner: '<%= banner %>'
            },
            build: {
                src: ['<%= buildDir %>/js/script.js'],
                dest: '<%= buildDir %>/js/script.min.js'
            }
        },

        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: ['<%= buildDir %>/css/*.css', '<%= buildDir %>/js/*.js']
                }
            }
        },

        bake: {
            build: {
                options: {
                    process: function (content, srcpath) {
                        return grunt.template.process(content);
                    }
                },
                files: {
                    "<%= buildDir %>/test-color.html": "<%= sourceDir %>/test-color.html",
                    "<%= buildDir %>/home-page.html": "<%= sourceDir %>/home-page.html"
                }
            }
        },

        watch: {
            all: {
                files: ['<%= sourceDir %>/*.html', '<%= sourceDir %>/includes/*.html', '<%= sourceDir %>/js/*.js', '<%= sourceDir %>/less/*.less', '<%= sourceDir %>/img/*', '<%= sourceDir %>/fonts/*'],
                tasks: ['build', 'timestamp']
            }
        }
    });

    grunt.registerTask('default', 'build');
    grunt.registerTask('build', ['clean', 'bake:build', 'copy', 'less', 'cssmin', 'uglify', 'usebanner']);

    grunt.registerTask('timestamp', function () {
        grunt.log.subhead(Date());
    });

    grunt.loadNpmTasks('grunt-bake');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
