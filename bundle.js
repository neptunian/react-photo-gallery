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
            src: _react2['default'].PropTypes.string.isRequired,
            width: _react2['default'].PropTypes.number.isRequired,
            height: _react2['default'].PropTypes.number.isRequired,
            aspectRatio: _react2['default'].PropTypes.number.isRequired,
            lightboxImage: _react2['default'].PropTypes.object.isRequired
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
        this.setState({ containerWidth: Math.ceil(_reactDom2['default'].findDOMNode(this).clientWidth) });
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
        console.log(Math.ceil(_reactDom2['default'].findDOMNode(this).clientWidth));
        var rowLimit = 1,
            photoPreviewNodes = [];
        if (this.state.containerWidth >= 480) {
            rowLimit = 2;
        }
        if (this.state.containerWidth >= 1024) {
            rowLimit = 3;
        }
        console.log(this.state.containerWidth);
        var contWidth = this.state.containerWidth - rowLimit * 4; /* 4px for margin around each image*/
        console.log(contWidth);
        contWidth = Math.ceil(contWidth - 20); // subtract a couple pixels for unknown issue where line breaks in certain breakpoints.  this gives container some "padding"
        var lightboxImages = [];
        for (var i = 0; i < this.props.photos.length; i += rowLimit) {
            var rowItems = [];
            // loop thru each set of rowLimit num
            // eg. if rowLimit is 3 it will  loop thru 0,1,2, then 3,4,5 to perform calculations for the particular set
            var aspectRatio = 0,
                totalAr = 0,
                commonHeight = 0;
            for (var j = i; j < i + rowLimit; j++) {
                if (j == this.props.photos.length) {
                    break;
                }
                totalAr += this.props.photos[j].aspectRatio;
            }
            commonHeight = contWidth / totalAr;
            // run thru the same set of items again to give the common height
            for (var k = i; k < i + rowLimit; k++) {
                if (k == this.props.photos.length) {
                    break;
                }
                lightboxImages.push(this.props.photos[k].lightboxImage);
                var src = this.props.photos[k].src;
                photoPreviewNodes.push(_react2['default'].createElement(
                    'div',
                    { key: k, style: style },
                    _react2['default'].createElement(
                        'a',
                        { href: '#', className: k, onClick: this.openLightbox.bind(this, k) },
                        _react2['default'].createElement('img', { src: src, style: { display: 'block', border: 0 }, height: commonHeight, width: Math.floor(commonHeight * this.props.photos[k].aspectRatio), alt: '' })
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
                images: lightboxImages,
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2hlbGVuaWEvcmVhY3QtcGhvdG8tZ2FsbGVyeS9zcmMvR2FsbGVyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7cUJDQWtCLE9BQU87Ozs7d0JBQ0osV0FBVzs7OzsyQkFDWCxjQUFjOzs7O0FBRW5DLElBQUksT0FBTyxHQUFHLG1CQUFNLFdBQVcsQ0FBQztBQUM1QixlQUFXLEVBQUUsU0FBUztBQUN0QixhQUFTLEVBQUM7QUFDTixjQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE9BQU8sQ0FDM0IsbUJBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQztBQUNsQixlQUFHLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3RDLGlCQUFLLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3hDLGtCQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3pDLHVCQUFXLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQzlDLHlCQUFhLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO1NBQ25ELENBQUMsQ0FDTCxDQUFDLFVBQVU7S0FDZjtBQUNELG1CQUFlLEVBQUUsMkJBQVU7QUFDdkIsZUFBTztBQUNWLHdCQUFZLEVBQUUsQ0FBQztBQUNmLDBCQUFjLEVBQUUsQ0FBQztTQUNwQixDQUFBO0tBQ0c7QUFDRCxxQkFBaUIsRUFBRSw2QkFBVTs7QUFFaEMsWUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFTLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBQyxDQUFDLENBQUE7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QkFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxBQUFDO0FBQ3hCLHNCQUFNLEVBQUUsY0FBYyxBQUFDO0FBQ3ZCLHNCQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEFBQUM7QUFDbEMsdUJBQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxBQUFDO0FBQzFDLDJCQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksQUFBQztBQUMvQiwyQkFBVyxFQUFFLElBQUksQ0FBQyxRQUFRLEFBQUM7QUFDYixxQkFBSyxFQUFFLElBQUksQUFBQztBQUNaLHNCQUFNLEVBQUUsSUFBSSxBQUFDO0FBQ2Isc0JBQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQUFBQztjQUNwQztTQUNBLENBQ1I7S0FDTDtDQUNKLENBQUMsQ0FBQzs7QUFFSCxJQUFNLEtBQUssR0FBRztBQUNYLFdBQU8sRUFBRSxPQUFPO0FBQ2hCLFVBQU0sRUFBRSxDQUFDO0FBQ1QsbUJBQWUsRUFBQyxTQUFTO0FBQ3pCLFNBQUssRUFBRSxNQUFNO0NBQ2YsQ0FBQTs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgTGlnaHRib3ggZnJvbSAncmVhY3QtaW1hZ2VzJztcblxudmFyIEdhbGxlcnkgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdHYWxsZXJ5JyxcbiAgICBwcm9wVHlwZXM6e1xuICAgICAgICBwaG90b3M6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgICAgICAgICBzcmM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIGhlaWdodDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIGFzcGVjdFJhdGlvOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgbGlnaHRib3hJbWFnZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gICAgICAgICAgICB9KVxuICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgfSxcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB7XG5cdCAgICBjdXJyZW50SW1hZ2U6IDAsXG5cdCAgICBjb250YWluZXJXaWR0aDogMFxuXHR9XG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcblx0Ly8gYWRkIDE1IHBpeGVscyBiYyBmb3IgdW5rbm93biByZWFzb24gdGhlIGNsaWVudFdpZHRoIGhlcmUgaXMgbGFyZ2VyIHRoYW4gd2hhdCBpdCByZWFsbHkgaXNcblx0dGhpcy5zZXRTdGF0ZSh7Y29udGFpbmVyV2lkdGg6IE1hdGguY2VpbChSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5jbGllbnRXaWR0aCl9KVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIH0sXG4gICAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbihlKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29udGFpbmVyV2lkdGg6IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLmNsaWVudFdpZHRofSk7XG4gICAgfSxcbiAgICBvcGVuTGlnaHRib3ggKGluZGV4LCBldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcblx0ICAgIGN1cnJlbnRJbWFnZTogaW5kZXgsXG4gICAgICAgICAgICBsaWdodGJveElzT3BlbjogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNsb3NlTGlnaHRib3ggKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcblx0ICAgIGN1cnJlbnRJbWFnZTogMCxcbiAgICAgICAgICAgIGxpZ2h0Ym94SXNPcGVuOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnb3RvUHJldmlvdXMgKCkge1xuXHR0aGlzLnNldFN0YXRlKHtcblx0ICAgIGN1cnJlbnRJbWFnZTogdGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2UgLSAxLFxuXHR9KTtcbiAgICB9LFxuICAgIGdvdG9OZXh0ICgpIHtcblx0dGhpcy5zZXRTdGF0ZSh7XG5cdCAgICBjdXJyZW50SW1hZ2U6IHRoaXMuc3RhdGUuY3VycmVudEltYWdlICsgMSxcblx0fSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdGNvbnNvbGUubG9nKE1hdGguY2VpbChSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5jbGllbnRXaWR0aCkpO1xuICAgICAgICB2YXIgcm93TGltaXQgPSAxLFxuICAgICAgICAgICAgcGhvdG9QcmV2aWV3Tm9kZXMgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29udGFpbmVyV2lkdGggPj0gNDgwKXtcbiAgICAgICAgICAgIHJvd0xpbWl0ID0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb250YWluZXJXaWR0aCA+PSAxMDI0KXtcbiAgICAgICAgICAgIHJvd0xpbWl0ID0gMztcbiAgICAgICAgfVxuXHRjb25zb2xlLmxvZyh0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoKTtcbiAgICAgICAgdmFyIGNvbnRXaWR0aCA9IHRoaXMuc3RhdGUuY29udGFpbmVyV2lkdGggLSAocm93TGltaXQgKiA0KTsgLyogNHB4IGZvciBtYXJnaW4gYXJvdW5kIGVhY2ggaW1hZ2UqL1xuXHRjb25zb2xlLmxvZyhjb250V2lkdGgpO1xuICAgICAgICBjb250V2lkdGggPSBNYXRoLmNlaWwoY29udFdpZHRoIC0gMjApOyAvLyBzdWJ0cmFjdCBhIGNvdXBsZSBwaXhlbHMgZm9yIHVua25vd24gaXNzdWUgd2hlcmUgbGluZSBicmVha3MgaW4gY2VydGFpbiBicmVha3BvaW50cy4gIHRoaXMgZ2l2ZXMgY29udGFpbmVyIHNvbWUgXCJwYWRkaW5nXCJcblx0dmFyIGxpZ2h0Ym94SW1hZ2VzID0gW107XG4gICAgICAgIGZvciAodmFyIGk9MDtpPHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aDtpKz1yb3dMaW1pdCl7XG4gICAgICAgICAgICB2YXIgcm93SXRlbXMgPSBbXTtcbiAgICAgICAgICAgIC8vIGxvb3AgdGhydSBlYWNoIHNldCBvZiByb3dMaW1pdCBudW1cbiAgICAgICAgICAgIC8vIGVnLiBpZiByb3dMaW1pdCBpcyAzIGl0IHdpbGwgIGxvb3AgdGhydSAwLDEsMiwgdGhlbiAzLDQsNSB0byBwZXJmb3JtIGNhbGN1bGF0aW9ucyBmb3IgdGhlIHBhcnRpY3VsYXIgc2V0XG4gICAgICAgICAgICB2YXIgYXNwZWN0UmF0aW89MCxcbiAgICAgICAgICAgICAgICB0b3RhbEFyPTAsXG4gICAgICAgICAgICAgICAgY29tbW9uSGVpZ2h0ID0gMDtcbiAgICAgICAgICAgIGZvciAodmFyIGo9aTsgajxpK3Jvd0xpbWl0OyBqKyspe1xuICAgICAgICAgICAgICAgIGlmIChqID09IHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblx0XHR0b3RhbEFyICs9IHRoaXMucHJvcHMucGhvdG9zW2pdLmFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tbW9uSGVpZ2h0ID0gY29udFdpZHRoIC8gdG90YWxBcjtcbiAgICAgICAgICAgIC8vIHJ1biB0aHJ1IHRoZSBzYW1lIHNldCBvZiBpdGVtcyBhZ2FpbiB0byBnaXZlIHRoZSBjb21tb24gaGVpZ2h0XG4gICAgICAgICAgICBmb3IgKHZhciBrPWk7IGs8aStyb3dMaW1pdDsgaysrKXtcbiAgICAgICAgICAgICAgICBpZiAoayA9PSB0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cdFx0bGlnaHRib3hJbWFnZXMucHVzaCh0aGlzLnByb3BzLnBob3Rvc1trXS5saWdodGJveEltYWdlKTtcblx0XHR2YXIgc3JjID0gdGhpcy5wcm9wcy5waG90b3Nba10uc3JjO1xuICAgICAgICAgICAgICAgIHBob3RvUHJldmlld05vZGVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17a30gc3R5bGU9e3N0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPXtrfSBvbkNsaWNrPXt0aGlzLm9wZW5MaWdodGJveC5iaW5kKHRoaXMsIGspfT48aW1nIHNyYz17c3JjfSBzdHlsZT17e2Rpc3BsYXk6J2Jsb2NrJywgYm9yZGVyOjB9fSBoZWlnaHQ9e2NvbW1vbkhlaWdodH0gd2lkdGg9e01hdGguZmxvb3IoY29tbW9uSGVpZ2h0ICogdGhpcy5wcm9wcy5waG90b3Nba10uYXNwZWN0UmF0aW8pfSBhbHQ9XCJcIiAvPjwvYT5cbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblx0cmV0dXJuKFxuICAgICAgICAgICAgPGRpdiBpZD1cIkdhbGxlcnlcIiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxuICAgICAgICAgICAgICAgIHtwaG90b1ByZXZpZXdOb2Rlc31cbiAgICAgICAgICAgICAgICA8TGlnaHRib3hcblx0XHQgICAgY3VycmVudEltYWdlPXt0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZX1cbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzPXtsaWdodGJveEltYWdlc31cbiAgICAgICAgICAgICAgICAgICAgaXNPcGVuPXt0aGlzLnN0YXRlLmxpZ2h0Ym94SXNPcGVufVxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlPXt0aGlzLmNsb3NlTGlnaHRib3h9XG5cdFx0ICAgIG9uQ2xpY2tQcmV2PXt0aGlzLmdvdG9QcmV2aW91c31cblx0XHQgICAgb25DbGlja05leHQ9e3RoaXMuZ290b05leHR9XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPXsxNjAwfVxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9ezE2MDB9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcz17dGhpcy5wcm9wcy5saWdodGJveFN0eWxlc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG4vLyBHYWxsZXJ5IGltYWdlIHN0eWxlXG5jb25zdCBzdHlsZSA9IHtcbiAgIGRpc3BsYXk6ICdibG9jaycsXG4gICBtYXJnaW46IDIsXG4gICBiYWNrZ3JvdW5kQ29sb3I6JyNlM2UzZTMnLFxuICAgZmxvYXQ6ICdsZWZ0J1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbGxlcnk7XG4iXX0=
