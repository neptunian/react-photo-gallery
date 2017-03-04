var gulp = require('gulp'),
    initGulpTasks = require('react-component-gulp-tasks');

var taskConfig = {

	component: {
		name: 'Gallery',
		dependencies:['react', 'react-dom', 'react-images', 'react-measure', 'jquery', 'lodash']
	},

	example: {
		src: 'examples/src',
		dist: 'examples/dist',
		standalone: true,
		files: [
			'.gitignore',
			'.npmignore',
			'favicon.ico',
			'index.html'
		],
		scripts: [
			'app.js'
		],
		less: [
			'example.less'
		]
	}

};

initGulpTasks(gulp, taskConfig);
