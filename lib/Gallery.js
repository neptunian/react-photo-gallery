'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var Gallery = (function (_React$Component) {
	_inherits(Gallery, _React$Component);

	function Gallery() {
		_classCallCheck(this, Gallery);

		_get(Object.getPrototypeOf(Gallery.prototype), 'constructor', this).call(this);
		this.state = {
			containerWidth: 0
		};
		this.handleResize = this.handleResize.bind(this);
	}

	_createClass(Gallery, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) });
			window.addEventListener('resize', this.handleResize);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			if (this._gallery.clientWidth !== this.state.containerWidth) {
				this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) });
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			window.removeEventListener('resize', this.handleResize, false);
		}
	}, {
		key: 'handleResize',
		value: function handleResize(e) {
			this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) });
		}
	}, {
		key: 'aspectRatio',
		value: function aspectRatio(_ref) {
			var width = _ref.width;
			var height = _ref.height;

			return width / height;
		}
	}, {
		key: 'scalePhotoDimensions',
		value: function scalePhotoDimensions() {
			var _this = this;

			var _props = this.props;
			var cols = _props.cols;
			var margin = _props.margin;
			var photos = _props.photos;

			// subtract 1 pixel because the browser may round up a pixel
			var containerWidth = this.state.containerWidth - 1;

			// divide photos in rows based on cols per row [[1,2,3],[4,5,6],[7,8]]]
			var rows = photos.reduce(function (acc, item, idx) {
				var rowNum = Math.floor(idx / cols);
				acc[rowNum] = acc[rowNum] ? [].concat(_toConsumableArray(acc[rowNum]), [item]) : [item];
				return acc;
			}, []);

			// scale the image dimensions
			rows = rows.map(function (row) {
				var totalAspectRatio = row.reduce(function (acc, photo, idx) {
					return acc + _this.aspectRatio(photo);
				}, 0);
				// calculate the width differently if its the last row and there are fewer photos left than col num
				var rowWidth = row.length < cols ? Math.floor(containerWidth / cols * row.length - row.length * (margin * 2)) : Math.floor(containerWidth - row.length * (margin * 2));
				var rowHeight = rowWidth / totalAspectRatio;
				return row.map(function (photo) {
					return _extends({}, photo, {
						width: rowHeight * _this.aspectRatio(photo),
						height: rowHeight
					});
				});
			});

			// flatten back the photos array
			return rows.reduce(function (acc, row) {
				return [].concat(_toConsumableArray(acc), _toConsumableArray(row));
			}, []);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var resizedPhotos = this.scalePhotoDimensions();
			style.margin = this.props.margin;
			return _react2['default'].createElement(
				'div',
				{ id: 'Gallery', className: 'clearfix', ref: function (c) {
						return _this2._gallery = c;
					} },
				resizedPhotos.map(function (photo, idx) {
					return _react2['default'].createElement(
						'div',
						{ style: style, key: idx },
						_react2['default'].createElement(
							'a',
							{ href: '#', onClick: function (e) {
									return _this2.props.onClickPhoto(idx, e);
								} },
							_react2['default'].createElement('img', { src: photo.src, srcSet: photo.srcset.join(), sizes: photo.sizes.join(), style: { display: 'block', border: 0 }, height: photo.height, width: photo.width, alt: photo.alt })
						)
					);
				})
			);
		}
	}]);

	return Gallery;
})(_react2['default'].Component);

;
Gallery.displayName = 'Gallery';
Gallery.propTypes = {
	photos: function photos(props, propName, componentName) {
		return _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
			src: _propTypes2['default'].string.isRequired,
			width: _propTypes2['default'].number.isRequired,
			height: _propTypes2['default'].number.isRequired,
			alt: _propTypes2['default'].string,
			srcset: _propTypes2['default'].array,
			sizes: _propTypes2['default'].array
		})).isRequired.apply(this, arguments);
	},
	onClickPhoto: _propTypes2['default'].func,
	cols: _propTypes2['default'].number,
	margin: _propTypes2['default'].number
};
Gallery.defaultProps = {
	cols: 3,
	onClickPhoto: function onClickPhoto(k, e) {
		e.preventDefault();
	},
	margin: 2
};
// Gallery image style
var style = {
	display: 'block',
	backgroundColor: '#e3e3e3',
	float: 'left'
};

exports['default'] = Gallery;
module.exports = exports['default'];