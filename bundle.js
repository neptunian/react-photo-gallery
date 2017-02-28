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
        key: 'render',
        value: function render() {
            var _this = this;

            var cols = this.props.cols,
                photoPreviewNodes = [];
            if (!this.props.cols) {
                cols = 3;
            }
            var contWidth = this.state.containerWidth - cols * 4; /* 4px for margin around each image*/
            contWidth = Math.floor(contWidth - 2); // add some padding to prevent layout prob
            var remainder = this.props.photos.length % cols;
            if (remainder) {
                // there are fewer than photos in last row
                var lastRowWidth = Math.floor(this.state.containerWidth - remainder * 4 - 2);
                var lastRowIndex = this.props.photos.length - remainder;
            }
            //var lightboxImages = [];
            // loop thru each set of  cols num
            // eg. if cols is 3 it will  loop thru 0,1,2, then 3,4,5 to perform calculations for the particular set
            for (var i = 0; i < this.props.photos.length; i += cols) {
                var totalAr = 0,
                    commonHeight = 0;

                // get the total aspect ratio of the row
                for (var j = i; j < i + cols; j++) {
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

                var _loop = function (k) {
                    if (k == _this.props.photos.length) {
                        return 'break';
                    }
                    src = _this.props.photos[k].src;

                    if (_this.props.onClickPhoto) {
                        photoPreviewNodes.push(_react2['default'].createElement(
                            'div',
                            { key: k, style: style },
                            _react2['default'].createElement(
                                'a',
                                { href: '#', className: k, onClick: function (e) {
                                        return _this.props.onClickPhoto(k, e);
                                    } },
                                _react2['default'].createElement('img', { src: src, style: { display: 'block', border: 0 }, height: commonHeight, width: commonHeight * _this.props.photos[k].aspectRatio, alt: '' })
                            )
                        ));
                    } else {
                        photoPreviewNodes.push(_react2['default'].createElement(
                            'div',
                            { key: k, style: style },
                            _react2['default'].createElement('img', { src: src, style: { display: 'block', border: 0 }, height: commonHeight, width: commonHeight * _this.props.photos[k].aspectRatio, alt: '' })
                        ));
                    }
                };

                for (var k = i; k < i + cols; k++) {
                    var src;

                    var _ret = _loop(k);

                    if (_ret === 'break') break;
                }
            }
            return this.renderGallery(photoPreviewNodes);
        }
    }, {
        key: 'renderGallery',
        value: function renderGallery(photoPreviewNodes) {
            var _this2 = this;

            if (this.props.disableLightbox) {
                return _react2['default'].createElement(
                    'div',
                    { id: 'Gallery', className: 'clearfix', ref: function (c) {
                            return _this2._gallery = c;
                        } },
                    photoPreviewNodes
                );
            } else {
                return _react2['default'].createElement(
                    'div',
                    { id: 'Gallery', className: 'clearfix', ref: function (c) {
                            return _this2._gallery = c;
                        } },
                    photoPreviewNodes
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
        return _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
            src: _react2['default'].PropTypes.string.isRequired,
            width: _react2['default'].PropTypes.number.isRequired,
            height: _react2['default'].PropTypes.number.isRequired
        })).isRequired.apply(this, arguments);
    },
    onClickPhoto: _react2['default'].PropTypes.func,
    cols: _react2['default'].PropTypes.number
};
Gallery.defaultProps = {
    cols: 3
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

},{"react":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL29jdGF2aWEvZGV2L3JlYWN0LXBob3RvLWdhbGxlcnkvc3JjL0dhbGxlcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ0FrQixPQUFPOzs7O0lBRW5CLE9BQU87Y0FBUCxPQUFPOztBQUNFLGFBRFQsT0FBTyxHQUNJOzhCQURYLE9BQU87O0FBRVosbUNBRkssT0FBTyw2Q0FFSjtBQUNSLFlBQUksQ0FBQyxLQUFLLEdBQUc7QUFDVCwwQkFBYyxFQUFFLENBQUM7U0FDcEIsQ0FBQztBQUNGLFlBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDN0M7O2lCQVBDLE9BQU87O2VBUVEsNkJBQUU7QUFDdEIsZ0JBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQTtBQUMvRCxrQkFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDeEQ7OztlQUNpQiw4QkFBRTtBQUN2QixnQkFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBQztBQUN4RCxvQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUMsQ0FBQyxDQUFDO2FBQzFFO1NBQ0c7OztlQUNtQixnQ0FBRTtBQUN4QixrQkFBTSxDQUFDLG1CQUFtQixDQUFD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O0FBRUQsSUFBTSxLQUFLLEdBQUc7QUFDWCxXQUFPLEVBQUUsT0FBTztBQUNoQixVQUFNLEVBQUUsQ0FBQztBQUNULG1CQUFlLEVBQUMsU0FBUztBQUN6QixTQUFLLEVBQUUsTUFBTTtDQUNmLENBQUE7O3FCQUVjLE9BQU8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgR2FsbGVyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuXHRzdXBlcigpO1xuXHR0aGlzLnN0YXRlID0ge1xuXHQgICAgY29udGFpbmVyV2lkdGg6IDBcblx0fTtcblx0dGhpcy5oYW5kbGVSZXNpemUgPSB0aGlzLmhhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuXHR0aGlzLnNldFN0YXRlKHtjb250YWluZXJXaWR0aDogTWF0aC5mbG9vcih0aGlzLl9nYWxsZXJ5LmNsaWVudFdpZHRoKX0pXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XG4gICAgfVxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRpZiAodGhpcy5fZ2FsbGVyeS5jbGllbnRXaWR0aCAhPT0gdGhpcy5zdGF0ZS5jb250YWluZXJXaWR0aCl7XG5cdCAgICB0aGlzLnNldFN0YXRlKHtjb250YWluZXJXaWR0aDogTWF0aC5mbG9vcih0aGlzLl9nYWxsZXJ5LmNsaWVudFdpZHRoKX0pO1xuXHR9XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG5cdCB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUsIGZhbHNlKTtcbiAgICB9XG4gICAgaGFuZGxlUmVzaXplKGUpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb250YWluZXJXaWR0aDogTWF0aC5mbG9vcih0aGlzLl9nYWxsZXJ5LmNsaWVudFdpZHRoKX0pO1xuICAgIH1cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIGNvbHMgPSB0aGlzLnByb3BzLmNvbHMsXG4gICAgICAgICAgICBwaG90b1ByZXZpZXdOb2RlcyA9IFtdO1xuXHRpZiAoIXRoaXMucHJvcHMuY29scyl7XG5cdCAgIGNvbHMgPSAzOyAgICBcblx0fVxuICAgICAgICB2YXIgY29udFdpZHRoID0gdGhpcy5zdGF0ZS5jb250YWluZXJXaWR0aCAtIChjb2xzICogNCk7IC8qIDRweCBmb3IgbWFyZ2luIGFyb3VuZCBlYWNoIGltYWdlKi9cbiAgICAgICAgY29udFdpZHRoID0gTWF0aC5mbG9vcihjb250V2lkdGggLSAyKTsgLy8gYWRkIHNvbWUgcGFkZGluZyB0byBwcmV2ZW50IGxheW91dCBwcm9iXG4gICAgICAgIHZhciByZW1haW5kZXIgPSB0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGggJSBjb2xzO1xuICAgICAgICBpZiAocmVtYWluZGVyKSB7IC8vIHRoZXJlIGFyZSBmZXdlciB0aGFuIHBob3RvcyBpbiBsYXN0IHJvd1xuICAgICAgICAgIHZhciBsYXN0Um93V2lkdGggPSBNYXRoLmZsb29yKHRoaXMuc3RhdGUuY29udGFpbmVyV2lkdGggLSAocmVtYWluZGVyICogNCkgLSAyKTtcbiAgICAgICAgICB2YXIgbGFzdFJvd0luZGV4ID0gdGhpcy5wcm9wcy5waG90b3MubGVuZ3RoIC0gcmVtYWluZGVyO1xuICAgICAgICB9XG5cdC8vdmFyIGxpZ2h0Ym94SW1hZ2VzID0gW107XG4gICAgICAgIC8vIGxvb3AgdGhydSBlYWNoIHNldCBvZiAgY29scyBudW1cbiAgICAgICAgLy8gZWcuIGlmIGNvbHMgaXMgMyBpdCB3aWxsICBsb29wIHRocnUgMCwxLDIsIHRoZW4gMyw0LDUgdG8gcGVyZm9ybSBjYWxjdWxhdGlvbnMgZm9yIHRoZSBwYXJ0aWN1bGFyIHNldFxuICAgICAgICBmb3IgKHZhciBpPTA7aTx0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGg7aSs9Y29scyl7XG4gICAgICAgICAgICB2YXIgdG90YWxBcj0wLFxuICAgICAgICAgICAgY29tbW9uSGVpZ2h0ID0gMDtcblxuXHQgICAgLy8gZ2V0IHRoZSB0b3RhbCBhc3BlY3QgcmF0aW8gb2YgdGhlIHJvd1xuICAgICAgICAgICAgZm9yICh2YXIgaj1pOyBqPGkrY29sczsgaisrKXtcbiAgICAgICAgICAgICAgICBpZiAoaiA9PSB0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cdFx0dGhpcy5wcm9wcy5waG90b3Nbal0uYXNwZWN0UmF0aW8gPSB0aGlzLnByb3BzLnBob3Rvc1tqXS53aWR0aCAvIHRoaXMucHJvcHMucGhvdG9zW2pdLmhlaWdodDtcdFxuXHRcdHRvdGFsQXIgKz0gdGhpcy5wcm9wcy5waG90b3Nbal0uYXNwZWN0UmF0aW87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA9PT0gbGFzdFJvd0luZGV4KSB7XG4gICAgICAgICAgICAgIGNvbW1vbkhlaWdodCA9IGxhc3RSb3dXaWR0aCAvIHRvdGFsQXI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb21tb25IZWlnaHQgPSBjb250V2lkdGggLyB0b3RhbEFyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gcnVuIHRocnUgdGhlIHNhbWUgc2V0IG9mIGl0ZW1zIGFnYWluIHRvIGdpdmUgdGhlIHdpZHRoIGFuZCBjb21tb24gaGVpZ2h0XG4gICAgICAgICAgICBmb3IgKGxldCBrPWk7IGs8aStjb2xzOyBrKyspe1xuICAgICAgICAgICAgICAgIGlmIChrID09IHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblx0XHR2YXIgc3JjID0gdGhpcy5wcm9wcy5waG90b3Nba10uc3JjO1xuXHRcdGlmICh0aGlzLnByb3BzLm9uQ2xpY2tQaG90byl7XG5cdFx0ICAgIHBob3RvUHJldmlld05vZGVzLnB1c2goXG5cdFx0XHQgPGRpdiBrZXk9e2t9IHN0eWxlPXtzdHlsZX0+XG5cdFx0XHQgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9e2t9IG9uQ2xpY2s9eyhlKSA9PiB0aGlzLnByb3BzLm9uQ2xpY2tQaG90byhrLCBlKX0+PGltZyBzcmM9e3NyY30gc3R5bGU9e3tkaXNwbGF5OidibG9jaycsIGJvcmRlcjowfX0gaGVpZ2h0PXtjb21tb25IZWlnaHR9IHdpZHRoPXtjb21tb25IZWlnaHQgKiB0aGlzLnByb3BzLnBob3Rvc1trXS5hc3BlY3RSYXRpb30gYWx0PVwiXCIgLz48L2E+XG5cdFx0XHQgPC9kaXY+XG5cdFx0ICAgICk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0ICAgIHBob3RvUHJldmlld05vZGVzLnB1c2goXG5cdFx0XHQgPGRpdiBrZXk9e2t9IHN0eWxlPXtzdHlsZX0+XG5cdFx0XHQgICAgPGltZyBzcmM9e3NyY30gc3R5bGU9e3tkaXNwbGF5OidibG9jaycsIGJvcmRlcjowfX0gaGVpZ2h0PXtjb21tb25IZWlnaHR9IHdpZHRoPXtjb21tb25IZWlnaHQgKiB0aGlzLnByb3BzLnBob3Rvc1trXS5hc3BlY3RSYXRpb30gYWx0PVwiXCIgLz5cblx0XHRcdCA8L2Rpdj5cblx0XHQgICAgKTtcblx0XHR9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblx0cmV0dXJuKFxuXHQgICAgdGhpcy5yZW5kZXJHYWxsZXJ5KHBob3RvUHJldmlld05vZGVzKVxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJHYWxsZXJ5KHBob3RvUHJldmlld05vZGVzKXtcblx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZUxpZ2h0Ym94KXtcblx0ICAgIHJldHVybihcblx0XHQ8ZGl2IGlkPVwiR2FsbGVyeVwiIGNsYXNzTmFtZT1cImNsZWFyZml4XCIgcmVmPXsoYykgPT4gdGhpcy5fZ2FsbGVyeSA9IGN9PlxuXHRcdCAgICB7cGhvdG9QcmV2aWV3Tm9kZXN9XG5cdFx0PC9kaXY+XG5cdCAgICApO1xuXHR9XG5cdGVsc2V7XG5cdCAgICByZXR1cm4oXG5cdFx0PGRpdiBpZD1cIkdhbGxlcnlcIiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiIHJlZj17KGMpID0+IHRoaXMuX2dhbGxlcnkgPSBjfT5cblx0XHQgICAge3Bob3RvUHJldmlld05vZGVzfVxuXHRcdDwvZGl2PlxuXHQgICAgKTtcblx0fVxuICAgIH1cbn07XG5HYWxsZXJ5LmRpc3BsYXlOYW1lID0gJ0dhbGxlcnknO1xuR2FsbGVyeS5wcm9wVHlwZXMgPSB7XG4gICAgcGhvdG9zOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpe1xuXHRyZXR1cm4gUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG5cdCAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuXHRcdHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdHdpZHRoOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cdFx0aGVpZ2h0OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cdCAgICB9KVxuXHQpLmlzUmVxdWlyZWQuYXBwbHkodGhpcyxhcmd1bWVudHMpO1xuICAgIH0sXG4gICAgb25DbGlja1Bob3RvOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBjb2xzOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXG59O1xuR2FsbGVyeS5kZWZhdWx0UHJvcHMgPSB7XG4gICAgY29sczogM1xufVxuLy8gR2FsbGVyeSBpbWFnZSBzdHlsZVxuY29uc3Qgc3R5bGUgPSB7XG4gICBkaXNwbGF5OiAnYmxvY2snLFxuICAgbWFyZ2luOiAyLFxuICAgYmFja2dyb3VuZENvbG9yOicjZTNlM2UzJyxcbiAgIGZsb2F0OiAnbGVmdCdcbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FsbGVyeTtcbiJdfQ==
