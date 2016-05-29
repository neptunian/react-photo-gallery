'use strict';

Object.defineProperty(exports, '__esModule', {
				value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

var Gallery = (function (_React$Component) {
				_inherits(Gallery, _React$Component);

				function Gallery() {
								_classCallCheck(this, Gallery);

								_get(Object.getPrototypeOf(Gallery.prototype), 'constructor', this).call(this);
								this.state = {
												currentImage: 0,
												containerWidth: 0
								};
								this.handleResize = this.handleResize.bind(this);
								this.closeLightbox = this.closeLightbox.bind(this);
								this.gotoNext = this.gotoNext.bind(this);
								this.gotoPrevious = this.gotoPrevious.bind(this);
								this.openLightbox = this.openLightbox.bind(this);
				}

				_createClass(Gallery, [{
								key: 'componentDidMount',
								value: function componentDidMount() {
												this.setState({ containerWidth: Math.floor(_reactDom2['default'].findDOMNode(this).clientWidth) });
												window.addEventListener('resize', this.handleResize);
								}
				}, {
								key: 'componentDidUpdate',
								value: function componentDidUpdate() {
												if (_reactDom2['default'].findDOMNode(this).clientWidth !== this.state.containerWidth) {
																this.setState({ containerWidth: Math.floor(_reactDom2['default'].findDOMNode(this).clientWidth) });
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
												this.setState({ containerWidth: Math.floor(_reactDom2['default'].findDOMNode(this).clientWidth) });
								}
				}, {
								key: 'openLightbox',
								value: function openLightbox(index, event) {
												event.preventDefault();
												this.setState({
																currentImage: index,
																lightboxIsOpen: true
												});
								}
				}, {
								key: 'closeLightbox',
								value: function closeLightbox() {
												this.setState({
																currentImage: 0,
																lightboxIsOpen: false
												});
								}
				}, {
								key: 'gotoPrevious',
								value: function gotoPrevious() {
												this.setState({
																currentImage: this.state.currentImage - 1
												});
								}
				}, {
								key: 'gotoNext',
								value: function gotoNext() {
												this.setState({
																currentImage: this.state.currentImage + 1
												});
								}
				}, {
								key: 'render',
								value: function render() {
												var rowLimit = 1,
												    photoPreviewNodes = [];
												if (this.state.containerWidth >= 480) {
																rowLimit = 2;
												}
												if (this.state.containerWidth >= 1024) {
																rowLimit = 3;
												}
												var contWidth = this.state.containerWidth - rowLimit * 4; /* 4px for margin around each image*/
												contWidth = Math.floor(contWidth - 2); // add some padding to prevent layout prob
												var lightboxImages = [];
												for (var i = 0; i < this.props.photos.length; i += rowLimit) {
																var rowItems = [];
																// loop thru each set of rowLimit num
																// eg. if rowLimit is 3 it will  loop thru 0,1,2, then 3,4,5 to perform calculations for the particular set
																var aspectRatio = 0,
																    totalAr = 0,
																    commonHeight = 0;
																for (var j = i; j < i + rowLimit; j++) {
																				if (j == this.props.photos.length) {
																								break;
																				}
																				totalAr += this.props.photos[j].aspectRatio;
																}
																commonHeight = contWidth / totalAr;
																// run thru the same set of items again to give the common height
																for (var k = i; k < i + rowLimit; k++) {
																				if (k == this.props.photos.length) {
																								break;
																				}
																				var src = this.props.photos[k].src;

																				if (this.props.disableLightbox) {
																								photoPreviewNodes.push(_react2['default'].createElement(
																												'div',
																												{ key: k, style: style },
																												_react2['default'].createElement('img', { src: src, style: { display: 'block', border: 0 }, height: commonHeight, width: commonHeight * this.props.photos[k].aspectRatio, alt: '' })
																								));
																				} else {
																								lightboxImages.push(this.props.photos[k].lightboxImage);
																								photoPreviewNodes.push(_react2['default'].createElement(
																												'div',
																												{ key: k, style: style },
																												_react2['default'].createElement(
																																'a',
																																{ href: '#', className: k, onClick: this.openLightbox.bind(this, k) },
																																_react2['default'].createElement('img', { src: src, style: { display: 'block', border: 0 }, height: commonHeight, width: commonHeight * this.props.photos[k].aspectRatio, alt: '' })
																												)
																								));
																				}
																}
												}
												return this.renderGallery(photoPreviewNodes, lightboxImages);
								}
				}, {
								key: 'renderGallery',
								value: function renderGallery(photoPreviewNodes, lightboxImages) {
												if (this.props.disableLightbox) {
																return _react2['default'].createElement(
																				'div',
																				{ id: 'Gallery', className: 'clearfix' },
																				photoPreviewNodes
																);
												} else {
																return _react2['default'].createElement(
																				'div',
																				{ id: 'Gallery', className: 'clearfix' },
																				photoPreviewNodes,
																				_react2['default'].createElement(_reactImages2['default'], {
																								currentImage: this.state.currentImage,
																								images: lightboxImages,
																								isOpen: this.state.lightboxIsOpen,
																								onClose: this.closeLightbox,
																								onClickPrev: this.gotoPrevious,
																								onClickNext: this.gotoNext,
																								width: 1600,
																								showImageCount: this.props.lightboxShowImageCount,
																								backdropClosesModal: this.props.backdropClosesModal
																				})
																);
												}
								}
				}]);

				return Gallery;
})(_react2['default'].Component);

;
Gallery.displayName = 'Gallery';
Gallery.propTypes = {
				photos: function photos(props, propName, componentName) {
								var lightboxImageValidator = _react2['default'].PropTypes.object;
								if (!props.disableLightbox) {
												lightboxImageValidator = _react2['default'].PropTypes.object.isRequired;
								}
								return _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
												src: _react2['default'].PropTypes.string.isRequired,
												width: _react2['default'].PropTypes.number.isRequired,
												height: _react2['default'].PropTypes.number.isRequired,
												aspectRatio: _react2['default'].PropTypes.number.isRequired,
												lightboxImage: lightboxImageValidator
								})).isRequired.apply(this, arguments);
				},
				disableLightbox: _react2['default'].PropTypes.bool
};
Gallery.defaultProps = {
				lightboxShowImageCount: false,
				backdropClosesModal: true,
				disableLightbox: false
};
// Gallery image style
var style = {
				display: 'block',
				margin: 2,
				backgroundColor: '#e3e3e3',
				float: 'left'
};

exports['default'] = Gallery;
module.exports = exports['default'];