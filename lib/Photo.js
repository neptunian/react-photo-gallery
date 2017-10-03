'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var imgWithClick = { cursor: 'pointer' };

var Photo = (function (_PureComponent) {
  _inherits(Photo, _PureComponent);

  function Photo() {
    _classCallCheck(this, Photo);

    _get(Object.getPrototypeOf(Photo.prototype), 'constructor', this).call(this);
    this.handleClick = this.handleClick.bind(this);
  }

  _createClass(Photo, [{
    key: 'handleClick',
    value: function handleClick(event) {
      var _props = this.props;
      var onClick = _props.onClick;
      var index = _props.index;
      var photo = _props.photo;

      onClick(event, { photo: photo, index: index });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var photo = _props2.photo;
      var onClick = _props2.onClick;
      var margin = _props2.margin;

      var imgStyle = { display: 'block', float: 'left', margin: margin };
      return _react2['default'].createElement('img', _extends({
        style: onClick ? _extends({}, imgStyle, imgWithClick) : imgStyle
      }, photo, {
        onClick: onClick ? this.handleClick : null
      }));
    }
  }]);

  return Photo;
})(_react.PureComponent);

var photoPropType = _propTypes2['default'].shape({
  src: _propTypes2['default'].string.isRequired,
  width: _propTypes2['default'].number.isRequired,
  height: _propTypes2['default'].number.isRequired,
  alt: _propTypes2['default'].string,
  title: _propTypes2['default'].string,
  srcSet: _propTypes2['default'].array,
  sizes: _propTypes2['default'].array
});

exports.photoPropType = photoPropType;
Photo.propTypes = {
  index: _propTypes2['default'].number,
  onClick: _propTypes2['default'].func,
  photo: photoPropType
};

exports['default'] = Photo;