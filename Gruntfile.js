module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sourceDir: 'src',
        buildDir: 'dist',
        vendorDir: 'vendor',

        banner: [
            '/**',
            ' * HTML Design v<%= pkg.version %> (<%= pkg.homepage %>)',
            ' *',
            ' * @author      <%= pkg.author.name %>',
            ' * @copyright   (c) 2016 <%= pkg.author.name %>',
            ' * @license     MIT',
            ' */\n\n'
        ].join('\n'),

        clean: ['<%= buildDir %>/*'],

        copy: {
            main: {
                files: [{
                    dest: '<%= buildDir %>',
                    src: ['img/*', 'js/*', 'fonts/*'],
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
                    src: 'jquery.min.js',
                    expand: true,
                    cwd: '<%= vendorDir %>/jquery/dist/'
                }, {
                    dest: '<%= buildDir %>/vendor/',
                    src: 'moment-with-locales.min.js',
                    expand: true,
                    cwd: '<%= vendorDir %>/moment/min/'
                }, {
                    dest: '<%= buildDir %>',
                    src: '*.html',
                    expand: true,
                    cwd: '<%= sourceDir %>'
                }]
            }
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
        }
    });

    grunt.registerTask('default', 'build');
    grunt.registerTask('build', ['clean', 'copy', 'less', 'cssmin', 'uglify', 'usebanner']);

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-banner');
};
