'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.photoPropType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var imgWithClick = { cursor: 'pointer' };

var Photo = function (_PureComponent) {
  _inherits(Photo, _PureComponent);

  function Photo() {
    _classCallCheck(this, Photo);

    var _this = _possibleConstructorReturn(this, (Photo.__proto__ || Object.getPrototypeOf(Photo)).call(this));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(Photo, [{
    key: 'handleClick',
    value: function handleClick(event) {
      var _props = this.props,
          onClick = _props.onClick,
          index = _props.index,
          photo = _props.photo;

      onClick(event, { photo: photo, index: index });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          photo = _props2.photo,
          onClick = _props2.onClick,
          margin = _props2.margin;

      var imgStyle = { display: 'block', float: 'left', margin: margin };
      return _react2.default.createElement('img', _extends({
        style: onClick ? _extends({}, imgStyle, imgWithClick) : imgStyle
      }, photo, {
        src: photo.thumbnail ? photo.thumbnail : photo.src,
        onClick: onClick ? this.handleClick : null
      }));
    }
  }]);

  return Photo;
}(_react.PureComponent);

var photoPropType = exports.photoPropType = _propTypes2.default.shape({
  src: _propTypes2.default.string.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  alt: _propTypes2.default.string,
  title: _propTypes2.default.string,
  srcSet: _propTypes2.default.array,
  sizes: _propTypes2.default.array,
  thumbnail: _propTypes2.default.string
});

Photo.propTypes = {
  index: _propTypes2.default.number,
  onClick: _propTypes2.default.func,
  photo: photoPropType
};

exports.default = Photo;