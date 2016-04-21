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
																								showImageCount: this.props.lightboxShowImageCount
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL29jdGF2aWEvZGV2L3JlYWN0LXBob3RvLWdhbGxlcnkvc3JjL0dhbGxlcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ0FrQixPQUFPOzs7O3dCQUNKLFdBQVc7Ozs7MkJBQ1gsY0FBYzs7OztJQUU3QixPQUFPO2NBQVAsT0FBTzs7QUFDRSxhQURULE9BQU8sR0FDSTs4QkFEWCxPQUFPOztBQUVaLG1DQUZLLE9BQU8sNkNBRUo7QUFDUixZQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1Qsd0JBQVksRUFBRSxDQUFDO0FBQ2YsMEJBQWMsRUFBRSxDQUFDO1NBQ3BCLENBQUM7QUFDRixZQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pELFlBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkQsWUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QyxZQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pELFlBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDN0M7O2lCQVpDLE9BQU87O2VBYVEsNkJBQUU7QUFDdEIsZ0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBUyxXQUFXLENBQUMsSUFBSSxDQUFDLENB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S0FBSztBQUM3QixtQkFBZSxFQUFFLEtBQUs7Q0FDekIsQ0FBQTs7QUFFRCxJQUFNLEtBQUssR0FBRztBQUNYLFdBQU8sRUFBRSxPQUFPO0FBQ2hCLFVBQU0sRUFBRSxDQUFDO0FBQ1QsbUJBQWUsRUFBQyxTQUFTO0FBQ3pCLFNBQUssRUFBRSxNQUFNO0NBQ2YsQ0FBQTs7cUJBRWMsT0FBTyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgTGlnaHRib3ggZnJvbSAncmVhY3QtaW1hZ2VzJztcblxuY2xhc3MgR2FsbGVyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuXHRzdXBlcigpO1xuXHR0aGlzLnN0YXRlID0ge1xuXHQgICAgY3VycmVudEltYWdlOiAwLFxuXHQgICAgY29udGFpbmVyV2lkdGg6IDBcblx0fTtcblx0dGhpcy5oYW5kbGVSZXNpemUgPSB0aGlzLmhhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpO1xuXHR0aGlzLmNsb3NlTGlnaHRib3ggPSB0aGlzLmNsb3NlTGlnaHRib3guYmluZCh0aGlzKTtcblx0dGhpcy5nb3RvTmV4dCA9IHRoaXMuZ290b05leHQuYmluZCh0aGlzKTtcblx0dGhpcy5nb3RvUHJldmlvdXMgPSB0aGlzLmdvdG9QcmV2aW91cy5iaW5kKHRoaXMpO1xuXHR0aGlzLm9wZW5MaWdodGJveCA9IHRoaXMub3BlbkxpZ2h0Ym94LmJpbmQodGhpcyk7XG4gICAgfVxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG5cdHRoaXMuc2V0U3RhdGUoe2NvbnRhaW5lcldpZHRoOiBNYXRoLmZsb29yKFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLmNsaWVudFdpZHRoKX0pXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XG4gICAgfVxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRpZiAoUmVhY3RET00uZmluZERPTU5vZGUodGhpcykuY2xpZW50V2lkdGggIT09IHRoaXMuc3RhdGUuY29udGFpbmVyV2lkdGgpe1xuXHQgICAgdGhpcy5zZXRTdGF0ZSh7Y29udGFpbmVyV2lkdGg6IE1hdGguZmxvb3IoUmVhY3RET00uZmluZERPTU5vZGUodGhpcykuY2xpZW50V2lkdGgpfSk7XG5cdH1cbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSwgZmFsc2UpO1xuICAgIH1cbiAgICBoYW5kbGVSZXNpemUoZSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbnRhaW5lcldpZHRoOiBNYXRoLmZsb29yKFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLmNsaWVudFdpZHRoKX0pO1xuICAgIH1cbiAgICBvcGVuTGlnaHRib3goaW5kZXgsIGV2ZW50KXtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG5cdCAgICBjdXJyZW50SW1hZ2U6IGluZGV4LFxuICAgICAgICAgICAgbGlnaHRib3hJc09wZW46IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNsb3NlTGlnaHRib3goKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG5cdCAgICBjdXJyZW50SW1hZ2U6IDAsXG4gICAgICAgICAgICBsaWdodGJveElzT3BlbjogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnb3RvUHJldmlvdXMoKXtcblx0dGhpcy5zZXRTdGF0ZSh7XG5cdCAgICBjdXJyZW50SW1hZ2U6IHRoaXMuc3RhdGUuY3VycmVudEltYWdlIC0gMSxcblx0fSk7XG4gICAgfVxuICAgIGdvdG9OZXh0KCl7XG5cdHRoaXMuc2V0U3RhdGUoe1xuXHQgICAgY3VycmVudEltYWdlOiB0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSArIDEsXG5cdH0pO1xuICAgIH1cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHJvd0xpbWl0ID0gMSxcbiAgICAgICAgICAgIHBob3RvUHJldmlld05vZGVzID0gW107XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoID49IDQ4MCl7XG4gICAgICAgICAgICByb3dMaW1pdCA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29udGFpbmVyV2lkdGggPj0gMTAyNCl7XG4gICAgICAgICAgICByb3dMaW1pdCA9IDM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbnRXaWR0aCA9IHRoaXMuc3RhdGUuY29udGFpbmVyV2lkdGggLSAocm93TGltaXQgKiA0KTsgLyogNHB4IGZvciBtYXJnaW4gYXJvdW5kIGVhY2ggaW1hZ2UqL1xuICAgICAgICBjb250V2lkdGggPSBNYXRoLmZsb29yKGNvbnRXaWR0aCAtIDIpOyAvLyBhZGQgc29tZSBwYWRkaW5nIHRvIHByZXZlbnQgbGF5b3V0IHByb2Jcblx0dmFyIGxpZ2h0Ym94SW1hZ2VzID0gW107XG4gICAgICAgIGZvciAodmFyIGk9MDtpPHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aDtpKz1yb3dMaW1pdCl7XG4gICAgICAgICAgICB2YXIgcm93SXRlbXMgPSBbXTtcbiAgICAgICAgICAgIC8vIGxvb3AgdGhydSBlYWNoIHNldCBvZiByb3dMaW1pdCBudW1cbiAgICAgICAgICAgIC8vIGVnLiBpZiByb3dMaW1pdCBpcyAzIGl0IHdpbGwgIGxvb3AgdGhydSAwLDEsMiwgdGhlbiAzLDQsNSB0byBwZXJmb3JtIGNhbGN1bGF0aW9ucyBmb3IgdGhlIHBhcnRpY3VsYXIgc2V0XG4gICAgICAgICAgICB2YXIgYXNwZWN0UmF0aW89MCxcbiAgICAgICAgICAgICAgICB0b3RhbEFyPTAsXG4gICAgICAgICAgICAgICAgY29tbW9uSGVpZ2h0ID0gMDtcbiAgICAgICAgICAgIGZvciAodmFyIGo9aTsgajxpK3Jvd0xpbWl0OyBqKyspe1xuICAgICAgICAgICAgICAgIGlmIChqID09IHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblx0XHR0b3RhbEFyICs9IHRoaXMucHJvcHMucGhvdG9zW2pdLmFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tbW9uSGVpZ2h0ID0gY29udFdpZHRoIC8gdG90YWxBcjtcbiAgICAgICAgICAgIC8vIHJ1biB0aHJ1IHRoZSBzYW1lIHNldCBvZiBpdGVtcyBhZ2FpbiB0byBnaXZlIHRoZSBjb21tb24gaGVpZ2h0XG4gICAgICAgICAgICBmb3IgKHZhciBrPWk7IGs8aStyb3dMaW1pdDsgaysrKXtcbiAgICAgICAgICAgICAgICBpZiAoayA9PSB0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cdFx0dmFyIHNyYyA9IHRoaXMucHJvcHMucGhvdG9zW2tdLnNyYztcblxuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVMaWdodGJveCl7XG5cdFx0ICAgIHBob3RvUHJldmlld05vZGVzLnB1c2goXG5cdFx0XHQgPGRpdiBrZXk9e2t9IHN0eWxlPXtzdHlsZX0+XG5cdFx0XHQgICAgPGltZyBzcmM9e3NyY30gc3R5bGU9e3tkaXNwbGF5OidibG9jaycsIGJvcmRlcjowfX0gaGVpZ2h0PXtjb21tb25IZWlnaHR9IHdpZHRoPXtjb21tb25IZWlnaHQgKiB0aGlzLnByb3BzLnBob3Rvc1trXS5hc3BlY3RSYXRpb30gYWx0PVwiXCIgLz5cblx0XHRcdCA8L2Rpdj5cblx0XHQgICAgKTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHQgICAgbGlnaHRib3hJbWFnZXMucHVzaCh0aGlzLnByb3BzLnBob3Rvc1trXS5saWdodGJveEltYWdlKTtcblx0XHQgICAgcGhvdG9QcmV2aWV3Tm9kZXMucHVzaChcblx0XHRcdCA8ZGl2IGtleT17a30gc3R5bGU9e3N0eWxlfT5cblx0XHRcdCAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT17a30gb25DbGljaz17dGhpcy5vcGVuTGlnaHRib3guYmluZCh0aGlzLCBrKX0+PGltZyBzcmM9e3NyY30gc3R5bGU9e3tkaXNwbGF5OidibG9jaycsIGJvcmRlcjowfX0gaGVpZ2h0PXtjb21tb25IZWlnaHR9IHdpZHRoPXtjb21tb25IZWlnaHQgKiB0aGlzLnByb3BzLnBob3Rvc1trXS5hc3BlY3RSYXRpb30gYWx0PVwiXCIgLz48L2E+XG5cdFx0XHQgPC9kaXY+XG5cdFx0ICAgICk7XG5cdFx0fVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdHJldHVybihcblx0ICAgIHRoaXMucmVuZGVyR2FsbGVyeShwaG90b1ByZXZpZXdOb2RlcywgbGlnaHRib3hJbWFnZXMpXG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckdhbGxlcnkocGhvdG9QcmV2aWV3Tm9kZXMsIGxpZ2h0Ym94SW1hZ2VzKXtcblx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZUxpZ2h0Ym94KXtcblx0ICAgIHJldHVybihcblx0XHQ8ZGl2IGlkPVwiR2FsbGVyeVwiIGNsYXNzTmFtZT1cImNsZWFyZml4XCI+XG5cdFx0ICAgIHtwaG90b1ByZXZpZXdOb2Rlc31cblx0XHQ8L2Rpdj5cblx0ICAgICk7XG5cdH1cblx0ZWxzZXtcblx0ICAgIHJldHVybihcblx0XHQ8ZGl2IGlkPVwiR2FsbGVyeVwiIGNsYXNzTmFtZT1cImNsZWFyZml4XCI+XG5cdFx0ICAgIHtwaG90b1ByZXZpZXdOb2Rlc31cblx0XHQgICAgPExpZ2h0Ym94XG5cdFx0XHRjdXJyZW50SW1hZ2U9e3RoaXMuc3RhdGUuY3VycmVudEltYWdlfVxuXHRcdFx0aW1hZ2VzPXtsaWdodGJveEltYWdlc31cblx0XHRcdGlzT3Blbj17dGhpcy5zdGF0ZS5saWdodGJveElzT3Blbn1cblx0XHRcdG9uQ2xvc2U9e3RoaXMuY2xvc2VMaWdodGJveH1cblx0XHRcdG9uQ2xpY2tQcmV2PXt0aGlzLmdvdG9QcmV2aW91c31cblx0XHRcdG9uQ2xpY2tOZXh0PXt0aGlzLmdvdG9OZXh0fVxuXHRcdFx0d2lkdGg9ezE2MDB9XG5cdFx0XHRzaG93SW1hZ2VDb3VudD17dGhpcy5wcm9wcy5saWdodGJveFNob3dJbWFnZUNvdW50fVxuXHRcdCAgICAvPlxuXHRcdDwvZGl2PlxuXHQgICAgKTtcblx0fVxuICAgIH1cbn07XG5HYWxsZXJ5LmRpc3BsYXlOYW1lID0gJ0dhbGxlcnknO1xuR2FsbGVyeS5wcm9wVHlwZXMgPSB7XG4gICAgcGhvdG9zOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpe1xuXHR2YXIgbGlnaHRib3hJbWFnZVZhbGlkYXRvciA9IFJlYWN0LlByb3BUeXBlcy5vYmplY3Q7XG5cdGlmICghcHJvcHMuZGlzYWJsZUxpZ2h0Ym94KXtcblx0ICAgIGxpZ2h0Ym94SW1hZ2VWYWxpZGF0b3IgPSBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQ7XG5cdH1cblx0cmV0dXJuIFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuXHQgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcblx0XHRzcmM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHR3aWR0aDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHRcdGhlaWdodDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHRcdGFzcGVjdFJhdGlvOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cdFx0bGlnaHRib3hJbWFnZTogbGlnaHRib3hJbWFnZVZhbGlkYXRvclxuXHQgICAgfSlcblx0KS5pc1JlcXVpcmVkLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIGRpc2FibGVMaWdodGJveDogUmVhY3QuUHJvcFR5cGVzLmJvb2xcbn07XG5HYWxsZXJ5LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBsaWdodGJveFNob3dJbWFnZUNvdW50OiBmYWxzZSxcbiAgICBkaXNhYmxlTGlnaHRib3g6IGZhbHNlXG59XG4vLyBHYWxsZXJ5IGltYWdlIHN0eWxlXG5jb25zdCBzdHlsZSA9IHtcbiAgIGRpc3BsYXk6ICdibG9jaycsXG4gICBtYXJnaW46IDIsXG4gICBiYWNrZ3JvdW5kQ29sb3I6JyNlM2UzZTMnLFxuICAgZmxvYXQ6ICdsZWZ0J1xufVxuXG5leHBvcnQgZGVmYXVsdCBHYWxsZXJ5O1xuIl19
