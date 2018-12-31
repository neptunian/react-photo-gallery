import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

const name = 'Gallery';
const path = 'dist/react-photo-gallery';
const globals = {
	'prop-types': 'PropTypes',
	'react-dom': 'ReactDOM',
	'react': 'React',
  'resize-observer-polyfill': 'ResizeObserver'
};
const external = Object.keys(globals);
const babelOptions = (production) => {
	let result = {
		babelrc: false,
		presets: [['@babel/preset-env', { modules: false  }], '@babel/preset-react'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
    ],
	};
	if (production) {
		result.plugins.push('transform-react-remove-prop-types');
	};
	return result;
};

export default [
	{
		input: 'src/Gallery.js',
		output: {
			file: path + '.esm.js',
			format: 'es',
		},
		external: external,
		plugins: [babel(babelOptions(false))],
	},
	{
		input: 'src/Gallery.js',
		output: {
			name: name,
			file: path + '.umd.js',
			format: 'umd',
		},
		globals: globals,
		external: external,
		plugins: [babel(babelOptions(false)), resolve()],
	},
	{
		input: 'src/Gallery.js',
		output: {
			name: name,
			file: path + '.umd.min.js',
			format: 'umd',
		},
		globals: globals,
		external: external,
		plugins: [babel(babelOptions(true)), resolve(), uglify({}, minify)],
	},
];
