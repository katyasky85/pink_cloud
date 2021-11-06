const { watch } = require("less");

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
       less: {
           style: {
               files: {
                   "css/less.style.css": "less/less.style.less"
               }
           }
        },
           watch: {
               style: {
                   files: ["pink/project/less/**/*.less"],
                   tasks: ["less", "postcss"]
               }
           },
        csso: {
            style: {
                options: {
                    report: "gzip"
                },
                files: {
                    "pink/style.min.css": ["pink/project/less/less.style.css"]
                }
            },
            browsersync: {
                server: {
                    bsfiles: {
                        src: ["pink/*.html", "pink/project/less/*.css"]
                    },
                    options: {
                        server: "pink/"
                    }
                }
            }
        },
        imagemin: {
               images: {
                   options: {
                       optimizationlevel: 3,
                       progressive: true
                   },
                   files: [{
                       expand: true,
                       src: ["pink/image/**/*.{png,jpg,svg}"]
                   }]
                }
            },
            cwebp: {
                images: {
                    options: {
                        q: 90
                    },
                    files: [{
                        expand: true,
                        src: ["pink/image/**/*.{png,jpg}"]
                    }]
                }
            },
            svgstore: {
                options: {
                    includeTitleElement: false
                },
                sprite:{
                    files: {
                        "pink/sprite.svg": ["pink/icone/icon-*.svg"]
                    }
                }
            },
            posthtml: {
                   html: {
                    files: [{
                        expand: true,
                        src: ["pink/project/*.html"],
                        dest: "build"
                    }]
                }
            }
        });
    

    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-imagemin");
    grunt.loadNpmTasks("grunt-cwebp");
    grunt.loadNpmTasks("grunt-svgstore");
    grunt.loadNpmTasks("grunt-juwain-posthtml");
    grunt.loadNpmTasks("grunt-csso");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-browser-sync");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    
    grunt.registerTask('default', ['less','svgstore','posthtml']);
    grunt.registerTask("serve",["browserSync", "watch"]);
    grunt.registerTask("build",[
        "less",
        "postcss",
        "csso",
        "svgstore",
        "posthtml"
    ]);
};
