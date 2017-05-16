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
                photoPreviewNodes = [],
                contWidth = this.state.containerWidth - cols * (this.props.margin * 2);

            contWidth = Math.floor(contWidth); // add some padding to prevent layout prob
            var remainder = this.props.photos.length % cols;
            if (remainder) {
                // there are fewer photos than cols num in last row
                var lastRowWidth = Math.floor(this.state.containerWidth / cols * remainder - remainder * (this.props.margin * 2));
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

                    var src = _this.props.photos[k].src,
                        srcset = undefined,
                        sizes = undefined;
                    if (_this.props.photos[k].srcset) {
                        srcset = _this.props.photos[k].srcset.join();
                    }
                    if (_this.props.photos[k].sizes) {
                        sizes = _this.props.photos[k].sizes.join();
                    }

                    style.margin = _this.props.margin;
                    photoPreviewNodes.push(_react2['default'].createElement(
                        'div',
                        { key: k, style: style },
                        _react2['default'].createElement(
                            'a',
                            { href: '#', className: k, onClick: function (e) {
                                    return _this.props.onClickPhoto(k, e);
                                } },
                            _react2['default'].createElement('img', { src: src, srcSet: srcset, sizes: sizes, style: { display: 'block', border: 0 }, height: commonHeight, width: commonHeight * _this.props.photos[k].aspectRatio, alt: _this.props.photos[k].alt })
                        )
                    ));
                };

                for (var k = i; k < i + cols; k++) {
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

            return _react2['default'].createElement(
                'div',
                { id: 'Gallery', className: 'clearfix', ref: function (c) {
                        return _this2._gallery = c;
                    } },
                photoPreviewNodes
            );
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
            height: _react2['default'].PropTypes.number.isRequired,
            alt: _react2['default'].PropTypes.string,
            srcset: _react2['default'].PropTypes.array,
            sizes: _react2['default'].PropTypes.array
        })).isRequired.apply(this, arguments);
    },
    onClickPhoto: _react2['default'].PropTypes.func,
    cols: _react2['default'].PropTypes.number,
    margin: _react2['default'].PropTypes.number
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

},{"react":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvb2N0YXZpYS9kZXYvcmVhY3QtcGhvdG8tZ2FsbGVyeS9zcmMvR2FsbGVyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDQWtCLE9BQU87Ozs7SUFFbkIsT0FBTztjQUFQLE9BQU87O0FBQ0UsYUFEVCxPQUFPLEdBQ0k7OEJBRFgsT0FBTzs7QUFFWixtQ0FGSyxPQUFPLDZDQUVKO0FBQ1IsWUFBSSxDQUFDLEtBQUssR0FBRztBQUNULDBCQUFjLEVBQUUsQ0FBQztTQUNwQixDQUFDO0FBQ0YsWUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM3Qzs7aUJBUEMsT0FBTzs7ZUFRUSw2QkFBRTtBQUN0QixnQkFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUMsQ0FBQyxDQUFBO0FBQy9ELGtCQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN4RDs7O2VBQ2lCLDhCQUFFO0FBQ3ZCLGdCQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFDO0FBQ3hELG9CQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBQyxDQUFDLENBQUM7YUFDMUU7U0FDRzs7O2VBQ21CLGdDQUFFO0FBQ3hCLGtCQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDNUQ7OztlQUNXLHNCQUFD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QkFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQzlCLFNBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNmO0FBQ0QsVUFBTSxFQUFFLENBQUM7Q0FDWixDQUFBOztBQUVELElBQU0sS0FBSyxHQUFHO0FBQ1gsV0FBTyxFQUFFLE9BQU87QUFDaEIsbUJBQWUsRUFBQyxTQUFTO0FBQ3pCLFNBQUssRUFBRSxNQUFNO0NBQ2YsQ0FBQTs7cUJBRWMsT0FBTyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBHYWxsZXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKCl7XG5cdHN1cGVyKCk7XG5cdHRoaXMuc3RhdGUgPSB7XG5cdCAgICBjb250YWluZXJXaWR0aDogMFxuXHR9O1xuXHR0aGlzLmhhbmRsZVJlc2l6ZSA9IHRoaXMuaGFuZGxlUmVzaXplLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG5cdHRoaXMuc2V0U3RhdGUoe2NvbnRhaW5lcldpZHRoOiBNYXRoLmZsb29yKHRoaXMuX2dhbGxlcnkuY2xpZW50V2lkdGgpfSlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICB9XG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdGlmICh0aGlzLl9nYWxsZXJ5LmNsaWVudFdpZHRoICE9PSB0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoKXtcblx0ICAgIHRoaXMuc2V0U3RhdGUoe2NvbnRhaW5lcldpZHRoOiBNYXRoLmZsb29yKHRoaXMuX2dhbGxlcnkuY2xpZW50V2lkdGgpfSk7XG5cdH1cbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSwgZmFsc2UpO1xuICAgIH1cbiAgICBoYW5kbGVSZXNpemUoZSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbnRhaW5lcldpZHRoOiBNYXRoLmZsb29yKHRoaXMuX2dhbGxlcnkuY2xpZW50V2lkdGgpfSk7XG4gICAgfVxuICAgIHJlbmRlcigpe1xuICAgICAgICBsZXQgY29scyA9IHRoaXMucHJvcHMuY29scyxcbiAgICAgICAgICAgIHBob3RvUHJldmlld05vZGVzID0gW10sXG5cdCAgICBjb250V2lkdGggPSB0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoIC0gKGNvbHMgKiAodGhpcy5wcm9wcy5tYXJnaW4gKiAyKSk7IFxuXG4gICAgICAgIGNvbnRXaWR0aCA9IE1hdGguZmxvb3IoY29udFdpZHRoKTsgLy8gYWRkIHNvbWUgcGFkZGluZyB0byBwcmV2ZW50IGxheW91dCBwcm9iXG4gICAgICAgIHZhciByZW1haW5kZXIgPSB0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGggJSBjb2xzO1xuICAgICAgICBpZiAocmVtYWluZGVyKSB7IC8vIHRoZXJlIGFyZSBmZXdlciBwaG90b3MgdGhhbiBjb2xzIG51bSBpbiBsYXN0IHJvd1xuICAgICAgICAgIHZhciBsYXN0Um93V2lkdGggPSBNYXRoLmZsb29yKCAoKHRoaXMuc3RhdGUuY29udGFpbmVyV2lkdGggLyBjb2xzKSAqIHJlbWFpbmRlcikgLSAocmVtYWluZGVyICogKHRoaXMucHJvcHMubWFyZ2luICogMikpICk7XG4gICAgICAgICAgdmFyIGxhc3RSb3dJbmRleCA9IHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aCAtIHJlbWFpbmRlcjtcbiAgICAgICAgfVxuICAgICAgICAvLyBsb29wIHRocnUgZWFjaCBzZXQgb2YgIGNvbHMgbnVtXG4gICAgICAgIC8vIGVnLiBpZiBjb2xzIGlzIDMgaXQgd2lsbCAgbG9vcCB0aHJ1IDAsMSwyLCB0aGVuIDMsNCw1IHRvIHBlcmZvcm0gY2FsY3VsYXRpb25zIGZvciB0aGUgcGFydGljdWxhciBzZXRcbiAgICAgICAgZm9yICh2YXIgaT0wO2k8dGhpcy5wcm9wcy5waG90b3MubGVuZ3RoO2krPWNvbHMpe1xuICAgICAgICAgICAgdmFyIHRvdGFsQXI9MCxcbiAgICAgICAgICAgIGNvbW1vbkhlaWdodCA9IDA7XG5cblx0ICAgIC8vIGdldCB0aGUgdG90YWwgYXNwZWN0IHJhdGlvIG9mIHRoZSByb3dcbiAgICAgICAgICAgIGZvciAodmFyIGo9aTsgajxpK2NvbHM7IGorKyl7XG4gICAgICAgICAgICAgICAgaWYgKGogPT0gdGhpcy5wcm9wcy5waG90b3MubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXHRcdHRoaXMucHJvcHMucGhvdG9zW2pdLmFzcGVjdFJhdGlvID0gdGhpcy5wcm9wcy5waG90b3Nbal0ud2lkdGggLyB0aGlzLnByb3BzLnBob3Rvc1tqXS5oZWlnaHQ7XHRcblx0XHR0b3RhbEFyICs9IHRoaXMucHJvcHMucGhvdG9zW2pdLmFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPT09IGxhc3RSb3dJbmRleCkge1xuICAgICAgICAgICAgICBjb21tb25IZWlnaHQgPSBsYXN0Um93V2lkdGggLyB0b3RhbEFyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29tbW9uSGVpZ2h0ID0gY29udFdpZHRoIC8gdG90YWxBcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHJ1biB0aHJ1IHRoZSBzYW1lIHNldCBvZiBpdGVtcyBhZ2FpbiB0byBnaXZlIHRoZSB3aWR0aCBhbmQgY29tbW9uIGhlaWdodFxuICAgICAgICAgICAgZm9yIChsZXQgaz1pOyBrPGkrY29sczsgaysrKXtcbiAgICAgICAgICAgICAgICBpZiAoayA9PSB0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cblx0XHRsZXQgc3JjID0gdGhpcy5wcm9wcy5waG90b3Nba10uc3JjLCBzcmNzZXQsIHNpemVzO1xuXHRcdGlmICh0aGlzLnByb3BzLnBob3Rvc1trXS5zcmNzZXQpe1xuXHRcdCAgICBzcmNzZXQgPSB0aGlzLnByb3BzLnBob3Rvc1trXS5zcmNzZXQuam9pbigpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5wcm9wcy5waG90b3Nba10uc2l6ZXMpe1xuXHRcdCAgICBzaXplcyA9IHRoaXMucHJvcHMucGhvdG9zW2tdLnNpemVzLmpvaW4oKTtcblx0XHR9XG5cblx0XHRzdHlsZS5tYXJnaW4gPSB0aGlzLnByb3BzLm1hcmdpbjtcblx0XHRwaG90b1ByZXZpZXdOb2Rlcy5wdXNoKFxuXHRcdCAgICA8ZGl2IGtleT17a30gc3R5bGU9e3N0eWxlfT5cblx0XHRcdDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPXtrfSBvbkNsaWNrPXsoZSkgPT4gdGhpcy5wcm9wcy5vbkNsaWNrUGhvdG8oaywgZSl9PlxuXHRcdFx0ICAgIDxpbWcgc3JjPXtzcmN9IHNyY1NldD17c3Jjc2V0fSBzaXplcz17c2l6ZXN9IHN0eWxlPXt7ZGlzcGxheTonYmxvY2snLCBib3JkZXI6MH19IGhlaWdodD17Y29tbW9uSGVpZ2h0fSB3aWR0aD17Y29tbW9uSGVpZ2h0ICogdGhpcy5wcm9wcy5waG90b3Nba10uYXNwZWN0UmF0aW99IGFsdD17dGhpcy5wcm9wcy5waG90b3Nba10uYWx0fSAvPlxuXHRcdFx0PC9hPlxuXHRcdCAgICA8L2Rpdj5cblx0XHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdHJldHVybihcblx0ICAgIHRoaXMucmVuZGVyR2FsbGVyeShwaG90b1ByZXZpZXdOb2RlcylcbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyR2FsbGVyeShwaG90b1ByZXZpZXdOb2Rlcyl7XG5cdHJldHVybihcblx0ICAgIDxkaXYgaWQ9XCJHYWxsZXJ5XCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIiByZWY9eyhjKSA9PiB0aGlzLl9nYWxsZXJ5ID0gY30+XG5cdFx0e3Bob3RvUHJldmlld05vZGVzfVxuXHQgICAgPC9kaXY+XG5cdCk7XG4gICAgfVxufTtcbkdhbGxlcnkuZGlzcGxheU5hbWUgPSAnR2FsbGVyeSc7XG5HYWxsZXJ5LnByb3BUeXBlcyA9IHtcbiAgICBwaG90b3M6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSl7XG5cdHJldHVybiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcblx0ICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG5cdFx0c3JjOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0d2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0XHRoZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0XHRhbHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdFx0c3Jjc2V0OiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG5cdFx0c2l6ZXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheVxuXHQgICAgfSlcblx0KS5pc1JlcXVpcmVkLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIG9uQ2xpY2tQaG90bzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgY29sczogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICBtYXJnaW46IFJlYWN0LlByb3BUeXBlcy5udW1iZXJcbn07XG5HYWxsZXJ5LmRlZmF1bHRQcm9wcyA9IHtcbiAgICBjb2xzOiAzLCBcbiAgICBvbkNsaWNrUGhvdG86IGZ1bmN0aW9uKGssZSl7XG5cdGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9LFxuICAgIG1hcmdpbjogMlxufVxuLy8gR2FsbGVyeSBpbWFnZSBzdHlsZVxuY29uc3Qgc3R5bGUgPSB7XG4gICBkaXNwbGF5OiAnYmxvY2snLFxuICAgYmFja2dyb3VuZENvbG9yOicjZTNlM2UzJyxcbiAgIGZsb2F0OiAnbGVmdCdcbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FsbGVyeTtcbiJdfQ==
