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