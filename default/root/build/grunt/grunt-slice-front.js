module.exports = function(grunt) {

	// get our config object
	var paths = grunt.config.get('paths');
	var pkg = grunt.config.get('pkg');

	// CONFIGURATION
	grunt.config.set(
		'slice_front',
		{
			options: {
				markdownItOptions: {
					html: true,
					linkify: true
				},
				templateParams: {
					siteTitle: pkg.title,
					'paths': { url: paths.url }, // make paths.url available to the template
				},
				templateFile: paths.src + '/templates/template.tmpl',
			},
			contents: {
				files: [
					{
						expand: true,
						cwd: paths.src + '/content/',
						src: [
							'*.md',
							'**/*.md',
						],
						dest: paths.dest + '/',
						ext: '.html',
					},
				],
			},
		}
	);

	grunt.loadNpmTasks('grunt-slice-front');

};
