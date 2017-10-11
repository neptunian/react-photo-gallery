(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Gallery = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Photo":2,"./utils":3,"prop-types":undefined}],2:[function(require,module,exports){
(function (global){
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

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"prop-types":undefined}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.ratio = ratio;
exports.computeSizes = computeSizes;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function ratio(_ref) {
  var width = _ref.width;
  var height = _ref.height;

  return width / height;
}

function computeSizes(_ref2) {
  var photos = _ref2.photos;
  var columns = _ref2.columns;
  var width = _ref2.width;
  var margin = _ref2.margin;

  if (!width) {
    return [];
  }
  // divide photos over rows, max cells based on `columns`
  // effectively resulting in [[0, 1, 2], [3, 4, 5], [6, 7]]
  var rows = photos.reduce(function (acc, cell, idx) {
    var row = Math.floor(idx / columns);
    acc[row] = acc[row] ? [].concat(_toConsumableArray(acc[row]), [cell]) : [cell]; // eslint-disable-line no-param-reassign
    return acc;
  }, []);

  // calculate total ratio of each row, and adjust each cell height and width
  // accordingly.
  var lastRowIndex = rows.length - 1;
  var rowsWithSizes = rows.map(function (row, rowIndex) {
    var totalRatio = row.reduce(function (result, photo) {
      return result + ratio(photo);
    }, 0);
    var rowWidth = width - row.length * (margin * 2);
    var height = rowIndex !== lastRowIndex || row.length > 1 ? // eslint-disable-line
    rowWidth / totalRatio : rowWidth / columns / totalRatio;

    return row.map(function (photo) {
      return _extends({}, photo, {
        height: height,
        width: height * ratio(photo)
      });
    });
  });

  return rowsWithSizes.reduce(function (acc, row) {
    return [].concat(_toConsumableArray(acc), _toConsumableArray(row));
  }, []);
}

},{}]},{},[1])(1)
});