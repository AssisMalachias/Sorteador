module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: false,
                    optimization: 2
                },
                files: {
                    'dev/css/main.css': 'src/css/main.less'
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/css/main.css': 'src/css/main.less'
                }
            }
        },

        watch: {
            less: {
                files: ['src/css/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/css/**/*.css'],
                tasks: ['replace:dist']
            }
        },

        replace: {
            dev: {
                options: {
                    usePrefix: false,
                    patterns: [
                        {
                            match: '@@ENEREÇO_DO_JS',
                            replacement: '../src/js/main.js'
                        },
                        {
                            match: '@@ENEREÇO_DO_CSS',
                            replacement: './css/main.css'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                     usePrefix: false,
                    patterns: [
                       
                        {
                            match: '@@ENEREÇO_DO_JS',
                            replacement: '../js/main.min.js'
                        },
                         {
                            match: '@@ENEREÇO_DO_CSS',
                            replacement: '../css/main.css'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                     usePrefix: false,
                    patterns: [
                        {
                            match: '@@ENEREÇO_DO_CSS',
                            replacement: './css/main.min.css'
                        },
                        {
                            match: '@@ENEREÇO_DO_JS',
                            replacement: './js/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },

        clean: ['prebuild'],
        uglify: {
            target: {
                files: {
                    'dist/js/main.min.js':'src/js/main.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dev', ['less:development', 'replace:dev']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean','uglify']);
};
