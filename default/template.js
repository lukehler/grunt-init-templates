'use strict';

// Basic template description.
exports.description = 'Creates the build system for a new site, based on a few prompts.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'This template creates an initial build script and assets for creating a new site.';

// Exit and warn if there's already a gruntfile in the directory.
exports.warnOn = 'Gruntfile.js';

// The actual init template.
exports.template = function( grunt, init, done ) {

	init.process( {}, [
		// Prompt for these values.
		init.prompt('name'),
		init.prompt('title'),

	], function(err, props) {

		console.log('name: ' + props.name);
		console.log('title: ' + props.project_title);

		// If you're not doing any preprocessing, just copyAndProcess()
//		init.copyAndProcess(props);

		// If you are doing some preprocessing, then grab the files, loop through them, and process the results.

		// Files to copy (and process).
		var files = init.filesToCopy(props);
		// create an empty files object to hold renamed files
		var preprocessedFiles = {};

		// loop through each key in files
		for( var key in files ) {
			// get the value for later use
			var value = files[key];
 			// filter out .DS_Store files
 			if (
				! key.match( /\.DS_Store$/ )
			) {
				preprocessedFiles[key] = value;
			}
		}
		// Actually copy (and process) files, using the new files object.
		init.copyAndProcess(preprocessedFiles, props);

		// Set up devDependencies to run all the things
		var devDependencies = {
			"grunt": "^1.0.1",
			"grunt-contrib-clean": "^1.0.0",
			"grunt-contrib-concat": "^1.0.0",
			"grunt-contrib-copy": "^1.0.0",
			"grunt-contrib-cssmin": "^1.0.1",
			"grunt-contrib-less": "^1.3.0",
			"grunt-contrib-uglify": "^1.0.1",
			"grunt-contrib-watch": "^1.0.0",
			"grunt-slice-front": "^1.0.3",
			"grunt-postcss": "^0.8.0",
			"js-yaml": "^3.7.0",
			"lodash.template": "^4.4.0",
			"markdown-it": "^8.2.2",
			"markdown-it-container": "^2.0.0",
			"postcss-cssnext": "^2.5.1",
			"postcss-flexboxfixer": "^0.0.4",
			"postcss-gradientfixer": "^0.0.5",
		    "lootstrap": "github:lukehler/lootstrap",
		};
		// And set up dependencies for running it.
		var dependencies = {
			"express": "^4.14.0"
		};


		// Generate package.json file, used by npm and grunt.
		init.writePackageJSON('package.json', {
			name: props.name,
			title: props.title,
			version: '0.1.0',
			'dependencies': dependencies,
			'devDependencies': devDependencies,
			scripts: {
				"start": "node main",
				"make": "grunt prod",
			},
		});

		// All done!
		done();
	});
};
