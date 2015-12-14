require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"react-photo-gallery":[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

var Gallery = _react2['default'].createClass({
    displayName: 'Gallery',
    propTypes: {
        photos: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
            gallery_src: _react2['default'].PropTypes.string.isRequired,
            src: _react2['default'].PropTypes.string.isRequired,
            srcset: _react2['default'].PropTypes.array,
            width: _react2['default'].PropTypes.number.isRequired,
            height: _react2['default'].PropTypes.number.isRequired,
            aspect_ratio: _react2['default'].PropTypes.number.isRequired
        })).isRequired
    },
    getInitialState: function getInitialState() {
        return {
            currentImage: 0,
            containerWidth: 0
        };
    },
    componentDidMount: function componentDidMount() {
        // add 15 pixels bc for unknown reason the clientWidth here is larger than what it really is
        this.setState({ containerWidth: _reactDom2['default'].findDOMNode(this).clientWidth - 15 });
        window.addEventListener('resize', this.handleResize);
    },
    handleResize: function handleResize(e) {
        this.setState({ containerWidth: _reactDom2['default'].findDOMNode(this).clientWidth });
    },
    openLightbox: function openLightbox(index, event) {
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true
        });
    },
    closeLightbox: function closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false
        });
    },
    gotoPrevious: function gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    },
    gotoNext: function gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1
        });
    },
    render: function render() {
        var rowLimit = 1,
            photoPreviewNodes = [];
        if (this.state.containerWidth >= 480) {
            rowLimit = 2;
        }
        if (this.state.containerWidth >= 1024) {
            rowLimit = 3;
        }
        var contWidth = this.state.containerWidth - rowLimit * 4; /* 4px for margin around each image*/
        contWidth = Math.ceil(contWidth - 2); // subtract a couple pixels for unknown issue where line breaks in certain breakpoints.  this gives container some "padding"
        for (var i = 0; i < this.props.photos.length; i += rowLimit) {
            var rowItems = [];
            // loop thru each set of rowLimit num
            // eg. if rowLimit is 3 it will  loop thru 0,1,2, then 3,4,5 to perform calculations for the particular set
            var aspect_ratio = 0,
                totalAr = 0,
                commonHeight = 0;
            for (var j = i; j < i + rowLimit; j++) {
                if (j == this.props.photos.length) {
                    break;
                }
                totalAr += this.props.photos[j].aspect_ratio;
            }
            commonHeight = contWidth / totalAr;
            // run thru the same set of items again to give the common height
            for (var k = i; k < i + rowLimit; k++) {
                if (k == this.props.photos.length) {
                    break;
                }
                var src = this.props.photos[k].gallery_src;
                photoPreviewNodes.push(_react2['default'].createElement(
                    'div',
                    { key: k, style: style },
                    _react2['default'].createElement(
                        'a',
                        { href: '#', className: k, onClick: this.openLightbox.bind(this, k) },
                        _react2['default'].createElement('img', { src: src, style: { display: 'block', border: 0 }, height: commonHeight, width: commonHeight * this.props.photos[k].aspect_ratio, alt: '' })
                    )
                ));
            }
        }
        return _react2['default'].createElement(
            'div',
            { id: 'Gallery', className: 'clearfix' },
            photoPreviewNodes,
            _react2['default'].createElement(_reactImages2['default'], {
                currentImage: this.state.currentImage,
                images: this.props.photos,
                isOpen: this.state.lightboxIsOpen,
                onClose: this.closeLightbox,
                onClickPrev: this.gotoPrevious,
                onClickNext: this.gotoNext,
                width: 1600,
                height: 1600,
                styles: this.props.lightboxStyles
            })
        );
    }
});
// Gallery image style
var style = {
    display: 'block',
    margin: 2,
    backgroundColor: '#e3e3e3',
    float: 'left'
};

