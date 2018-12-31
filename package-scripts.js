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
				concurrent.nps('build.rollup')
			),
			rollup: 'rollup --config',
		},
    'build:docs': {
			default: series(
				'gitbook build'
			),
		},
	},
};
