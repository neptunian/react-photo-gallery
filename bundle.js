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
                if (i === lastRowIndex) {
                    commonHeight = lastRowWidth / totalAr;
                } else {
                    commonHeight = contWidth / totalAr;
                }
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
            var _this = this;

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
            aspectRatio: _react2['default'].PropTypes.number.isRequired,
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL29jdGF2aWEvZGV2L3JlYWN0LXBob3RvLWdhbGxlcnkvc3JjL0dhbGxlcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ0FrQixPQUFPOzs7OzJCQUNKLGNBQWM7Ozs7SUFFN0IsT0FBTztjQUFQLE9BQU87O0FBQ0UsYUFEVCxPQUFPLEdBQ0k7OEJBRFgsT0FBTzs7QUFFWixtQ0FGSyxPQUFPLDZDQUVKO0FBQ1IsWUFBSSxDQUFDLEtBQUssR0FBRztBQUNULHdCQUFZLEVBQUUsQ0FBQztBQUNmLDBCQUFjLEVBQUUsQ0FBQztTQUNwQixDQUFDO0FBQ0YsWUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqRCxZQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25ELFlBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekMsWUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqRCxZQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzdDOztpQkFaQyxPQUFPOztlQWFRLDZCQUFFO0FBQ3RCLGdCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBQyxDQUFDLENB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QUFDcEQsWUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUM7QUFDdkIsa0NBQXNCLEdBQUcsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7U0FDOUQ7QUFDRCxlQUFPLG1CQUFNLFNBQVMsQ0FBQyxPQUFPLENBQzFCLG1CQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUM7QUFDekIsZUFBRyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUN0QyxpQkFBSyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUN4QyxrQkFBTSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUN6Qyx1QkFBVyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUM5Qyx5QkFBYSxFQUFFLHNCQUFzQjtTQUNqQyxDQUFDLENBQ0wsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxTQUFTLENBQUMsQ0FBQztLQUMvQjtBQUNELG1CQUFlLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7Q0FDeEMsQ0FBQztBQUNGLE9BQU8sQ0FBQyxZQUFZLEdBQUc7QUFDbkIsMEJBQXNCLEVBQUUsS0FBSztBQUM3Qix1QkFBbUIsRUFBRSxJQUFJO0FBQ3pCLG1CQUFlLEVBQUUsS0FBSztBQUN0QixvQkFBZ0IsRUFBRSxJQUFJO0NBQ3pCLENBQUE7O0FBRUQsSUFBTSxLQUFLLEdBQUc7QUFDWCxXQUFPLEVBQUUsT0FBTztBQUNoQixVQUFNLEVBQUUsQ0FBQztBQUNULG1CQUFlLEVBQUMsU0FBUztBQUN6QixTQUFLLEVBQUUsTUFBTTtDQUNmLENBQUE7O3FCQUVjLE9BQU8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBMaWdodGJveCBmcm9tICdyZWFjdC1pbWFnZXMnO1xuXG5jbGFzcyBHYWxsZXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKCl7XG5cdHN1cGVyKCk7XG5cdHRoaXMuc3RhdGUgPSB7XG5cdCAgICBjdXJyZW50SW1hZ2U6IDAsXG5cdCAgICBjb250YWluZXJXaWR0aDogMFxuXHR9O1xuXHR0aGlzLmhhbmRsZVJlc2l6ZSA9IHRoaXMuaGFuZGxlUmVzaXplLmJpbmQodGhpcyk7XG5cdHRoaXMuY2xvc2VMaWdodGJveCA9IHRoaXMuY2xvc2VMaWdodGJveC5iaW5kKHRoaXMpO1xuXHR0aGlzLmdvdG9OZXh0ID0gdGhpcy5nb3RvTmV4dC5iaW5kKHRoaXMpO1xuXHR0aGlzLmdvdG9QcmV2aW91cyA9IHRoaXMuZ290b1ByZXZpb3VzLmJpbmQodGhpcyk7XG5cdHRoaXMub3BlbkxpZ2h0Ym94ID0gdGhpcy5vcGVuTGlnaHRib3guYmluZCh0aGlzKTtcbiAgICB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcblx0dGhpcy5zZXRTdGF0ZSh7Y29udGFpbmVyV2lkdGg6IE1hdGguZmxvb3IodGhpcy5fZ2FsbGVyeS5jbGllbnRXaWR0aCl9KVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIH1cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKXtcblx0aWYgKHRoaXMuX2dhbGxlcnkuY2xpZW50V2lkdGggIT09IHRoaXMuc3RhdGUuY29udGFpbmVyV2lkdGgpe1xuXHQgICAgdGhpcy5zZXRTdGF0ZSh7Y29udGFpbmVyV2lkdGg6IE1hdGguZmxvb3IodGhpcy5fZ2FsbGVyeS5jbGllbnRXaWR0aCl9KTtcblx0fVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXHQgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplLCBmYWxzZSk7XG4gICAgfVxuICAgIGhhbmRsZVJlc2l6ZShlKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29udGFpbmVyV2lkdGg6IE1hdGguZmxvb3IodGhpcy5fZ2FsbGVyeS5jbGllbnRXaWR0aCl9KTtcbiAgICB9XG4gICAgb3BlbkxpZ2h0Ym94KGluZGV4LCBldmVudCl7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuXHQgICAgY3VycmVudEltYWdlOiBpbmRleCxcbiAgICAgICAgICAgIGxpZ2h0Ym94SXNPcGVuOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjbG9zZUxpZ2h0Ym94KCl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuXHQgICAgY3VycmVudEltYWdlOiAwLFxuICAgICAgICAgICAgbGlnaHRib3hJc09wZW46IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ290b1ByZXZpb3VzKCl7XG5cdHRoaXMuc2V0U3RhdGUoe1xuXHQgICAgY3VycmVudEltYWdlOiB0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSAtIDEsXG5cdH0pO1xuICAgIH1cbiAgICBnb3RvTmV4dCgpe1xuXHR0aGlzLnNldFN0YXRlKHtcblx0ICAgIGN1cnJlbnRJbWFnZTogdGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2UgKyAxLFxuXHR9KTtcbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciByb3dMaW1pdCA9IDEsXG4gICAgICAgICAgICBwaG90b1ByZXZpZXdOb2RlcyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb250YWluZXJXaWR0aCA+PSA0ODApe1xuICAgICAgICAgICAgcm93TGltaXQgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoID49IDEwMjQpe1xuICAgICAgICAgICAgcm93TGltaXQgPSAzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb250V2lkdGggPSB0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoIC0gKHJvd0xpbWl0ICogNCk7IC8qIDRweCBmb3IgbWFyZ2luIGFyb3VuZCBlYWNoIGltYWdlKi9cbiAgICAgICAgY29udFdpZHRoID0gTWF0aC5mbG9vcihjb250V2lkdGggLSAyKTsgLy8gYWRkIHNvbWUgcGFkZGluZyB0byBwcmV2ZW50IGxheW91dCBwcm9iXG4gICAgICAgIHZhciByZW1haW5kZXIgPSB0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGggJSByb3dMaW1pdDtcbiAgICAgICAgaWYgKHJlbWFpbmRlcikgeyAvLyB0aGVyZSBhcmUgZmV3ZXIgdGhhbiByb3dMaW1pdCBwaG90b3MgaW4gbGFzdCByb3dcbiAgICAgICAgICB2YXIgbGFzdFJvd1dpZHRoID0gTWF0aC5mbG9vcih0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoIC0gKHJlbWFpbmRlciAqIDQpIC0gMik7XG4gICAgICAgICAgdmFyIGxhc3RSb3dJbmRleCA9IHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aCAtIHJlbWFpbmRlcjtcbiAgICAgICAgfVxuXHR2YXIgbGlnaHRib3hJbWFnZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaT0wO2k8dGhpcy5wcm9wcy5waG90b3MubGVuZ3RoO2krPXJvd0xpbWl0KXtcbiAgICAgICAgICAgIHZhciByb3dJdGVtcyA9IFtdO1xuICAgICAgICAgICAgLy8gbG9vcCB0aHJ1IGVhY2ggc2V0IG9mIHJvd0xpbWl0IG51bVxuICAgICAgICAgICAgLy8gZWcuIGlmIHJvd0xpbWl0IGlzIDMgaXQgd2lsbCAgbG9vcCB0aHJ1IDAsMSwyLCB0aGVuIDMsNCw1IHRvIHBlcmZvcm0gY2FsY3VsYXRpb25zIGZvciB0aGUgcGFydGljdWxhciBzZXRcbiAgICAgICAgICAgIHZhciBhc3BlY3RSYXRpbz0wLFxuICAgICAgICAgICAgICAgIHRvdGFsQXI9MCxcbiAgICAgICAgICAgICAgICBjb21tb25IZWlnaHQgPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaj1pOyBqPGkrcm93TGltaXQ7IGorKyl7XG4gICAgICAgICAgICAgICAgaWYgKGogPT0gdGhpcy5wcm9wcy5waG90b3MubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXHRcdHRvdGFsQXIgKz0gdGhpcy5wcm9wcy5waG90b3Nbal0uYXNwZWN0UmF0aW87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA9PT0gbGFzdFJvd0luZGV4KSB7XG4gICAgICAgICAgICAgIGNvbW1vbkhlaWdodCA9IGxhc3RSb3dXaWR0aCAvIHRvdGFsQXI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb21tb25IZWlnaHQgPSBjb250V2lkdGggLyB0b3RhbEFyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gcnVuIHRocnUgdGhlIHNhbWUgc2V0IG9mIGl0ZW1zIGFnYWluIHRvIGdpdmUgdGhlIGNvbW1vbiBoZWlnaHRcbiAgICAgICAgICAgIGZvciAodmFyIGs9aTsgazxpK3Jvd0xpbWl0OyBrKyspe1xuICAgICAgICAgICAgICAgIGlmIChrID09IHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblx0XHR2YXIgc3JjID0gdGhpcy5wcm9wcy5waG90b3Nba10uc3JjO1xuXG5cdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZUxpZ2h0Ym94KXtcblx0XHQgICAgcGhvdG9QcmV2aWV3Tm9kZXMucHVzaChcblx0XHRcdCA8ZGl2IGtleT17a30gc3R5bGU9e3N0eWxlfT5cblx0XHRcdCAgICA8aW1nIHNyYz17c3JjfSBzdHlsZT17e2Rpc3BsYXk6J2Jsb2NrJywgYm9yZGVyOjB9fSBoZWlnaHQ9e2NvbW1vbkhlaWdodH0gd2lkdGg9e2NvbW1vbkhlaWdodCAqIHRoaXMucHJvcHMucGhvdG9zW2tdLmFzcGVjdFJhdGlvfSBhbHQ9XCJcIiAvPlxuXHRcdFx0IDwvZGl2PlxuXHRcdCAgICApO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdCAgICBsaWdodGJveEltYWdlcy5wdXNoKHRoaXMucHJvcHMucGhvdG9zW2tdLmxpZ2h0Ym94SW1hZ2UpO1xuXHRcdCAgICBwaG90b1ByZXZpZXdOb2Rlcy5wdXNoKFxuXHRcdFx0IDxkaXYga2V5PXtrfSBzdHlsZT17c3R5bGV9PlxuXHRcdFx0ICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPXtrfSBvbkNsaWNrPXt0aGlzLm9wZW5MaWdodGJveC5iaW5kKHRoaXMsIGspfT48aW1nIHNyYz17c3JjfSBzdHlsZT17e2Rpc3BsYXk6J2Jsb2NrJywgYm9yZGVyOjB9fSBoZWlnaHQ9e2NvbW1vbkhlaWdodH0gd2lkdGg9e2NvbW1vbkhlaWdodCAqIHRoaXMucHJvcHMucGhvdG9zW2tdLmFzcGVjdFJhdGlvfSBhbHQ9XCJcIiAvPjwvYT5cblx0XHRcdCA8L2Rpdj5cblx0XHQgICAgKTtcblx0XHR9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblx0cmV0dXJuKFxuXHQgICAgdGhpcy5yZW5kZXJHYWxsZXJ5KHBob3RvUHJldmlld05vZGVzLCBsaWdodGJveEltYWdlcylcbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyR2FsbGVyeShwaG90b1ByZXZpZXdOb2RlcywgbGlnaHRib3hJbWFnZXMpe1xuXHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlTGlnaHRib3gpe1xuXHQgICAgcmV0dXJuKFxuXHRcdDxkaXYgaWQ9XCJHYWxsZXJ5XCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIiByZWY9eyhjKSA9PiB0aGlzLl9nYWxsZXJ5ID0gY30+XG5cdFx0ICAgIHtwaG90b1ByZXZpZXdOb2Rlc31cblx0XHQ8L2Rpdj5cblx0ICAgICk7XG5cdH1cblx0ZWxzZXtcblx0ICAgIHJldHVybihcblx0XHQ8ZGl2IGlkPVwiR2FsbGVyeVwiIGNsYXNzTmFtZT1cImNsZWFyZml4XCIgcmVmPXsoYykgPT4gdGhpcy5fZ2FsbGVyeSA9IGN9PlxuXHRcdCAgICB7cGhvdG9QcmV2aWV3Tm9kZXN9XG5cdFx0ICAgIDxMaWdodGJveFxuXHRcdFx0Y3VycmVudEltYWdlPXt0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZX1cblx0XHRcdGltYWdlcz17bGlnaHRib3hJbWFnZXN9XG5cdFx0XHRpc09wZW49e3RoaXMuc3RhdGUubGlnaHRib3hJc09wZW59XG5cdFx0XHRvbkNsb3NlPXt0aGlzLmNsb3NlTGlnaHRib3h9XG5cdFx0XHRvbkNsaWNrUHJldj17dGhpcy5nb3RvUHJldmlvdXN9XG5cdFx0XHRvbkNsaWNrTmV4dD17dGhpcy5nb3RvTmV4dH1cblx0XHRcdHdpZHRoPXsxNjAwfVxuXHRcdFx0c2hvd0ltYWdlQ291bnQ9e3RoaXMucHJvcHMubGlnaHRib3hTaG93SW1hZ2VDb3VudH1cblx0XHRcdGJhY2tkcm9wQ2xvc2VzTW9kYWw9e3RoaXMucHJvcHMuYmFja2Ryb3BDbG9zZXNNb2RhbH1cblx0XHRcdHByZWxvYWROZXh0SW1hZ2U9e3RoaXMucHJvcHMucHJlbG9hZE5leHRJbWFnZX1cblx0XHQgICAgLz5cblx0XHQ8L2Rpdj5cblx0ICAgICk7XG5cdH1cbiAgICB9XG59O1xuR2FsbGVyeS5kaXNwbGF5TmFtZSA9ICdHYWxsZXJ5JztcbkdhbGxlcnkucHJvcFR5cGVzID0ge1xuICAgIHBob3RvczogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKXtcblx0dmFyIGxpZ2h0Ym94SW1hZ2VWYWxpZGF0b3IgPSBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0O1xuXHRpZiAoIXByb3BzLmRpc2FibGVMaWdodGJveCl7XG5cdCAgICBsaWdodGJveEltYWdlVmFsaWRhdG9yID0gUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkO1xuXHR9XG5cdHJldHVybiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcblx0ICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG5cdFx0c3JjOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0d2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0XHRoZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0XHRhc3BlY3RSYXRpbzogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHRcdGxpZ2h0Ym94SW1hZ2U6IGxpZ2h0Ym94SW1hZ2VWYWxpZGF0b3Jcblx0ICAgIH0pXG5cdCkuaXNSZXF1aXJlZC5hcHBseSh0aGlzLGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICBkaXNhYmxlTGlnaHRib3g6IFJlYWN0LlByb3BUeXBlcy5ib29sXG59O1xuR2FsbGVyeS5kZWZhdWx0UHJvcHMgPSB7XG4gICAgbGlnaHRib3hTaG93SW1hZ2VDb3VudDogZmFsc2UsXG4gICAgYmFja2Ryb3BDbG9zZXNNb2RhbDogdHJ1ZSxcbiAgICBkaXNhYmxlTGlnaHRib3g6IGZhbHNlLFxuICAgIHByZWxvYWROZXh0SW1hZ2U6IHRydWVcbn1cbi8vIEdhbGxlcnkgaW1hZ2Ugc3R5bGVcbmNvbnN0IHN0eWxlID0ge1xuICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgIG1hcmdpbjogMixcbiAgIGJhY2tncm91bmRDb2xvcjonI2UzZTNlMycsXG4gICBmbG9hdDogJ2xlZnQnXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbGxlcnk7XG4iXX0=
