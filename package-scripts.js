const npsUtils = require('nps-utils');
const path = require('path');
const series = npsUtils.series;
const rimraf = npsUtils.rimraf;
const concurrent = npsUtils.concurrent;

module.exports = {
	scripts: {
		build: {
			description: 'clean dist directory and run all builds',
			default: series(
				rimraf('dist'),
				rimraf('lib'),
				concurrent.nps('build.rollup', 'build.babel')
			),
			rollup: 'rollup --config',
			babel: 'babel src -d lib',
			standalone: series(
				'cp examples/src/standalone.html examples/dist/standalone.html',
				'cp dist/react-photo-gallery.js examples/src/react-photo-gallery.js',
				'cp examples/src/example.css examples/dist/example.css'
			),
		},
		publish: {
			default: series(
				rimraf('examples/dist'),
				'webpack --progress -p',
				'git subtree push --prefix examples/dist origin gh-pages'
			),
		},
	},
};
