module.exports = function(grunt) {
	var config = {
		package : grunt.file.readJSON( 'package.json' ),

		concat : {
		    options : {
				separator : ';'
		    },
		    site : {
				src : [
					'src/base.js',
					'src/setup.js',
					'src/utils.js',
					'src/factory.js',
					'src/component-wrapper.js'
				],
				dest : 'dest/module.js',
		    },
  		},

  		jshint: {
			options: {
				jshintrc : true
			},
    		beforeconcat : '<%= concat.site.src %>'
  		},

  		uglify : {
			site : {
				files : {
					'dest/module.min.js' : '<%= concat.site.dest %>'
				}
			}
    	},    	

		watch: {
		    script : {
		    	files : '<%= concat.site.src %>',
		    	tasks : ['jshint', 'concat']
		    }
  		}
	};

	grunt.initConfig( config );

	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );

	grunt.registerTask( 'js', ['jshint', 'concat'] );
	grunt.registerTask( 'jsmin', ['jshint', 'concat', 'uglify'] );
};