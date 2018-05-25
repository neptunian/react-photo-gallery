'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Photo = require('./Photo');

var _Photo2 = _interopRequireDefault(_Photo);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gallery = function (_React$Component) {
  _inherits(Gallery, _React$Component);

  function Gallery() {
    _classCallCheck(this, Gallery);

    var _this = _possibleConstructorReturn(this, (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call(this));

    _this.state = {
      containerWidth: 0
    };
    _this.handleResize = _this.handleResize.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);

    var that = _this;
    // this is to fix non-ios browsers where a scrollbar isnt present before
    // images load, then becomes present, and doesn't trigger an update.
    // avoids calling setState in componentDidUpdate causing maximum depth exceeded error
    window.requestAnimationFrame(function () {
      if (that._gallery.clientWidth !== that.state.containerWidth) {
        that.setState({ containerWidth: Math.floor(that._gallery.clientWidth) });
      }
    });
    return _this;
  }

  _createClass(Gallery, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) });
      window.addEventListener('resize', this.handleResize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize, false);
    }
  }, {
    key: 'handleResize',
    value: function handleResize(e) {
      if (this._gallery.clientWidth !== this.state.containerWidth) {
        this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) });
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event, _ref) {
      var index = _ref.index;
      var _props = this.props,
          photos = _props.photos,
          onClick = _props.onClick;

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
      var _this2 = this;

      var _props$ImageComponent = this.props.ImageComponent,
          ImageComponent = _props$ImageComponent === undefined ? _Photo2.default : _props$ImageComponent;
      // subtract 1 pixel because the browser may round up a pixel

      var width = this.state.containerWidth - 1;
      var _props2 = this.props,
          photos = _props2.photos,
          columns = _props2.columns,
          margin = _props2.margin,
          onClick = _props2.onClick;

      var thumbs = (0, _utils.computeSizes)({ width: width, columns: columns, margin: margin, photos: photos });
      return _react2.default.createElement(
        'div',
        { className: 'react-photo-gallery--gallery' },
        _react2.default.createElement(
          'div',
          { ref: function ref(c) {
              return _this2._gallery = c;
            } },
          thumbs.map(function (photo, index) {
            var width = photo.width,
                height = photo.height;

            return _react2.default.createElement(ImageComponent, {
              key: photo.key || photo.src,
              margin: margin,
              index: index,
              photo: photo,
              onClick: onClick ? _this2.handleClick : null
            });
          })
        ),
        _react2.default.createElement('div', { style: { content: '', display: 'table', clear: 'both' } })
      );
    }
  }]);

  return Gallery;
}(_react2.default.Component);

Gallery.propTypes = {
  photos: _propTypes2.default.arrayOf(_Photo.photoPropType).isRequired,
  onClick: _propTypes2.default.func,
  columns: _propTypes2.default.number,
  margin: _propTypes2.default.number,
  ImageComponent: _propTypes2.default.func
};

Gallery.defaultProps = {
  columns: 3,
  margin: 2
};

exports.default = Gallery;