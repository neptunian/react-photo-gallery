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
                    lightboxImages.push(this.props.photos[k].lightboxImage);
                    var src = this.props.photos[k].src;
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
    }]);

    return Gallery;
})(_react2['default'].Component);

;
Gallery.displayName = 'Gallery';
Gallery.propTypes = {
    photos: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
        src: _react2['default'].PropTypes.string.isRequired,
        width: _react2['default'].PropTypes.number.isRequired,
        height: _react2['default'].PropTypes.number.isRequired,
        aspectRatio: _react2['default'].PropTypes.number.isRequired,
        lightboxImage: _react2['default'].PropTypes.object.isRequired
    })).isRequired
};
Gallery.defaultProps = {
    lightboxShowImageCount: false
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2hlbGVuaWEvcmVhY3QtcGhvdG8tZ2FsbGVyeS9zcmMvR2FsbGVyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDQWtCLE9BQU87Ozs7d0JBQ0osV0FBVzs7OzsyQkFDWCxjQUFjOzs7O0lBRTdCLE9BQU87Y0FBUCxPQUFPOztBQUNFLGFBRFQsT0FBTyxHQUNJOzhCQURYLE9BQU87O0FBRVosbUNBRkssT0FBTyw2Q0FFSjtBQUNSLFlBQUksQ0FBQyxLQUFLLEdBQUc7QUFDVCx3QkFBWSxFQUFFLENBQUM7QUFDZiwwQkFBYyxFQUFFLENBQUM7U0FDcEIsQ0FBQztBQUNGLFlBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakQsWUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuRCxZQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pDLFlBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakQsWUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM3Qzs7aUJBWkMsT0FBTzs7ZUFhUSw2QkFBRTtBQUN0QixnQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFTLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxX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QUc7QUFDbkIsMEJBQXNCLEVBQUUsS0FBSztDQUNoQyxDQUFBOztBQUVELElBQU0sS0FBSyxHQUFHO0FBQ1gsV0FBTyxFQUFFLE9BQU87QUFDaEIsVUFBTSxFQUFFLENBQUM7QUFDVCxtQkFBZSxFQUFDLFNBQVM7QUFDekIsU0FBSyxFQUFFLE1BQU07Q0FDZixDQUFBOztxQkFFYyxPQUFPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBMaWdodGJveCBmcm9tICdyZWFjdC1pbWFnZXMnO1xuXG5jbGFzcyBHYWxsZXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKCl7XG5cdHN1cGVyKCk7XG5cdHRoaXMuc3RhdGUgPSB7XG5cdCAgICBjdXJyZW50SW1hZ2U6IDAsXG5cdCAgICBjb250YWluZXJXaWR0aDogMFxuXHR9O1xuXHR0aGlzLmhhbmRsZVJlc2l6ZSA9IHRoaXMuaGFuZGxlUmVzaXplLmJpbmQodGhpcyk7XG5cdHRoaXMuY2xvc2VMaWdodGJveCA9IHRoaXMuY2xvc2VMaWdodGJveC5iaW5kKHRoaXMpO1xuXHR0aGlzLmdvdG9OZXh0ID0gdGhpcy5nb3RvTmV4dC5iaW5kKHRoaXMpO1xuXHR0aGlzLmdvdG9QcmV2aW91cyA9IHRoaXMuZ290b1ByZXZpb3VzLmJpbmQodGhpcyk7XG5cdHRoaXMub3BlbkxpZ2h0Ym94ID0gdGhpcy5vcGVuTGlnaHRib3guYmluZCh0aGlzKTtcbiAgICB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcblx0dGhpcy5zZXRTdGF0ZSh7Y29udGFpbmVyV2lkdGg6IE1hdGguZmxvb3IoUmVhY3RET00uZmluZERPTU5vZGUodGhpcykuY2xpZW50V2lkdGgpfSlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICB9XG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdGlmIChSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5jbGllbnRXaWR0aCAhPT0gdGhpcy5zdGF0ZS5jb250YWluZXJXaWR0aCl7XG5cdCAgICB0aGlzLnNldFN0YXRlKHtjb250YWluZXJXaWR0aDogTWF0aC5mbG9vcihSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5jbGllbnRXaWR0aCl9KTtcblx0fVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXHQgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplLCBmYWxzZSk7XG4gICAgfVxuICAgIGhhbmRsZVJlc2l6ZShlKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29udGFpbmVyV2lkdGg6IE1hdGguZmxvb3IoUmVhY3RET00uZmluZERPTU5vZGUodGhpcykuY2xpZW50V2lkdGgpfSk7XG4gICAgfVxuICAgIG9wZW5MaWdodGJveChpbmRleCwgZXZlbnQpe1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcblx0ICAgIGN1cnJlbnRJbWFnZTogaW5kZXgsXG4gICAgICAgICAgICBsaWdodGJveElzT3BlbjogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2xvc2VMaWdodGJveCgpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcblx0ICAgIGN1cnJlbnRJbWFnZTogMCxcbiAgICAgICAgICAgIGxpZ2h0Ym94SXNPcGVuOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdvdG9QcmV2aW91cygpe1xuXHR0aGlzLnNldFN0YXRlKHtcblx0ICAgIGN1cnJlbnRJbWFnZTogdGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2UgLSAxLFxuXHR9KTtcbiAgICB9XG4gICAgZ290b05leHQoKXtcblx0dGhpcy5zZXRTdGF0ZSh7XG5cdCAgICBjdXJyZW50SW1hZ2U6IHRoaXMuc3RhdGUuY3VycmVudEltYWdlICsgMSxcblx0fSk7XG4gICAgfVxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIgcm93TGltaXQgPSAxLFxuICAgICAgICAgICAgcGhvdG9QcmV2aWV3Tm9kZXMgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29udGFpbmVyV2lkdGggPj0gNDgwKXtcbiAgICAgICAgICAgIHJvd0xpbWl0ID0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb250YWluZXJXaWR0aCA+PSAxMDI0KXtcbiAgICAgICAgICAgIHJvd0xpbWl0ID0gMztcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29udFdpZHRoID0gdGhpcy5zdGF0ZS5jb250YWluZXJXaWR0aCAtIChyb3dMaW1pdCAqIDQpOyAvKiA0cHggZm9yIG1hcmdpbiBhcm91bmQgZWFjaCBpbWFnZSovXG4gICAgICAgIGNvbnRXaWR0aCA9IE1hdGguZmxvb3IoY29udFdpZHRoIC0gMik7IC8vIGFkZCBzb21lIHBhZGRpbmcgdG8gcHJldmVudCBsYXlvdXQgcHJvYlxuXHR2YXIgbGlnaHRib3hJbWFnZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaT0wO2k8dGhpcy5wcm9wcy5waG90b3MubGVuZ3RoO2krPXJvd0xpbWl0KXtcbiAgICAgICAgICAgIHZhciByb3dJdGVtcyA9IFtdO1xuICAgICAgICAgICAgLy8gbG9vcCB0aHJ1IGVhY2ggc2V0IG9mIHJvd0xpbWl0IG51bVxuICAgICAgICAgICAgLy8gZWcuIGlmIHJvd0xpbWl0IGlzIDMgaXQgd2lsbCAgbG9vcCB0aHJ1IDAsMSwyLCB0aGVuIDMsNCw1IHRvIHBlcmZvcm0gY2FsY3VsYXRpb25zIGZvciB0aGUgcGFydGljdWxhciBzZXRcbiAgICAgICAgICAgIHZhciBhc3BlY3RSYXRpbz0wLFxuICAgICAgICAgICAgICAgIHRvdGFsQXI9MCxcbiAgICAgICAgICAgICAgICBjb21tb25IZWlnaHQgPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaj1pOyBqPGkrcm93TGltaXQ7IGorKyl7XG4gICAgICAgICAgICAgICAgaWYgKGogPT0gdGhpcy5wcm9wcy5waG90b3MubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXHRcdHRvdGFsQXIgKz0gdGhpcy5wcm9wcy5waG90b3Nbal0uYXNwZWN0UmF0aW87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb21tb25IZWlnaHQgPSBjb250V2lkdGggLyB0b3RhbEFyO1xuICAgICAgICAgICAgLy8gcnVuIHRocnUgdGhlIHNhbWUgc2V0IG9mIGl0ZW1zIGFnYWluIHRvIGdpdmUgdGhlIGNvbW1vbiBoZWlnaHRcbiAgICAgICAgICAgIGZvciAodmFyIGs9aTsgazxpK3Jvd0xpbWl0OyBrKyspe1xuICAgICAgICAgICAgICAgIGlmIChrID09IHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblx0XHRsaWdodGJveEltYWdlcy5wdXNoKHRoaXMucHJvcHMucGhvdG9zW2tdLmxpZ2h0Ym94SW1hZ2UpO1xuXHRcdHZhciBzcmMgPSB0aGlzLnByb3BzLnBob3Rvc1trXS5zcmM7XG4gICAgICAgICAgICAgICAgcGhvdG9QcmV2aWV3Tm9kZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtrfSBzdHlsZT17c3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9e2t9IG9uQ2xpY2s9e3RoaXMub3BlbkxpZ2h0Ym94LmJpbmQodGhpcywgayl9PjxpbWcgc3JjPXtzcmN9IHN0eWxlPXt7ZGlzcGxheTonYmxvY2snLCBib3JkZXI6MH19IGhlaWdodD17Y29tbW9uSGVpZ2h0fSB3aWR0aD17Y29tbW9uSGVpZ2h0ICogdGhpcy5wcm9wcy5waG90b3Nba10uYXNwZWN0UmF0aW99IGFsdD1cIlwiIC8+PC9hPlxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXHRyZXR1cm4oXG4gICAgICAgICAgICA8ZGl2IGlkPVwiR2FsbGVyeVwiIGNsYXNzTmFtZT1cImNsZWFyZml4XCI+XG4gICAgICAgICAgICAgICAge3Bob3RvUHJldmlld05vZGVzfVxuICAgICAgICAgICAgICAgIDxMaWdodGJveFxuXHRcdCAgICBjdXJyZW50SW1hZ2U9e3RoaXMuc3RhdGUuY3VycmVudEltYWdlfVxuICAgICAgICAgICAgICAgICAgICBpbWFnZXM9e2xpZ2h0Ym94SW1hZ2VzfVxuICAgICAgICAgICAgICAgICAgICBpc09wZW49e3RoaXMuc3RhdGUubGlnaHRib3hJc09wZW59XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuY2xvc2VMaWdodGJveH1cblx0XHQgICAgb25DbGlja1ByZXY9e3RoaXMuZ290b1ByZXZpb3VzfVxuXHRcdCAgICBvbkNsaWNrTmV4dD17dGhpcy5nb3RvTmV4dH1cbiAgICAgICAgICAgICAgICAgICAgd2lkdGg9ezE2MDB9XG5cdFx0ICAgIHNob3dJbWFnZUNvdW50PXt0aGlzLnByb3BzLmxpZ2h0Ym94U2hvd0ltYWdlQ291bnR9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn07XG5HYWxsZXJ5LmRpc3BsYXlOYW1lID0gJ0dhbGxlcnknO1xuR2FsbGVyeS5wcm9wVHlwZXMgPSB7XG4gICAgcGhvdG9zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcblx0UmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcblx0ICAgIHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHQgICAgd2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0ICAgIGhlaWdodDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHQgICAgYXNwZWN0UmF0aW86IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0ICAgIGxpZ2h0Ym94SW1hZ2U6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuXHR9KVxuICAgICkuaXNSZXF1aXJlZCxcbn07XG5HYWxsZXJ5LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBsaWdodGJveFNob3dJbWFnZUNvdW50OiBmYWxzZVxufVxuLy8gR2FsbGVyeSBpbWFnZSBzdHlsZVxuY29uc3Qgc3R5bGUgPSB7XG4gICBkaXNwbGF5OiAnYmxvY2snLFxuICAgbWFyZ2luOiAyLFxuICAgYmFja2dyb3VuZENvbG9yOicjZTNlM2UzJyxcbiAgIGZsb2F0OiAnbGVmdCdcbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FsbGVyeTtcbiJdfQ==
