module.exports = function(grunt) {
    grunt.loadNpmTask("grunt-contrib-less");

    grunt.initConfig({
       less: {
           style: {
               files: {
                   "css/css-style.css.css": "less/less.style.less"
               }
           }
       } 
    });
};