module.exports = Gallery;

},{"react":undefined,"react-dom":undefined,"react-images":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2hlbGVuaWEvcmVhY3QtcGhvdG8tZ2FsbGVyeS9zcmMvR2FsbGVyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7cUJDQWtCLE9BQU87Ozs7d0JBQ0osV0FBVzs7OzsyQkFDWCxjQUFjOzs7O0FBRW5DLElBQUksT0FBTyxHQUFHLG1CQUFNLFdBQVcsQ0FBQztBQUM1QixlQUFXLEVBQUUsU0FBUztBQUN0QixhQUFTLEVBQUM7QUFDTixjQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE9BQU8sQ0FDM0IsbUJBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQztBQUNsQix1QkFBVyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUM5QyxlQUFHLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3RDLGtCQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLEtBQUs7QUFDN0IsaUJBQUssRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDeEMsa0JBQU0sRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDekMsd0JBQVksRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7U0FDbEQsQ0FBQyxDQUNMLENBQUMsVUFBVTtLQUNmO0FBQ0QsbUJBQWUsRUFBRSwyQkFBVTtBQUN2QixlQUFPO0FBQ1Ysd0JBQVksRUFBRSxDQUFDO0FBQ2YsMEJBQWMsRUFBRSxDQUFDO1NBQ3BCLENBQUE7S0FDRztBQUNELHFCQUFpQixFQUFFLDZCQUFVOztBQUVoQyxZQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsY0FBYyxFQUFFLHNCQUFTLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEdB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QUMsS0FBSyxDQUFDLGNBQWMsQUFBQztjQUNwQztTQUNBLENBQ1I7S0FDTDtDQUNKLENBQUMsQ0FBQzs7QUFFSCxJQUFNLEtBQUssR0FBRztBQUNYLFdBQU8sRUFBRSxPQUFPO0FBQ2hCLFVBQU0sRUFBRSxDQUFDO0FBQ1QsbUJBQWUsRUFBQyxTQUFTO0FBQ3pCLFNBQUssRUFBRSxNQUFNO0NBQ2YsQ0FBQTs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgTGlnaHRib3ggZnJvbSAncmVhY3QtaW1hZ2VzJztcblxudmFyIEdhbGxlcnkgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdHYWxsZXJ5JyxcbiAgICBwcm9wVHlwZXM6e1xuICAgICAgICBwaG90b3M6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBnYWxsZXJ5X3NyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIHNyY3NldDogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICAgICAgICAgICAgICAgIHdpZHRoOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgYXNwZWN0X3JhdGlvOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICB9LFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcblx0ICAgIGN1cnJlbnRJbWFnZTogMCxcblx0ICAgIGNvbnRhaW5lcldpZHRoOiAwXG5cdH1cbiAgICB9LFxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xuXHQvLyBhZGQgMTUgcGl4ZWxzIGJjIGZvciB1bmtub3duIHJlYXNvbiB0aGUgY2xpZW50V2lkdGggaGVyZSBpcyBsYXJnZXIgdGhhbiB3aGF0IGl0IHJlYWxseSBpc1xuXHR0aGlzLnNldFN0YXRlKHtjb250YWluZXJXaWR0aDogUmVhY3RET00uZmluZERPTU5vZGUodGhpcykuY2xpZW50V2lkdGggLSAxNX0pXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XG4gICAgfSxcbiAgICBoYW5kbGVSZXNpemU6IGZ1bmN0aW9uKGUpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb250YWluZXJXaWR0aDogUmVhY3RET00uZmluZERPTU5vZGUodGhpcykuY2xpZW50V2lkdGh9KTtcbiAgICB9LFxuICAgIG9wZW5MaWdodGJveCAoaW5kZXgsIGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuXHQgICAgY3VycmVudEltYWdlOiBpbmRleCxcbiAgICAgICAgICAgIGxpZ2h0Ym94SXNPcGVuOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY2xvc2VMaWdodGJveCAoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuXHQgICAgY3VycmVudEltYWdlOiAwLFxuICAgICAgICAgICAgbGlnaHRib3hJc09wZW46IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdvdG9QcmV2aW91cyAoKSB7XG5cdHRoaXMuc2V0U3RhdGUoe1xuXHQgICAgY3VycmVudEltYWdlOiB0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSAtIDEsXG5cdH0pO1xuICAgIH0sXG4gICAgZ290b05leHQgKCkge1xuXHR0aGlzLnNldFN0YXRlKHtcblx0ICAgIGN1cnJlbnRJbWFnZTogdGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2UgKyAxLFxuXHR9KTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHJvd0xpbWl0ID0gMSxcbiAgICAgICAgICAgIHBob3RvUHJldmlld05vZGVzID0gW107XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoID49IDQ4MCl7XG4gICAgICAgICAgICByb3dMaW1pdCA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29udGFpbmVyV2lkdGggPj0gMTAyNCl7XG4gICAgICAgICAgICByb3dMaW1pdCA9IDM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbnRXaWR0aCA9IHRoaXMuc3RhdGUuY29udGFpbmVyV2lkdGggLSAocm93TGltaXQgKiA0KTsgLyogNHB4IGZvciBtYXJnaW4gYXJvdW5kIGVhY2ggaW1hZ2UqL1xuICAgICAgICBjb250V2lkdGggPSBNYXRoLmNlaWwoY29udFdpZHRoIC0gMik7IC8vIHN1YnRyYWN0IGEgY291cGxlIHBpeGVscyBmb3IgdW5rbm93biBpc3N1ZSB3aGVyZSBsaW5lIGJyZWFrcyBpbiBjZXJ0YWluIGJyZWFrcG9pbnRzLiAgdGhpcyBnaXZlcyBjb250YWluZXIgc29tZSBcInBhZGRpbmdcIlxuICAgICAgICBmb3IgKHZhciBpPTA7aTx0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGg7aSs9cm93TGltaXQpe1xuICAgICAgICAgICAgdmFyIHJvd0l0ZW1zID0gW107XG4gICAgICAgICAgICAvLyBsb29wIHRocnUgZWFjaCBzZXQgb2Ygcm93TGltaXQgbnVtXG4gICAgICAgICAgICAvLyBlZy4gaWYgcm93TGltaXQgaXMgMyBpdCB3aWxsICBsb29wIHRocnUgMCwxLDIsIHRoZW4gMyw0LDUgdG8gcGVyZm9ybSBjYWxjdWxhdGlvbnMgZm9yIHRoZSBwYXJ0aWN1bGFyIHNldFxuICAgICAgICAgICAgdmFyIGFzcGVjdF9yYXRpbz0wLFxuICAgICAgICAgICAgICAgIHRvdGFsQXI9MCxcbiAgICAgICAgICAgICAgICBjb21tb25IZWlnaHQgPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaj1pOyBqPGkrcm93TGltaXQ7IGorKyl7XG4gICAgICAgICAgICAgICAgaWYgKGogPT0gdGhpcy5wcm9wcy5waG90b3MubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXHRcdHRvdGFsQXIgKz0gdGhpcy5wcm9wcy5waG90b3Nbal0uYXNwZWN0X3JhdGlvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tbW9uSGVpZ2h0ID0gY29udFdpZHRoIC8gdG90YWxBcjtcbiAgICAgICAgICAgIC8vIHJ1biB0aHJ1IHRoZSBzYW1lIHNldCBvZiBpdGVtcyBhZ2FpbiB0byBnaXZlIHRoZSBjb21tb24gaGVpZ2h0XG4gICAgICAgICAgICBmb3IgKHZhciBrPWk7IGs8aStyb3dMaW1pdDsgaysrKXtcbiAgICAgICAgICAgICAgICBpZiAoayA9PSB0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cdFx0dmFyIHNyYyA9IHRoaXMucHJvcHMucGhvdG9zW2tdLmdhbGxlcnlfc3JjO1xuICAgICAgICAgICAgICAgIHBob3RvUHJldmlld05vZGVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17a30gc3R5bGU9e3N0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPXtrfSBvbkNsaWNrPXt0aGlzLm9wZW5MaWdodGJveC5iaW5kKHRoaXMsIGspfT48aW1nIHNyYz17c3JjfSBzdHlsZT17e2Rpc3BsYXk6J2Jsb2NrJywgYm9yZGVyOjB9fSBoZWlnaHQ9e2NvbW1vbkhlaWdodH0gd2lkdGg9e2NvbW1vbkhlaWdodCAqIHRoaXMucHJvcHMucGhvdG9zW2tdLmFzcGVjdF9yYXRpb30gYWx0PVwiXCIgLz48L2E+XG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdHJldHVybihcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJHYWxsZXJ5XCIgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj5cbiAgICAgICAgICAgICAgICB7cGhvdG9QcmV2aWV3Tm9kZXN9XG4gICAgICAgICAgICAgICAgPExpZ2h0Ym94XG5cdFx0ICAgIGN1cnJlbnRJbWFnZT17dGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2V9XG4gICAgICAgICAgICAgICAgICAgIGltYWdlcz17dGhpcy5wcm9wcy5waG90b3N9XG4gICAgICAgICAgICAgICAgICAgIGlzT3Blbj17dGhpcy5zdGF0ZS5saWdodGJveElzT3Blbn1cbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZT17dGhpcy5jbG9zZUxpZ2h0Ym94fVxuXHRcdCAgICBvbkNsaWNrUHJldj17dGhpcy5nb3RvUHJldmlvdXN9XG5cdFx0ICAgIG9uQ2xpY2tOZXh0PXt0aGlzLmdvdG9OZXh0fVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD17MTYwMH1cbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXsxNjAwfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZXM9e3RoaXMucHJvcHMubGlnaHRib3hTdHlsZXN9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuLy8gR2FsbGVyeSBpbWFnZSBzdHlsZVxuY29uc3Qgc3R5bGUgPSB7XG4gICBkaXNwbGF5OiAnYmxvY2snLFxuICAgbWFyZ2luOiAyLFxuICAgYmFja2dyb3VuZENvbG9yOicjZTNlM2UzJyxcbiAgIGZsb2F0OiAnbGVmdCdcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYWxsZXJ5O1xuIl19
