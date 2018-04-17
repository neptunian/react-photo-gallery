import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var imgWithClick = { cursor: 'pointer' };

var Photo = function (_PureComponent) {
  inherits(Photo, _PureComponent);

  function Photo() {
    classCallCheck(this, Photo);

    var _this = possibleConstructorReturn(this, (Photo.__proto__ || Object.getPrototypeOf(Photo)).call(this));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  createClass(Photo, [{
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
      return React.createElement('img', _extends({
        style: onClick ? _extends({}, imgStyle, imgWithClick) : imgStyle
      }, photo, {
        onClick: onClick ? this.handleClick : null
      }));
    }
  }]);
  return Photo;
}(PureComponent);

var photoPropType = PropTypes.shape({
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  srcSet: PropTypes.array,
  sizes: PropTypes.array
});

Photo.propTypes = {
  index: PropTypes.number,
  onClick: PropTypes.func,
  photo: photoPropType
};

function round(value, decimals) {
  if (!decimals) decimals = 0;
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

// return two decimal places rounded number
function ratio(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return round(width / height, 2);
}

// takes the Gallery's photos prop object, width of the container,
// margin between photos Gallery prop, and columns Gallery prop.
// calculates, sizes based on columns and returns the photos object with new height/width props
function computeSizes(_ref2) {
  var photos = _ref2.photos,
      columns = _ref2.columns,
      width = _ref2.width,
      margin = _ref2.margin;

  if (!width) {
    return [];
  }
  // divide photos over rows, max cells based on `columns`
  // effectively resulting in [[0, 1, 2], [3, 4, 5], [6, 7]]
  var rows = photos.reduce(function (acc, cell, idx) {
    var row = Math.floor(idx / columns);
    acc[row] = acc[row] ? [].concat(toConsumableArray(acc[row]), [cell]) : [cell]; // eslint-disable-line no-param-reassign
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

    // assign height, but let height of a single photo in the last
    // row not expand across columns so divide by columns
    var height = rowIndex !== lastRowIndex || row.length > 1 ? // eslint-disable-line
    rowWidth / totalRatio : rowWidth / columns / totalRatio;

    return row.map(function (photo) {
      return _extends({}, photo, {
        height: round(height, 1),
        width: round(height * ratio(photo), 1)
      });
    });
  });
  return rowsWithSizes.reduce(function (acc, row) {
    return [].concat(toConsumableArray(acc), toConsumableArray(row));
  }, []);
}

var Gallery = function (_React$Component) {
  inherits(Gallery, _React$Component);

  function Gallery() {
    classCallCheck(this, Gallery);

    var _this = possibleConstructorReturn(this, (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call(this));

    _this.state = {
      containerWidth: 0
    };
    _this.handleResize = _this.handleResize.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  createClass(Gallery, [{
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
          ImageComponent = _props$ImageComponent === undefined ? Photo : _props$ImageComponent;
      // subtract 1 pixel because the browser may round up a pixel

      var width = this.state.containerWidth - 1;
      var _props2 = this.props,
          photos = _props2.photos,
          columns = _props2.columns,
          margin = _props2.margin,
          onClick = _props2.onClick;

      var thumbs = computeSizes({ width: width, columns: columns, margin: margin, photos: photos });
      return React.createElement(
        'div',
        { className: 'react-photo-gallery--gallery' },
        React.createElement(
          'div',
          { ref: function ref(c) {
              return _this2._gallery = c;
            } },
          thumbs.map(function (photo, index) {
            return React.createElement(ImageComponent, {
              key: photo.key || photo.src,
              margin: margin,
              index: index,
              photo: photo,
              onClick: onClick ? _this2.handleClick : null
            });
          })
        ),
        React.createElement('div', { style: { content: '', display: 'table', clear: 'both' } })
      );
    }
  }]);
  return Gallery;
}(React.Component);

Gallery.propTypes = {
  photos: PropTypes.arrayOf(photoPropType).isRequired,
  onClick: PropTypes.func,
  columns: PropTypes.number,
  margin: PropTypes.number,
  ImageComponent: PropTypes.func
};

Gallery.defaultProps = {
  columns: 3,
  margin: 2
};

export default Gallery;
