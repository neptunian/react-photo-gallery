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
            var contWidth = this.state.containerWidth - cols * 4; /* 4px for margin around each image*/
            contWidth = Math.floor(contWidth); // add some padding to prevent layout prob
            var remainder = this.props.photos.length % cols;
            if (remainder) {
                // there are fewer photos than cols num in last row
                var lastRowWidth = Math.floor(this.state.containerWidth / cols * remainder - remainder * 4);
                var lastRowIndex = this.props.photos.length - remainder;
            }
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvb2N0YXZpYS9kZXYvcmVhY3QtcGhvdG8tZ2FsbGVyeS9zcmMvR2FsbGVyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDQWtCLE9BQU87Ozs7SUFFbkIsT0FBTztjQUFQLE9BQU87O0FBQ0UsYUFEVCxPQUFPLEdBQ0k7OEJBRFgsT0FBTzs7QUFFWixtQ0FGSyxPQUFPLDZDQUVKO0FBQ1IsWUFBSSxDQUFDLEtBQUssR0FBRztBQUNULDBCQUFjLEVBQUUsQ0FBQztTQUNwQixDQUFDO0FBQ0YsWUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM3Qzs7aUJBUEMsT0FBTzs7ZUFRUSw2QkFBRTtBQUN0QixnQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUMsQ0FBQyxDQUFBO0FBQy9ELGtCQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN4RDs7O2VBQ2lCLDhCQUFFO0FBQ3ZCLGdCQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFDO0FBQ3hELG9CQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBQyxDQUFDLENBQUM7YUFDMUU7U0FDRzs7O2VBQ21CLGdDQUFFO0FBQ3hCLGtCQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDNUQ7OztlQUNXLHNCQUFD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OiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBHYWxsZXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKCl7XG5cdHN1cGVyKCk7XG5cdHRoaXMuc3RhdGUgPSB7XG5cdCAgICBjb250YWluZXJXaWR0aDogMFxuXHR9O1xuXHR0aGlzLmhhbmRsZVJlc2l6ZSA9IHRoaXMuaGFuZGxlUmVzaXplLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG5cdHRoaXMuc2V0U3RhdGUoe2NvbnRhaW5lcldpZHRoOiBNYXRoLmZsb29yKHRoaXMuX2dhbGxlcnkuY2xpZW50V2lkdGgpfSlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICB9XG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdGlmICh0aGlzLl9nYWxsZXJ5LmNsaWVudFdpZHRoICE9PSB0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoKXtcblx0ICAgIHRoaXMuc2V0U3RhdGUoe2NvbnRhaW5lcldpZHRoOiBNYXRoLmZsb29yKHRoaXMuX2dhbGxlcnkuY2xpZW50V2lkdGgpfSk7XG5cdH1cbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSwgZmFsc2UpO1xuICAgIH1cbiAgICBoYW5kbGVSZXNpemUoZSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbnRhaW5lcldpZHRoOiBNYXRoLmZsb29yKHRoaXMuX2dhbGxlcnkuY2xpZW50V2lkdGgpfSk7XG4gICAgfVxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIgY29scyA9IHRoaXMucHJvcHMuY29scyxcbiAgICAgICAgICAgIHBob3RvUHJldmlld05vZGVzID0gW107XG4gICAgICAgIHZhciBjb250V2lkdGggPSB0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoIC0gKGNvbHMgKiA0KTsgLyogNHB4IGZvciBtYXJnaW4gYXJvdW5kIGVhY2ggaW1hZ2UqL1xuICAgICAgICBjb250V2lkdGggPSBNYXRoLmZsb29yKGNvbnRXaWR0aCk7IC8vIGFkZCBzb21lIHBhZGRpbmcgdG8gcHJldmVudCBsYXlvdXQgcHJvYlxuICAgICAgICB2YXIgcmVtYWluZGVyID0gdGhpcy5wcm9wcy5waG90b3MubGVuZ3RoICUgY29scztcbiAgICAgICAgaWYgKHJlbWFpbmRlcikgeyAvLyB0aGVyZSBhcmUgZmV3ZXIgcGhvdG9zIHRoYW4gY29scyBudW0gaW4gbGFzdCByb3dcbiAgICAgICAgICB2YXIgbGFzdFJvd1dpZHRoID0gTWF0aC5mbG9vciggKCh0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoIC8gY29scykgKiByZW1haW5kZXIpIC0gKHJlbWFpbmRlciAqIDQpICk7XG4gICAgICAgICAgdmFyIGxhc3RSb3dJbmRleCA9IHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aCAtIHJlbWFpbmRlcjtcbiAgICAgICAgfVxuICAgICAgICAvLyBsb29wIHRocnUgZWFjaCBzZXQgb2YgIGNvbHMgbnVtXG4gICAgICAgIC8vIGVnLiBpZiBjb2xzIGlzIDMgaXQgd2lsbCAgbG9vcCB0aHJ1IDAsMSwyLCB0aGVuIDMsNCw1IHRvIHBlcmZvcm0gY2FsY3VsYXRpb25zIGZvciB0aGUgcGFydGljdWxhciBzZXRcbiAgICAgICAgZm9yICh2YXIgaT0wO2k8dGhpcy5wcm9wcy5waG90b3MubGVuZ3RoO2krPWNvbHMpe1xuICAgICAgICAgICAgdmFyIHRvdGFsQXI9MCxcbiAgICAgICAgICAgIGNvbW1vbkhlaWdodCA9IDA7XG5cblx0ICAgIC8vIGdldCB0aGUgdG90YWwgYXNwZWN0IHJhdGlvIG9mIHRoZSByb3dcbiAgICAgICAgICAgIGZvciAodmFyIGo9aTsgajxpK2NvbHM7IGorKyl7XG4gICAgICAgICAgICAgICAgaWYgKGogPT0gdGhpcy5wcm9wcy5waG90b3MubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXHRcdHRoaXMucHJvcHMucGhvdG9zW2pdLmFzcGVjdFJhdGlvID0gdGhpcy5wcm9wcy5waG90b3Nbal0ud2lkdGggLyB0aGlzLnByb3BzLnBob3Rvc1tqXS5oZWlnaHQ7XHRcblx0XHR0b3RhbEFyICs9IHRoaXMucHJvcHMucGhvdG9zW2pdLmFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPT09IGxhc3RSb3dJbmRleCkge1xuICAgICAgICAgICAgICBjb21tb25IZWlnaHQgPSBsYXN0Um93V2lkdGggLyB0b3RhbEFyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29tbW9uSGVpZ2h0ID0gY29udFdpZHRoIC8gdG90YWxBcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHJ1biB0aHJ1IHRoZSBzYW1lIHNldCBvZiBpdGVtcyBhZ2FpbiB0byBnaXZlIHRoZSB3aWR0aCBhbmQgY29tbW9uIGhlaWdodFxuICAgICAgICAgICAgZm9yIChsZXQgaz1pOyBrPGkrY29sczsgaysrKXtcbiAgICAgICAgICAgICAgICBpZiAoayA9PSB0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cdFx0dmFyIHNyYyA9IHRoaXMucHJvcHMucGhvdG9zW2tdLnNyYztcblx0XHRpZiAodGhpcy5wcm9wcy5vbkNsaWNrUGhvdG8pe1xuXHRcdCAgICBwaG90b1ByZXZpZXdOb2Rlcy5wdXNoKFxuXHRcdFx0IDxkaXYga2V5PXtrfSBzdHlsZT17c3R5bGV9PlxuXHRcdFx0ICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPXtrfSBvbkNsaWNrPXsoZSkgPT4gdGhpcy5wcm9wcy5vbkNsaWNrUGhvdG8oaywgZSl9PjxpbWcgc3JjPXtzcmN9IHN0eWxlPXt7ZGlzcGxheTonYmxvY2snLCBib3JkZXI6MH19IGhlaWdodD17Y29tbW9uSGVpZ2h0fSB3aWR0aD17Y29tbW9uSGVpZ2h0ICogdGhpcy5wcm9wcy5waG90b3Nba10uYXNwZWN0UmF0aW99IGFsdD1cIlwiIC8+PC9hPlxuXHRcdFx0IDwvZGl2PlxuXHRcdCAgICApO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdCAgICBwaG90b1ByZXZpZXdOb2Rlcy5wdXNoKFxuXHRcdFx0IDxkaXYga2V5PXtrfSBzdHlsZT17c3R5bGV9PlxuXHRcdFx0ICAgIDxpbWcgc3JjPXtzcmN9IHN0eWxlPXt7ZGlzcGxheTonYmxvY2snLCBib3JkZXI6MH19IGhlaWdodD17Y29tbW9uSGVpZ2h0fSB3aWR0aD17Y29tbW9uSGVpZ2h0ICogdGhpcy5wcm9wcy5waG90b3Nba10uYXNwZWN0UmF0aW99IGFsdD1cIlwiIC8+XG5cdFx0XHQgPC9kaXY+XG5cdFx0ICAgICk7XG5cdFx0fVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdHJldHVybihcblx0ICAgIHRoaXMucmVuZGVyR2FsbGVyeShwaG90b1ByZXZpZXdOb2RlcylcbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyR2FsbGVyeShwaG90b1ByZXZpZXdOb2Rlcyl7XG5cdGlmICh0aGlzLnByb3BzLmRpc2FibGVMaWdodGJveCl7XG5cdCAgICByZXR1cm4oXG5cdFx0PGRpdiBpZD1cIkdhbGxlcnlcIiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiIHJlZj17KGMpID0+IHRoaXMuX2dhbGxlcnkgPSBjfT5cblx0XHQgICAge3Bob3RvUHJldmlld05vZGVzfVxuXHRcdDwvZGl2PlxuXHQgICAgKTtcblx0fVxuXHRlbHNle1xuXHQgICAgcmV0dXJuKFxuXHRcdDxkaXYgaWQ9XCJHYWxsZXJ5XCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIiByZWY9eyhjKSA9PiB0aGlzLl9nYWxsZXJ5ID0gY30+XG5cdFx0ICAgIHtwaG90b1ByZXZpZXdOb2Rlc31cblx0XHQ8L2Rpdj5cblx0ICAgICk7XG5cdH1cbiAgICB9XG59O1xuR2FsbGVyeS5kaXNwbGF5TmFtZSA9ICdHYWxsZXJ5JztcbkdhbGxlcnkucHJvcFR5cGVzID0ge1xuICAgIHBob3RvczogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKXtcblx0cmV0dXJuIFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuXHQgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcblx0XHRzcmM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHR3aWR0aDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHRcdGhlaWdodDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHQgICAgfSlcblx0KS5pc1JlcXVpcmVkLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIG9uQ2xpY2tQaG90bzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgY29sczogUmVhY3QuUHJvcFR5cGVzLm51bWJlclxufTtcbkdhbGxlcnkuZGVmYXVsdFByb3BzID0ge1xuICAgIGNvbHM6IDNcbn1cbi8vIEdhbGxlcnkgaW1hZ2Ugc3R5bGVcbmNvbnN0IHN0eWxlID0ge1xuICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgIG1hcmdpbjogMixcbiAgIGJhY2tncm91bmRDb2xvcjonI2UzZTNlMycsXG4gICBmbG9hdDogJ2xlZnQnXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbGxlcnk7XG4iXX0=
