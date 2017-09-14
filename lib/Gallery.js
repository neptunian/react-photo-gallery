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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Photo = require('./Photo');

var _Photo2 = _interopRequireDefault(_Photo);

var _utils = require('./utils');

var Gallery = (function (_PureComponent) {
  _inherits(Gallery, _PureComponent);

  function Gallery() {
    _classCallCheck(this, Gallery);

    _get(Object.getPrototypeOf(Gallery.prototype), 'constructor', this).call(this);
    this.state = {
      containerWidth: 0
    };
    this.handleResize = this.handleResize.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return true;
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
    key: 'handleClick',
    value: function handleClick(event, _ref) {
      var index = _ref.index;
      var _props = this.props;
      var photos = _props.photos;
      var onClick = _props.onClick;

      onClick(event, {
        index: index,
        photo: photos[index],
        previous: photos[index - 1] || null,
        next: photos[index + 1] || null
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var _props$ImageComponent = this.props.ImageComponent;
      var ImageComponent = _props$ImageComponent === undefined ? _Photo2['default'] : _props$ImageComponent;

      // subtract 1 pixel because the browser may round up a pixel
      var width = this.state.containerWidth - 1;
      var _props2 = this.props;
      var photos = _props2.photos;
      var columns = _props2.columns;
      var margin = _props2.margin;
      var onClick = _props2.onClick;

      var thumbs = (0, _utils.computeSizes)({ width: width, columns: columns, margin: margin, photos: photos });
      return _react2['default'].createElement(
        'div',
        { className: 'react-photo-gallery--gallery' },
        _react2['default'].createElement(
          'div',
          { ref: function (c) {
              return _this._gallery = c;
            } },
          thumbs.map(function (photo, index) {
            var width = photo.width;
            var height = photo.height;

            return _react2['default'].createElement(ImageComponent, {
              key: photo.key || photo.src,
              margin: margin,
              index: index,
              photo: photo,
              onClick: onClick ? _this.handleClick : null
            });
          })
        ),
        _react2['default'].createElement('div', { style: { content: '', display: 'table', clear: 'both' } })
      );
    }
  }]);

  return Gallery;
})(_react.PureComponent);

Gallery.propTypes = {
  photos: _propTypes2['default'].arrayOf(_Photo.photoPropType).isRequired,
  onClick: _propTypes2['default'].func,
  columns: _propTypes2['default'].number,
  margin: _propTypes2['default'].number,
  ImageComponent: _propTypes2['default'].func
};

Gallery.defaultProps = {
  columns: 3,
  margin: 2
};

exports['default'] = Gallery;
module.exports = exports['default'];