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

},{"react":undefined,"react-images":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL29jdGF2aWEvZGV2L3JlYWN0LXBob3RvLWdhbGxlcnkvc3JjL0dhbGxlcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ0FrQixPQUFPOzs7OzJCQUNKLGNBQWM7Ozs7SUFFN0IsT0FBTztjQUFQLE9BQU87O0FBQ0UsYUFEVCxPQUFPLEdBQ0k7OEJBRFgsT0FBTzs7QUFFWixtQ0FGSyxPQUFPLDZDQUVKO0FBQ1IsWUFBSSxDQUFDLEtBQUssR0FBRztBQUNULHdCQUFZLEVBQUUsQ0FBQztBQUNmLDBCQUFjLEVBQUUsQ0FBQztTQUNwQixDQUFDO0FBQ0YsWUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqRCxZQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25ELFlBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekMsWUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqRCxZQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzdDOztpQkFaQyxPQUFPOztlQWFRLDZCQUFFO0FBQ3RCLGdCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBQyxDQUFDLENB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QUFHLG1CQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1NBQzlEO0FBQ0QsZUFBTyxtQkFBTSxTQUFTLENBQUMsT0FBTyxDQUMxQixtQkFBTSxTQUFTLENBQUMsS0FBSyxDQUFDO0FBQ3pCLGVBQUcsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDdEMsaUJBQUssRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDeEMsa0JBQU0sRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDekMsdUJBQVcsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDOUMseUJBQWEsRUFBRSxzQkFBc0I7U0FDakMsQ0FBQyxDQUNMLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsU0FBUyxDQUFDLENBQUM7S0FDL0I7QUFDRCxtQkFBZSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0NBQ3hDLENBQUM7QUFDRixPQUFPLENBQUMsWUFBWSxHQUFHO0FBQ25CLDBCQUFzQixFQUFFLEtBQUs7QUFDN0IsdUJBQW1CLEVBQUUsSUFBSTtBQUN6QixtQkFBZSxFQUFFLEtBQUs7Q0FDekIsQ0FBQTs7QUFFRCxJQUFNLEtBQUssR0FBRztBQUNYLFdBQU8sRUFBRSxPQUFPO0FBQ2hCLFVBQU0sRUFBRSxDQUFDO0FBQ1QsbUJBQWUsRUFBQyxTQUFTO0FBQ3pCLFNBQUssRUFBRSxNQUFNO0NBQ2YsQ0FBQTs7cUJBRWMsT0FBTyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IExpZ2h0Ym94IGZyb20gJ3JlYWN0LWltYWdlcyc7XG5cbmNsYXNzIEdhbGxlcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG4gICAgY29uc3RydWN0b3IoKXtcblx0c3VwZXIoKTtcblx0dGhpcy5zdGF0ZSA9IHtcblx0ICAgIGN1cnJlbnRJbWFnZTogMCxcblx0ICAgIGNvbnRhaW5lcldpZHRoOiAwXG5cdH07XG5cdHRoaXMuaGFuZGxlUmVzaXplID0gdGhpcy5oYW5kbGVSZXNpemUuYmluZCh0aGlzKTtcblx0dGhpcy5jbG9zZUxpZ2h0Ym94ID0gdGhpcy5jbG9zZUxpZ2h0Ym94LmJpbmQodGhpcyk7XG5cdHRoaXMuZ290b05leHQgPSB0aGlzLmdvdG9OZXh0LmJpbmQodGhpcyk7XG5cdHRoaXMuZ290b1ByZXZpb3VzID0gdGhpcy5nb3RvUHJldmlvdXMuYmluZCh0aGlzKTtcblx0dGhpcy5vcGVuTGlnaHRib3ggPSB0aGlzLm9wZW5MaWdodGJveC5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuXHR0aGlzLnNldFN0YXRlKHtjb250YWluZXJXaWR0aDogTWF0aC5mbG9vcih0aGlzLl9nYWxsZXJ5LmNsaWVudFdpZHRoKX0pXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XG4gICAgfVxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRpZiAodGhpcy5fZ2FsbGVyeS5jbGllbnRXaWR0aCAhPT0gdGhpcy5zdGF0ZS5jb250YWluZXJXaWR0aCl7XG5cdCAgICB0aGlzLnNldFN0YXRlKHtjb250YWluZXJXaWR0aDogTWF0aC5mbG9vcih0aGlzLl9nYWxsZXJ5LmNsaWVudFdpZHRoKX0pO1xuXHR9XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG5cdCB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUsIGZhbHNlKTtcbiAgICB9XG4gICAgaGFuZGxlUmVzaXplKGUpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb250YWluZXJXaWR0aDogTWF0aC5mbG9vcih0aGlzLl9nYWxsZXJ5LmNsaWVudFdpZHRoKX0pO1xuICAgIH1cbiAgICBvcGVuTGlnaHRib3goaW5kZXgsIGV2ZW50KXtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG5cdCAgICBjdXJyZW50SW1hZ2U6IGluZGV4LFxuICAgICAgICAgICAgbGlnaHRib3hJc09wZW46IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNsb3NlTGlnaHRib3goKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG5cdCAgICBjdXJyZW50SW1hZ2U6IDAsXG4gICAgICAgICAgICBsaWdodGJveElzT3BlbjogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnb3RvUHJldmlvdXMoKXtcblx0dGhpcy5zZXRTdGF0ZSh7XG5cdCAgICBjdXJyZW50SW1hZ2U6IHRoaXMuc3RhdGUuY3VycmVudEltYWdlIC0gMSxcblx0fSk7XG4gICAgfVxuICAgIGdvdG9OZXh0KCl7XG5cdHRoaXMuc2V0U3RhdGUoe1xuXHQgICAgY3VycmVudEltYWdlOiB0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSArIDEsXG5cdH0pO1xuICAgIH1cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHJvd0xpbWl0ID0gMSxcbiAgICAgICAgICAgIHBob3RvUHJldmlld05vZGVzID0gW107XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoID49IDQ4MCl7XG4gICAgICAgICAgICByb3dMaW1pdCA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29udGFpbmVyV2lkdGggPj0gMTAyNCl7XG4gICAgICAgICAgICByb3dMaW1pdCA9IDM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbnRXaWR0aCA9IHRoaXMuc3RhdGUuY29udGFpbmVyV2lkdGggLSAocm93TGltaXQgKiA0KTsgLyogNHB4IGZvciBtYXJnaW4gYXJvdW5kIGVhY2ggaW1hZ2UqL1xuICAgICAgICBjb250V2lkdGggPSBNYXRoLmZsb29yKGNvbnRXaWR0aCAtIDIpOyAvLyBhZGQgc29tZSBwYWRkaW5nIHRvIHByZXZlbnQgbGF5b3V0IHByb2JcbiAgICAgICAgdmFyIHJlbWFpbmRlciA9IHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aCAlIHJvd0xpbWl0O1xuICAgICAgICBpZiAocmVtYWluZGVyKSB7IC8vIHRoZXJlIGFyZSBmZXdlciB0aGFuIHJvd0xpbWl0IHBob3RvcyBpbiBsYXN0IHJvd1xuICAgICAgICAgIHZhciBsYXN0Um93V2lkdGggPSBNYXRoLmZsb29yKHRoaXMuc3RhdGUuY29udGFpbmVyV2lkdGggLSAocmVtYWluZGVyICogNCkgLSAyKTtcbiAgICAgICAgICB2YXIgbGFzdFJvd0luZGV4ID0gdGhpcy5wcm9wcy5waG90b3MubGVuZ3RoIC0gcmVtYWluZGVyO1xuICAgICAgICB9XG5cdHZhciBsaWdodGJveEltYWdlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpPTA7aTx0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGg7aSs9cm93TGltaXQpe1xuICAgICAgICAgICAgdmFyIHJvd0l0ZW1zID0gW107XG4gICAgICAgICAgICAvLyBsb29wIHRocnUgZWFjaCBzZXQgb2Ygcm93TGltaXQgbnVtXG4gICAgICAgICAgICAvLyBlZy4gaWYgcm93TGltaXQgaXMgMyBpdCB3aWxsICBsb29wIHRocnUgMCwxLDIsIHRoZW4gMyw0LDUgdG8gcGVyZm9ybSBjYWxjdWxhdGlvbnMgZm9yIHRoZSBwYXJ0aWN1bGFyIHNldFxuICAgICAgICAgICAgdmFyIGFzcGVjdFJhdGlvPTAsXG4gICAgICAgICAgICAgICAgdG90YWxBcj0wLFxuICAgICAgICAgICAgICAgIGNvbW1vbkhlaWdodCA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBqPWk7IGo8aStyb3dMaW1pdDsgaisrKXtcbiAgICAgICAgICAgICAgICBpZiAoaiA9PSB0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cdFx0dG90YWxBciArPSB0aGlzLnByb3BzLnBob3Rvc1tqXS5hc3BlY3RSYXRpbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID09PSBsYXN0Um93SW5kZXgpIHtcbiAgICAgICAgICAgICAgY29tbW9uSGVpZ2h0ID0gbGFzdFJvd1dpZHRoIC8gdG90YWxBcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbW1vbkhlaWdodCA9IGNvbnRXaWR0aCAvIHRvdGFsQXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBydW4gdGhydSB0aGUgc2FtZSBzZXQgb2YgaXRlbXMgYWdhaW4gdG8gZ2l2ZSB0aGUgY29tbW9uIGhlaWdodFxuICAgICAgICAgICAgZm9yICh2YXIgaz1pOyBrPGkrcm93TGltaXQ7IGsrKyl7XG4gICAgICAgICAgICAgICAgaWYgKGsgPT0gdGhpcy5wcm9wcy5waG90b3MubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXHRcdHZhciBzcmMgPSB0aGlzLnByb3BzLnBob3Rvc1trXS5zcmM7XG5cblx0XHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlTGlnaHRib3gpe1xuXHRcdCAgICBwaG90b1ByZXZpZXdOb2Rlcy5wdXNoKFxuXHRcdFx0IDxkaXYga2V5PXtrfSBzdHlsZT17c3R5bGV9PlxuXHRcdFx0ICAgIDxpbWcgc3JjPXtzcmN9IHN0eWxlPXt7ZGlzcGxheTonYmxvY2snLCBib3JkZXI6MH19IGhlaWdodD17Y29tbW9uSGVpZ2h0fSB3aWR0aD17Y29tbW9uSGVpZ2h0ICogdGhpcy5wcm9wcy5waG90b3Nba10uYXNwZWN0UmF0aW99IGFsdD1cIlwiIC8+XG5cdFx0XHQgPC9kaXY+XG5cdFx0ICAgICk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0ICAgIGxpZ2h0Ym94SW1hZ2VzLnB1c2godGhpcy5wcm9wcy5waG90b3Nba10ubGlnaHRib3hJbWFnZSk7XG5cdFx0ICAgIHBob3RvUHJldmlld05vZGVzLnB1c2goXG5cdFx0XHQgPGRpdiBrZXk9e2t9IHN0eWxlPXtzdHlsZX0+XG5cdFx0XHQgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9e2t9IG9uQ2xpY2s9e3RoaXMub3BlbkxpZ2h0Ym94LmJpbmQodGhpcywgayl9PjxpbWcgc3JjPXtzcmN9IHN0eWxlPXt7ZGlzcGxheTonYmxvY2snLCBib3JkZXI6MH19IGhlaWdodD17Y29tbW9uSGVpZ2h0fSB3aWR0aD17Y29tbW9uSGVpZ2h0ICogdGhpcy5wcm9wcy5waG90b3Nba10uYXNwZWN0UmF0aW99IGFsdD1cIlwiIC8+PC9hPlxuXHRcdFx0IDwvZGl2PlxuXHRcdCAgICApO1xuXHRcdH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXHRyZXR1cm4oXG5cdCAgICB0aGlzLnJlbmRlckdhbGxlcnkocGhvdG9QcmV2aWV3Tm9kZXMsIGxpZ2h0Ym94SW1hZ2VzKVxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJHYWxsZXJ5KHBob3RvUHJldmlld05vZGVzLCBsaWdodGJveEltYWdlcyl7XG5cdGlmICh0aGlzLnByb3BzLmRpc2FibGVMaWdodGJveCl7XG5cdCAgICByZXR1cm4oXG5cdFx0PGRpdiBpZD1cIkdhbGxlcnlcIiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiIHJlZj17KGMpID0+IHRoaXMuX2dhbGxlcnkgPSBjfT5cblx0XHQgICAge3Bob3RvUHJldmlld05vZGVzfVxuXHRcdDwvZGl2PlxuXHQgICAgKTtcblx0fVxuXHRlbHNle1xuXHQgICAgcmV0dXJuKFxuXHRcdDxkaXYgaWQ9XCJHYWxsZXJ5XCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIiByZWY9eyhjKSA9PiB0aGlzLl9nYWxsZXJ5ID0gY30+XG5cdFx0ICAgIHtwaG90b1ByZXZpZXdOb2Rlc31cblx0XHQgICAgPExpZ2h0Ym94XG5cdFx0XHRjdXJyZW50SW1hZ2U9e3RoaXMuc3RhdGUuY3VycmVudEltYWdlfVxuXHRcdFx0aW1hZ2VzPXtsaWdodGJveEltYWdlc31cblx0XHRcdGlzT3Blbj17dGhpcy5zdGF0ZS5saWdodGJveElzT3Blbn1cblx0XHRcdG9uQ2xvc2U9e3RoaXMuY2xvc2VMaWdodGJveH1cblx0XHRcdG9uQ2xpY2tQcmV2PXt0aGlzLmdvdG9QcmV2aW91c31cblx0XHRcdG9uQ2xpY2tOZXh0PXt0aGlzLmdvdG9OZXh0fVxuXHRcdFx0d2lkdGg9ezE2MDB9XG5cdFx0XHRzaG93SW1hZ2VDb3VudD17dGhpcy5wcm9wcy5saWdodGJveFNob3dJbWFnZUNvdW50fVxuXHRcdFx0YmFja2Ryb3BDbG9zZXNNb2RhbD17dGhpcy5wcm9wcy5iYWNrZHJvcENsb3Nlc01vZGFsfVxuXHRcdCAgICAvPlxuXHRcdDwvZGl2PlxuXHQgICAgKTtcblx0fVxuICAgIH1cbn07XG5HYWxsZXJ5LmRpc3BsYXlOYW1lID0gJ0dhbGxlcnknO1xuR2FsbGVyeS5wcm9wVHlwZXMgPSB7XG4gICAgcGhvdG9zOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpe1xuXHR2YXIgbGlnaHRib3hJbWFnZVZhbGlkYXRvciA9IFJlYWN0LlByb3BUeXBlcy5vYmplY3Q7XG5cdGlmICghcHJvcHMuZGlzYWJsZUxpZ2h0Ym94KXtcblx0ICAgIGxpZ2h0Ym94SW1hZ2VWYWxpZGF0b3IgPSBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQ7XG5cdH1cblx0cmV0dXJuIFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuXHQgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcblx0XHRzcmM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHR3aWR0aDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHRcdGhlaWdodDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHRcdGFzcGVjdFJhdGlvOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cdFx0bGlnaHRib3hJbWFnZTogbGlnaHRib3hJbWFnZVZhbGlkYXRvclxuXHQgICAgfSlcblx0KS5pc1JlcXVpcmVkLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIGRpc2FibGVMaWdodGJveDogUmVhY3QuUHJvcFR5cGVzLmJvb2xcbn07XG5HYWxsZXJ5LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBsaWdodGJveFNob3dJbWFnZUNvdW50OiBmYWxzZSxcbiAgICBiYWNrZHJvcENsb3Nlc01vZGFsOiB0cnVlLFxuICAgIGRpc2FibGVMaWdodGJveDogZmFsc2Vcbn1cbi8vIEdhbGxlcnkgaW1hZ2Ugc3R5bGVcbmNvbnN0IHN0eWxlID0ge1xuICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgIG1hcmdpbjogMixcbiAgIGJhY2tncm91bmRDb2xvcjonI2UzZTNlMycsXG4gICBmbG9hdDogJ2xlZnQnXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbGxlcnk7XG4iXX0=
