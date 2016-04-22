require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"react-photo-gallery":[function(require,module,exports){
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

},{"react":undefined,"react-dom":undefined,"react-images":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL29jdGF2aWEvZGV2L3JlYWN0LXBob3RvLWdhbGxlcnkvc3JjL0dhbGxlcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ0FrQixPQUFPOzs7O3dCQUNKLFdBQVc7Ozs7MkJBQ1gsY0FBYzs7OztJQUU3QixPQUFPO2NBQVAsT0FBTzs7QUFDRSxhQURULE9BQU8sR0FDSTs4QkFEWCxPQUFPOztBQUVaLG1DQUZLLE9BQU8sNkNBRUo7QUFDUixZQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1Qsd0JBQVksRUFBRSxDQUFDO0FBQ2YsMEJBQWMsRUFBRSxDQUFDO1NBQ3BCLENBQUM7QUFDRixZQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pELFlBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkQsWUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QyxZQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pELFlBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDN0M7O2lCQVpDLE9BQU87O2VBYVEsNkJBQUU7QUFDdEIsZ0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBUyxXQUFXLENBQUMsSUFBSSxDQUFDLENB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QyxDQUFDO0FBQ0YsT0FBTyxDQUFDLFlBQVksR0FBRztBQUNuQiwwQkFBc0IsRUFBRSxLQUFLO0FBQzdCLHVCQUFtQixFQUFFLElBQUk7QUFDekIsbUJBQWUsRUFBRSxLQUFLO0NBQ3pCLENBQUE7O0FBRUQsSUFBTSxLQUFLLEdBQUc7QUFDWCxXQUFPLEVBQUUsT0FBTztBQUNoQixVQUFNLEVBQUUsQ0FBQztBQUNULG1CQUFlLEVBQUMsU0FBUztBQUN6QixTQUFLLEVBQUUsTUFBTTtDQUNmLENBQUE7O3FCQUVjLE9BQU8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IExpZ2h0Ym94IGZyb20gJ3JlYWN0LWltYWdlcyc7XG5cbmNsYXNzIEdhbGxlcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG4gICAgY29uc3RydWN0b3IoKXtcblx0c3VwZXIoKTtcblx0dGhpcy5zdGF0ZSA9IHtcblx0ICAgIGN1cnJlbnRJbWFnZTogMCxcblx0ICAgIGNvbnRhaW5lcldpZHRoOiAwXG5cdH07XG5cdHRoaXMuaGFuZGxlUmVzaXplID0gdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKTtcblx0dGhpcy5jbG9zZUxpZ2h0Ym94ID0gdGhpcy5jbG9zZUxpZ2h0Ym94LmJpbmQodGhpcyk7XG5cdHRoaXMuZ290b05leHQgPSB0aGlzLmdvdG9OZXh0LmJpbmQodGhpcyk7XG5cdHRoaXMuZ290b1ByZXZpb3VzID0gdGhpcy5nb3RvUHJldmlvdXMuYmluZCh0aGlzKTtcblx0dGhpcy5vcGVuTGlnaHRib3ggPSB0aGlzLm9wZW5MaWdodGJveC5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuXHR0aGlzLnNldFN0YXRlKHtjb250YWluZXJXaWR0aDogTWF0aC5mbG9vcihSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5jbGllbnRXaWR0aCl9KVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIH1cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKXtcblx0aWYgKFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLmNsaWVudFdpZHRoICE9PSB0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoKXtcblx0ICAgIHRoaXMuc2V0U3RhdGUoe2NvbnRhaW5lcldpZHRoOiBNYXRoLmZsb29yKFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLmNsaWVudFdpZHRoKX0pO1xuXHR9XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG5cdCB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUsIGZhbHNlKTtcbiAgICB9XG4gICAgaGFuZGxlUmVzaXplKGUpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb250YWluZXJXaWR0aDogTWF0aC5mbG9vcihSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5jbGllbnRXaWR0aCl9KTtcbiAgICB9XG4gICAgb3BlbkxpZ2h0Ym94KGluZGV4LCBldmVudCl7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuXHQgICAgY3VycmVudEltYWdlOiBpbmRleCxcbiAgICAgICAgICAgIGxpZ2h0Ym94SXNPcGVuOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjbG9zZUxpZ2h0Ym94KCl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuXHQgICAgY3VycmVudEltYWdlOiAwLFxuICAgICAgICAgICAgbGlnaHRib3hJc09wZW46IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ290b1ByZXZpb3VzKCl7XG5cdHRoaXMuc2V0U3RhdGUoe1xuXHQgICAgY3VycmVudEltYWdlOiB0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSAtIDEsXG5cdH0pO1xuICAgIH1cbiAgICBnb3RvTmV4dCgpe1xuXHR0aGlzLnNldFN0YXRlKHtcblx0ICAgIGN1cnJlbnRJbWFnZTogdGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2UgKyAxLFxuXHR9KTtcbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciByb3dMaW1pdCA9IDEsXG4gICAgICAgICAgICBwaG90b1ByZXZpZXdOb2RlcyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb250YWluZXJXaWR0aCA+PSA0ODApe1xuICAgICAgICAgICAgcm93TGltaXQgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoID49IDEwMjQpe1xuICAgICAgICAgICAgcm93TGltaXQgPSAzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb250V2lkdGggPSB0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoIC0gKHJvd0xpbWl0ICogNCk7IC8qIDRweCBmb3IgbWFyZ2luIGFyb3VuZCBlYWNoIGltYWdlKi9cbiAgICAgICAgY29udFdpZHRoID0gTWF0aC5mbG9vcihjb250V2lkdGggLSAyKTsgLy8gYWRkIHNvbWUgcGFkZGluZyB0byBwcmV2ZW50IGxheW91dCBwcm9iXG5cdHZhciBsaWdodGJveEltYWdlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpPTA7aTx0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGg7aSs9cm93TGltaXQpe1xuICAgICAgICAgICAgdmFyIHJvd0l0ZW1zID0gW107XG4gICAgICAgICAgICAvLyBsb29wIHRocnUgZWFjaCBzZXQgb2Ygcm93TGltaXQgbnVtXG4gICAgICAgICAgICAvLyBlZy4gaWYgcm93TGltaXQgaXMgMyBpdCB3aWxsICBsb29wIHRocnUgMCwxLDIsIHRoZW4gMyw0LDUgdG8gcGVyZm9ybSBjYWxjdWxhdGlvbnMgZm9yIHRoZSBwYXJ0aWN1bGFyIHNldFxuICAgICAgICAgICAgdmFyIGFzcGVjdFJhdGlvPTAsXG4gICAgICAgICAgICAgICAgdG90YWxBcj0wLFxuICAgICAgICAgICAgICAgIGNvbW1vbkhlaWdodCA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBqPWk7IGo8aStyb3dMaW1pdDsgaisrKXtcbiAgICAgICAgICAgICAgICBpZiAoaiA9PSB0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cdFx0dG90YWxBciArPSB0aGlzLnByb3BzLnBob3Rvc1tqXS5hc3BlY3RSYXRpbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbW1vbkhlaWdodCA9IGNvbnRXaWR0aCAvIHRvdGFsQXI7XG4gICAgICAgICAgICAvLyBydW4gdGhydSB0aGUgc2FtZSBzZXQgb2YgaXRlbXMgYWdhaW4gdG8gZ2l2ZSB0aGUgY29tbW9uIGhlaWdodFxuICAgICAgICAgICAgZm9yICh2YXIgaz1pOyBrPGkrcm93TGltaXQ7IGsrKyl7XG4gICAgICAgICAgICAgICAgaWYgKGsgPT0gdGhpcy5wcm9wcy5waG90b3MubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXHRcdHZhciBzcmMgPSB0aGlzLnByb3BzLnBob3Rvc1trXS5zcmM7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlTGlnaHRib3gpe1xuXHRcdCAgICBwaG90b1ByZXZpZXdOb2Rlcy5wdXNoKFxuXHRcdFx0IDxkaXYga2V5PXtrfSBzdHlsZT17c3R5bGV9PlxuXHRcdFx0ICAgIDxpbWcgc3JjPXtzcmN9IHN0eWxlPXt7ZGlzcGxheTonYmxvY2snLCBib3JkZXI6MH19IGhlaWdodD17Y29tbW9uSGVpZ2h0fSB3aWR0aD17Y29tbW9uSGVpZ2h0ICogdGhpcy5wcm9wcy5waG90b3Nba10uYXNwZWN0UmF0aW99IGFsdD1cIlwiIC8+XG5cdFx0XHQgPC9kaXY+XG5cdFx0ICAgICk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0ICAgIGxpZ2h0Ym94SW1hZ2VzLnB1c2godGhpcy5wcm9wcy5waG90b3Nba10ubGlnaHRib3hJbWFnZSk7XG5cdFx0ICAgIHBob3RvUHJldmlld05vZGVzLnB1c2goXG5cdFx0XHQgPGRpdiBrZXk9e2t9IHN0eWxlPXtzdHlsZX0+XG5cdFx0XHQgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9e2t9IG9uQ2xpY2s9e3RoaXMub3BlbkxpZ2h0Ym94LmJpbmQodGhpcywgayl9PjxpbWcgc3JjPXtzcmN9IHN0eWxlPXt7ZGlzcGxheTonYmxvY2snLCBib3JkZXI6MH19IGhlaWdodD17Y29tbW9uSGVpZ2h0fSB3aWR0aD17Y29tbW9uSGVpZ2h0ICogdGhpcy5wcm9wcy5waG90b3Nba10uYXNwZWN0UmF0aW99IGFsdD1cIlwiIC8+PC9hPlxuXHRcdFx0IDwvZGl2PlxuXHRcdCAgICApO1xuXHRcdH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXHRyZXR1cm4oXG5cdCAgICB0aGlzLnJlbmRlckdhbGxlcnkocGhvdG9QcmV2aWV3Tm9kZXMsIGxpZ2h0Ym94SW1hZ2VzKVxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJHYWxsZXJ5KHBob3RvUHJldmlld05vZGVzLCBsaWdodGJveEltYWdlcyl7XG5cdGlmICh0aGlzLnByb3BzLmRpc2FibGVMaWdodGJveCl7XG5cdCAgICByZXR1cm4oXG5cdFx0PGRpdiBpZD1cIkdhbGxlcnlcIiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxuXHRcdCAgICB7cGhvdG9QcmV2aWV3Tm9kZXN9XG5cdFx0PC9kaXY+XG5cdCAgICApO1xuXHR9XG5cdGVsc2V7XG5cdCAgICByZXR1cm4oXG5cdFx0PGRpdiBpZD1cIkdhbGxlcnlcIiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxuXHRcdCAgICB7cGhvdG9QcmV2aWV3Tm9kZXN9XG5cdFx0ICAgIDxMaWdodGJveFxuXHRcdFx0Y3VycmVudEltYWdlPXt0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZX1cblx0XHRcdGltYWdlcz17bGlnaHRib3hJbWFnZXN9XG5cdFx0XHRpc09wZW49e3RoaXMuc3RhdGUubGlnaHRib3hJc09wZW59XG5cdFx0XHRvbkNsb3NlPXt0aGlzLmNsb3NlTGlnaHRib3h9XG5cdFx0XHRvbkNsaWNrUHJldj17dGhpcy5nb3RvUHJldmlvdXN9XG5cdFx0XHRvbkNsaWNrTmV4dD17dGhpcy5nb3RvTmV4dH1cblx0XHRcdHdpZHRoPXsxNjAwfVxuXHRcdFx0c2hvd0ltYWdlQ291bnQ9e3RoaXMucHJvcHMubGlnaHRib3hTaG93SW1hZ2VDb3VudH1cblx0XHRcdGJhY2tkcm9wQ2xvc2VzTW9kYWw9e3RoaXMucHJvcHMuYmFja2Ryb3BDbG9zZXNNb2RhbH1cblx0XHQgICAgLz5cblx0XHQ8L2Rpdj5cblx0ICAgICk7XG5cdH1cbiAgICB9XG59O1xuR2FsbGVyeS5kaXNwbGF5TmFtZSA9ICdHYWxsZXJ5JztcbkdhbGxlcnkucHJvcFR5cGVzID0ge1xuICAgIHBob3RvczogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKXtcblx0dmFyIGxpZ2h0Ym94SW1hZ2VWYWxpZGF0b3IgPSBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0O1xuXHRpZiAoIXByb3BzLmRpc2FibGVMaWdodGJveCl7XG5cdCAgICBsaWdodGJveEltYWdlVmFsaWRhdG9yID0gUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkO1xuXHR9XG5cdHJldHVybiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcblx0ICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG5cdFx0c3JjOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0d2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0XHRoZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0XHRhc3BlY3RSYXRpbzogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHRcdGxpZ2h0Ym94SW1hZ2U6IGxpZ2h0Ym94SW1hZ2VWYWxpZGF0b3Jcblx0ICAgIH0pXG5cdCkuaXNSZXF1aXJlZC5hcHBseSh0aGlzLGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICBkaXNhYmxlTGlnaHRib3g6IFJlYWN0LlByb3BUeXBlcy5ib29sXG59O1xuR2FsbGVyeS5kZWZhdWx0UHJvcHMgPSB7XG4gICAgbGlnaHRib3hTaG93SW1hZ2VDb3VudDogZmFsc2UsXG4gICAgYmFja2Ryb3BDbG9zZXNNb2RhbDogdHJ1ZSxcbiAgICBkaXNhYmxlTGlnaHRib3g6IGZhbHNlXG59XG4vLyBHYWxsZXJ5IGltYWdlIHN0eWxlXG5jb25zdCBzdHlsZSA9IHtcbiAgIGRpc3BsYXk6ICdibG9jaycsXG4gICBtYXJnaW46IDIsXG4gICBiYWNrZ3JvdW5kQ29sb3I6JyNlM2UzZTMnLFxuICAgZmxvYXQ6ICdsZWZ0J1xufVxuXG5leHBvcnQgZGVmYXVsdCBHYWxsZXJ5O1xuIl19
