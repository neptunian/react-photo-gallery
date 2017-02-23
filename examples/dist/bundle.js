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
												var remainder = this.props.photos.length % rowLimit;
												if (remainder) {
																// there are fewer than rowLimit photos in last row
																var lastRowWidth = Math.floor(this.state.containerWidth - remainder * 4 - 2);
																var lastRowIndex = this.props.photos.length - remainder;
												}
												var lightboxImages = [];
												// loop thru each set of rowLimit num
												// eg. if rowLimit is 3 it will  loop thru 0,1,2, then 3,4,5 to perform calculations for the particular set
												for (var i = 0; i < this.props.photos.length; i += rowLimit) {
																var totalAr = 0,
																    commonHeight = 0;

																// get the total aspect ratio of the row
																for (var j = i; j < i + rowLimit; j++) {
																				if (j == this.props.photos.length) {
																								break;
																				}
																				this.props.photos[j].aspectRatio = this.props.photos[j].width / this.props.photos[j].height;
																				totalAr += this.props.photos[j].aspectRatio;
																}
																if (i === lastRowIndex) {
																				commonHeight = lastRowWidth / totalAr;
																} else {
																				commonHeight = contWidth / totalAr;
																}
																// run thru the same set of items again to give the width and common height
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
												var _this = this;

												console.log(lightboxImages);
												if (this.props.disableLightbox) {
																return _react2['default'].createElement(
																				'div',
																				{ id: 'Gallery', className: 'clearfix', ref: function (c) {
																												return _this._gallery = c;
																								} },
																				photoPreviewNodes
																);
												} else {
																return _react2['default'].createElement(
																				'div',
																				{ id: 'Gallery', className: 'clearfix', ref: function (c) {
																												return _this._gallery = c;
																								} },
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
																								backdropClosesModal: this.props.backdropClosesModal,
																								preloadNextImage: this.props.preloadNextImage
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
												lightboxImage: lightboxImageValidator
								})).isRequired.apply(this, arguments);
				},
				disableLightbox: _react2['default'].PropTypes.bool
};
Gallery.defaultProps = {
				lightboxShowImageCount: false,
				backdropClosesModal: true,
				disableLightbox: false,
				preloadNextImage: true
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

},{"react":undefined,"react-images":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL29jdGF2aWEvZGV2L3JlYWN0LXBob3RvLWdhbGxlcnkvc3JjL0dhbGxlcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ0FrQixPQUFPOzs7OzJCQUNKLGNBQWM7Ozs7SUFFN0IsT0FBTztjQUFQLE9BQU87O0FBQ0UsYUFEVCxPQUFPLEdBQ0k7OEJBRFgsT0FBTzs7QUFFWixtQ0FGSyxPQUFPLDZDQUVKO0FBQ1IsWUFBSSxDQUFDLEtBQUssR0FBRztBQUNULHdCQUFZLEVBQUUsQ0FBQztBQUNmLDBCQUFjLEVBQUUsQ0FBQztTQUNwQixDQUFDO0FBQ0YsWUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqRCxZQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25ELFlBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekMsWUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqRCxZQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzdDOztpQkFaQyxPQUFPOztlQWFRLDZCQUFFO0FBQ3RCLGdCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBQyxDQUFDLENB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LCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTGlnaHRib3ggZnJvbSAncmVhY3QtaW1hZ2VzJztcblxuY2xhc3MgR2FsbGVyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuXHRzdXBlcigpO1xuXHR0aGlzLnN0YXRlID0ge1xuXHQgICAgY3VycmVudEltYWdlOiAwLFxuXHQgICAgY29udGFpbmVyV2lkdGg6IDBcblx0fTtcblx0dGhpcy5oYW5kbGVSZXNpemUgPSB0aGlzLmhhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpO1xuXHR0aGlzLmNsb3NlTGlnaHRib3ggPSB0aGlzLmNsb3NlTGlnaHRib3guYmluZCh0aGlzKTtcblx0dGhpcy5nb3RvTmV4dCA9IHRoaXMuZ290b05leHQuYmluZCh0aGlzKTtcblx0dGhpcy5nb3RvUHJldmlvdXMgPSB0aGlzLmdvdG9QcmV2aW91cy5iaW5kKHRoaXMpO1xuXHR0aGlzLm9wZW5MaWdodGJveCA9IHRoaXMub3BlbkxpZ2h0Ym94LmJpbmQodGhpcyk7XG4gICAgfVxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG5cdHRoaXMuc2V0U3RhdGUoe2NvbnRhaW5lcldpZHRoOiBNYXRoLmZsb29yKHRoaXMuX2dhbGxlcnkuY2xpZW50V2lkdGgpfSlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICB9XG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdGlmICh0aGlzLl9nYWxsZXJ5LmNsaWVudFdpZHRoICE9PSB0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoKXtcblx0ICAgIHRoaXMuc2V0U3RhdGUoe2NvbnRhaW5lcldpZHRoOiBNYXRoLmZsb29yKHRoaXMuX2dhbGxlcnkuY2xpZW50V2lkdGgpfSk7XG5cdH1cbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSwgZmFsc2UpO1xuICAgIH1cbiAgICBoYW5kbGVSZXNpemUoZSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbnRhaW5lcldpZHRoOiBNYXRoLmZsb29yKHRoaXMuX2dhbGxlcnkuY2xpZW50V2lkdGgpfSk7XG4gICAgfVxuICAgIG9wZW5MaWdodGJveChpbmRleCwgZXZlbnQpe1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcblx0ICAgIGN1cnJlbnRJbWFnZTogaW5kZXgsXG4gICAgICAgICAgICBsaWdodGJveElzT3BlbjogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2xvc2VMaWdodGJveCgpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcblx0ICAgIGN1cnJlbnRJbWFnZTogMCxcbiAgICAgICAgICAgIGxpZ2h0Ym94SXNPcGVuOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdvdG9QcmV2aW91cygpe1xuXHR0aGlzLnNldFN0YXRlKHtcblx0ICAgIGN1cnJlbnRJbWFnZTogdGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2UgLSAxLFxuXHR9KTtcbiAgICB9XG4gICAgZ290b05leHQoKXtcblx0dGhpcy5zZXRTdGF0ZSh7XG5cdCAgICBjdXJyZW50SW1hZ2U6IHRoaXMuc3RhdGUuY3VycmVudEltYWdlICsgMSxcblx0fSk7XG4gICAgfVxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIgcm93TGltaXQgPSAxLFxuICAgICAgICAgICAgcGhvdG9QcmV2aWV3Tm9kZXMgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29udGFpbmVyV2lkdGggPj0gNDgwKXtcbiAgICAgICAgICAgIHJvd0xpbWl0ID0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb250YWluZXJXaWR0aCA+PSAxMDI0KXtcbiAgICAgICAgICAgIHJvd0xpbWl0ID0gMztcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29udFdpZHRoID0gdGhpcy5zdGF0ZS5jb250YWluZXJXaWR0aCAtIChyb3dMaW1pdCAqIDQpOyAvKiA0cHggZm9yIG1hcmdpbiBhcm91bmQgZWFjaCBpbWFnZSovXG4gICAgICAgIGNvbnRXaWR0aCA9IE1hdGguZmxvb3IoY29udFdpZHRoIC0gMik7IC8vIGFkZCBzb21lIHBhZGRpbmcgdG8gcHJldmVudCBsYXlvdXQgcHJvYlxuICAgICAgICB2YXIgcmVtYWluZGVyID0gdGhpcy5wcm9wcy5waG90b3MubGVuZ3RoICUgcm93TGltaXQ7XG4gICAgICAgIGlmIChyZW1haW5kZXIpIHsgLy8gdGhlcmUgYXJlIGZld2VyIHRoYW4gcm93TGltaXQgcGhvdG9zIGluIGxhc3Qgcm93XG4gICAgICAgICAgdmFyIGxhc3RSb3dXaWR0aCA9IE1hdGguZmxvb3IodGhpcy5zdGF0ZS5jb250YWluZXJXaWR0aCAtIChyZW1haW5kZXIgKiA0KSAtIDIpO1xuICAgICAgICAgIHZhciBsYXN0Um93SW5kZXggPSB0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGggLSByZW1haW5kZXI7XG4gICAgICAgIH1cblx0dmFyIGxpZ2h0Ym94SW1hZ2VzID0gW107XG4gICAgICAgIC8vIGxvb3AgdGhydSBlYWNoIHNldCBvZiByb3dMaW1pdCBudW1cbiAgICAgICAgLy8gZWcuIGlmIHJvd0xpbWl0IGlzIDMgaXQgd2lsbCAgbG9vcCB0aHJ1IDAsMSwyLCB0aGVuIDMsNCw1IHRvIHBlcmZvcm0gY2FsY3VsYXRpb25zIGZvciB0aGUgcGFydGljdWxhciBzZXRcbiAgICAgICAgZm9yICh2YXIgaT0wO2k8dGhpcy5wcm9wcy5waG90b3MubGVuZ3RoO2krPXJvd0xpbWl0KXtcbiAgICAgICAgICAgIHZhciB0b3RhbEFyPTAsXG4gICAgICAgICAgICBjb21tb25IZWlnaHQgPSAwO1xuXG5cdCAgICAvLyBnZXQgdGhlIHRvdGFsIGFzcGVjdCByYXRpbyBvZiB0aGUgcm93XG4gICAgICAgICAgICBmb3IgKHZhciBqPWk7IGo8aStyb3dMaW1pdDsgaisrKXtcbiAgICAgICAgICAgICAgICBpZiAoaiA9PSB0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cdFx0dGhpcy5wcm9wcy5waG90b3Nbal0uYXNwZWN0UmF0aW8gPSB0aGlzLnByb3BzLnBob3Rvc1tqXS53aWR0aCAvIHRoaXMucHJvcHMucGhvdG9zW2pdLmhlaWdodDtcdFxuXHRcdHRvdGFsQXIgKz0gdGhpcy5wcm9wcy5waG90b3Nbal0uYXNwZWN0UmF0aW87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA9PT0gbGFzdFJvd0luZGV4KSB7XG4gICAgICAgICAgICAgIGNvbW1vbkhlaWdodCA9IGxhc3RSb3dXaWR0aCAvIHRvdGFsQXI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb21tb25IZWlnaHQgPSBjb250V2lkdGggLyB0b3RhbEFyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gcnVuIHRocnUgdGhlIHNhbWUgc2V0IG9mIGl0ZW1zIGFnYWluIHRvIGdpdmUgdGhlIHdpZHRoIGFuZCBjb21tb24gaGVpZ2h0XG4gICAgICAgICAgICBmb3IgKHZhciBrPWk7IGs8aStyb3dMaW1pdDsgaysrKXtcbiAgICAgICAgICAgICAgICBpZiAoayA9PSB0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cdFx0dmFyIHNyYyA9IHRoaXMucHJvcHMucGhvdG9zW2tdLnNyYztcblxuXHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVMaWdodGJveCl7XG5cdFx0ICAgIHBob3RvUHJldmlld05vZGVzLnB1c2goXG5cdFx0XHQgPGRpdiBrZXk9e2t9IHN0eWxlPXtzdHlsZX0+XG5cdFx0XHQgICAgPGltZyBzcmM9e3NyY30gc3R5bGU9e3tkaXNwbGF5OidibG9jaycsIGJvcmRlcjowfX0gaGVpZ2h0PXtjb21tb25IZWlnaHR9IHdpZHRoPXtjb21tb25IZWlnaHQgKiB0aGlzLnByb3BzLnBob3Rvc1trXS5hc3BlY3RSYXRpb30gYWx0PVwiXCIgLz5cblx0XHRcdCA8L2Rpdj5cblx0XHQgICAgKTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHQgICAgbGlnaHRib3hJbWFnZXMucHVzaCh0aGlzLnByb3BzLnBob3Rvc1trXS5saWdodGJveEltYWdlKTtcblx0XHQgICAgcGhvdG9QcmV2aWV3Tm9kZXMucHVzaChcblx0XHRcdCA8ZGl2IGtleT17a30gc3R5bGU9e3N0eWxlfT5cblx0XHRcdCAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT17a30gb25DbGljaz17dGhpcy5vcGVuTGlnaHRib3guYmluZCh0aGlzLCBrKX0+PGltZyBzcmM9e3NyY30gc3R5bGU9e3tkaXNwbGF5OidibG9jaycsIGJvcmRlcjowfX0gaGVpZ2h0PXtjb21tb25IZWlnaHR9IHdpZHRoPXtjb21tb25IZWlnaHQgKiB0aGlzLnByb3BzLnBob3Rvc1trXS5hc3BlY3RSYXRpb30gYWx0PVwiXCIgLz48L2E+XG5cdFx0XHQgPC9kaXY+XG5cdFx0ICAgICk7XG5cdFx0fVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdHJldHVybihcblx0ICAgIHRoaXMucmVuZGVyR2FsbGVyeShwaG90b1ByZXZpZXdOb2RlcywgbGlnaHRib3hJbWFnZXMpXG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckdhbGxlcnkocGhvdG9QcmV2aWV3Tm9kZXMsIGxpZ2h0Ym94SW1hZ2VzKXtcbmNvbnNvbGUubG9nKGxpZ2h0Ym94SW1hZ2VzKVxuXHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlTGlnaHRib3gpe1xuXHQgICAgcmV0dXJuKFxuXHRcdDxkaXYgaWQ9XCJHYWxsZXJ5XCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIiByZWY9eyhjKSA9PiB0aGlzLl9nYWxsZXJ5ID0gY30+XG5cdFx0ICAgIHtwaG90b1ByZXZpZXdOb2Rlc31cblx0XHQ8L2Rpdj5cblx0ICAgICk7XG5cdH1cblx0ZWxzZXtcblx0ICAgIHJldHVybihcblx0XHQ8ZGl2IGlkPVwiR2FsbGVyeVwiIGNsYXNzTmFtZT1cImNsZWFyZml4XCIgcmVmPXsoYykgPT4gdGhpcy5fZ2FsbGVyeSA9IGN9PlxuXHRcdCAgICB7cGhvdG9QcmV2aWV3Tm9kZXN9XG5cdFx0ICAgIDxMaWdodGJveFxuXHRcdFx0Y3VycmVudEltYWdlPXt0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZX1cblx0XHRcdGltYWdlcz17bGlnaHRib3hJbWFnZXN9XG5cdFx0XHRpc09wZW49e3RoaXMuc3RhdGUubGlnaHRib3hJc09wZW59XG5cdFx0XHRvbkNsb3NlPXt0aGlzLmNsb3NlTGlnaHRib3h9XG5cdFx0XHRvbkNsaWNrUHJldj17dGhpcy5nb3RvUHJldmlvdXN9XG5cdFx0XHRvbkNsaWNrTmV4dD17dGhpcy5nb3RvTmV4dH1cblx0XHRcdHdpZHRoPXsxNjAwfVxuXHRcdFx0c2hvd0ltYWdlQ291bnQ9e3RoaXMucHJvcHMubGlnaHRib3hTaG93SW1hZ2VDb3VudH1cblx0XHRcdGJhY2tkcm9wQ2xvc2VzTW9kYWw9e3RoaXMucHJvcHMuYmFja2Ryb3BDbG9zZXNNb2RhbH1cblx0XHRcdHByZWxvYWROZXh0SW1hZ2U9e3RoaXMucHJvcHMucHJlbG9hZE5leHRJbWFnZX1cblx0XHQgICAgLz5cblx0XHQ8L2Rpdj5cblx0ICAgICk7XG5cdH1cbiAgICB9XG59O1xuR2FsbGVyeS5kaXNwbGF5TmFtZSA9ICdHYWxsZXJ5JztcbkdhbGxlcnkucHJvcFR5cGVzID0ge1xuICAgIHBob3RvczogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKXtcblx0dmFyIGxpZ2h0Ym94SW1hZ2VWYWxpZGF0b3IgPSBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0O1xuXHRpZiAoIXByb3BzLmRpc2FibGVMaWdodGJveCl7XG5cdCAgICBsaWdodGJveEltYWdlVmFsaWRhdG9yID0gUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkO1xuXHR9XG5cdHJldHVybiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcblx0ICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG5cdFx0c3JjOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0d2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0XHRoZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0XHRsaWdodGJveEltYWdlOiBsaWdodGJveEltYWdlVmFsaWRhdG9yXG5cdCAgICB9KVxuXHQpLmlzUmVxdWlyZWQuYXBwbHkodGhpcyxhcmd1bWVudHMpO1xuICAgIH0sXG4gICAgZGlzYWJsZUxpZ2h0Ym94OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbFxufTtcbkdhbGxlcnkuZGVmYXVsdFByb3BzID0ge1xuICAgIGxpZ2h0Ym94U2hvd0ltYWdlQ291bnQ6IGZhbHNlLFxuICAgIGJhY2tkcm9wQ2xvc2VzTW9kYWw6IHRydWUsXG4gICAgZGlzYWJsZUxpZ2h0Ym94OiBmYWxzZSxcbiAgICBwcmVsb2FkTmV4dEltYWdlOiB0cnVlXG59XG4vLyBHYWxsZXJ5IGltYWdlIHN0eWxlXG5jb25zdCBzdHlsZSA9IHtcbiAgIGRpc3BsYXk6ICdibG9jaycsXG4gICBtYXJnaW46IDIsXG4gICBiYWNrZ3JvdW5kQ29sb3I6JyNlM2UzZTMnLFxuICAgZmxvYXQ6ICdsZWZ0J1xufVxuXG5leHBvcnQgZGVmYXVsdCBHYWxsZXJ5O1xuIl19
