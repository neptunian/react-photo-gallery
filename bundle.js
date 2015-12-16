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
        this.setState({ containerWidth: _reactDom2['default'].findDOMNode(this).clientWidth });
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
                        _react2['default'].createElement('img', { src: src, style: { display: 'block', border: 0 }, height: commonHeight, width: commonHeight * this.props.photos[k].aspectRatio, alt: '' })
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2hlbGVuaWEvcmVhY3QtcGhvdG8tZ2FsbGVyeS9zcmMvR2FsbGVyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7cUJDQWtCLE9BQU87Ozs7d0JBQ0osV0FBVzs7OzsyQkFDWCxjQUFjOzs7O0FBRW5DLElBQUksT0FBTyxHQUFHLG1CQUFNLFdBQVcsQ0FBQztBQUM1QixlQUFXLEVBQUUsU0FBUztBQUN0QixhQUFTLEVBQUM7QUFDTixjQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE9BQU8sQ0FDM0IsbUJBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQztBQUNsQixlQUFHLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3RDLGlCQUFLLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3hDLGtCQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3pDLHVCQUFXLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQzlDLHlCQUFhLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO1NBQ25ELENBQUMsQ0FDTCxDQUFDLFVBQVU7S0FDZjtBQUNELG1CQUFlLEVBQUUsMkJBQVU7QUFDdkIsZUFBTztBQUNWLHdCQUFZLEVBQUUsQ0FBQztBQUNmLDBCQUFjLEVBQUUsQ0FBQztTQUNwQixDQUFBO0tBQ0c7QUFDRCxxQkFBaUIsRUFBRSw2QkFBVTs7QUFFaEMsWUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLGNBQWMsRUFBRSxzQkFBUyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFDLENBQUMsQ0FBQTtBQUNoRSxjQUFNLENBQUMsZ0JBQWdCLENB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O0FBQ1osc0JBQU0sRUFBRSxJQUFJLEFBQUM7QUFDYixzQkFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxBQUFDO2NBQ3BDO1NBQ0EsQ0FDUjtLQUNMO0NBQ0osQ0FBQyxDQUFDOztBQUVILElBQU0sS0FBSyxHQUFHO0FBQ1gsV0FBTyxFQUFFLE9BQU87QUFDaEIsVUFBTSxFQUFFLENBQUM7QUFDVCxtQkFBZSxFQUFDLFNBQVM7QUFDekIsU0FBSyxFQUFFLE1BQU07Q0FDZixDQUFBOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBMaWdodGJveCBmcm9tICdyZWFjdC1pbWFnZXMnO1xuXG52YXIgR2FsbGVyeSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ0dhbGxlcnknLFxuICAgIHByb3BUeXBlczp7XG4gICAgICAgIHBob3RvczogUmVhY3QuUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICAgICAgICAgIHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgYXNwZWN0UmF0aW86IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBsaWdodGJveEltYWdlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkuaXNSZXF1aXJlZCxcbiAgICB9LFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHtcblx0ICAgIGN1cnJlbnRJbWFnZTogMCxcblx0ICAgIGNvbnRhaW5lcldpZHRoOiAwXG5cdH1cbiAgICB9LFxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xuXHQvLyBhZGQgMTUgcGl4ZWxzIGJjIGZvciB1bmtub3duIHJlYXNvbiB0aGUgY2xpZW50V2lkdGggaGVyZSBpcyBsYXJnZXIgdGhhbiB3aGF0IGl0IHJlYWxseSBpc1xuXHR0aGlzLnNldFN0YXRlKHtjb250YWluZXJXaWR0aDogUmVhY3RET00uZmluZERPTU5vZGUodGhpcykuY2xpZW50V2lkdGh9KVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIH0sXG4gICAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbihlKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29udGFpbmVyV2lkdGg6IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLmNsaWVudFdpZHRofSk7XG4gICAgfSxcbiAgICBvcGVuTGlnaHRib3ggKGluZGV4LCBldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcblx0ICAgIGN1cnJlbnRJbWFnZTogaW5kZXgsXG4gICAgICAgICAgICBsaWdodGJveElzT3BlbjogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNsb3NlTGlnaHRib3ggKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcblx0ICAgIGN1cnJlbnRJbWFnZTogMCxcbiAgICAgICAgICAgIGxpZ2h0Ym94SXNPcGVuOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnb3RvUHJldmlvdXMgKCkge1xuXHR0aGlzLnNldFN0YXRlKHtcblx0ICAgIGN1cnJlbnRJbWFnZTogdGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2UgLSAxLFxuXHR9KTtcbiAgICB9LFxuICAgIGdvdG9OZXh0ICgpIHtcblx0dGhpcy5zZXRTdGF0ZSh7XG5cdCAgICBjdXJyZW50SW1hZ2U6IHRoaXMuc3RhdGUuY3VycmVudEltYWdlICsgMSxcblx0fSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciByb3dMaW1pdCA9IDEsXG4gICAgICAgICAgICBwaG90b1ByZXZpZXdOb2RlcyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb250YWluZXJXaWR0aCA+PSA0ODApe1xuICAgICAgICAgICAgcm93TGltaXQgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoID49IDEwMjQpe1xuICAgICAgICAgICAgcm93TGltaXQgPSAzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb250V2lkdGggPSB0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoIC0gKHJvd0xpbWl0ICogNCk7IC8qIDRweCBmb3IgbWFyZ2luIGFyb3VuZCBlYWNoIGltYWdlKi9cbiAgICAgICAgY29udFdpZHRoID0gTWF0aC5jZWlsKGNvbnRXaWR0aCAtIDIpOyAvLyBzdWJ0cmFjdCBhIGNvdXBsZSBwaXhlbHMgZm9yIHVua25vd24gaXNzdWUgd2hlcmUgbGluZSBicmVha3MgaW4gY2VydGFpbiBicmVha3BvaW50cy4gIHRoaXMgZ2l2ZXMgY29udGFpbmVyIHNvbWUgXCJwYWRkaW5nXCJcblx0dmFyIGxpZ2h0Ym94SW1hZ2VzID0gW107XG4gICAgICAgIGZvciAodmFyIGk9MDtpPHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aDtpKz1yb3dMaW1pdCl7XG4gICAgICAgICAgICB2YXIgcm93SXRlbXMgPSBbXTtcbiAgICAgICAgICAgIC8vIGxvb3AgdGhydSBlYWNoIHNldCBvZiByb3dMaW1pdCBudW1cbiAgICAgICAgICAgIC8vIGVnLiBpZiByb3dMaW1pdCBpcyAzIGl0IHdpbGwgIGxvb3AgdGhydSAwLDEsMiwgdGhlbiAzLDQsNSB0byBwZXJmb3JtIGNhbGN1bGF0aW9ucyBmb3IgdGhlIHBhcnRpY3VsYXIgc2V0XG4gICAgICAgICAgICB2YXIgYXNwZWN0UmF0aW89MCxcbiAgICAgICAgICAgICAgICB0b3RhbEFyPTAsXG4gICAgICAgICAgICAgICAgY29tbW9uSGVpZ2h0ID0gMDtcbiAgICAgICAgICAgIGZvciAodmFyIGo9aTsgajxpK3Jvd0xpbWl0OyBqKyspe1xuICAgICAgICAgICAgICAgIGlmIChqID09IHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblx0XHR0b3RhbEFyICs9IHRoaXMucHJvcHMucGhvdG9zW2pdLmFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tbW9uSGVpZ2h0ID0gY29udFdpZHRoIC8gdG90YWxBcjtcbiAgICAgICAgICAgIC8vIHJ1biB0aHJ1IHRoZSBzYW1lIHNldCBvZiBpdGVtcyBhZ2FpbiB0byBnaXZlIHRoZSBjb21tb24gaGVpZ2h0XG4gICAgICAgICAgICBmb3IgKHZhciBrPWk7IGs8aStyb3dMaW1pdDsgaysrKXtcbiAgICAgICAgICAgICAgICBpZiAoayA9PSB0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cdFx0bGlnaHRib3hJbWFnZXMucHVzaCh0aGlzLnByb3BzLnBob3Rvc1trXS5saWdodGJveEltYWdlKTtcblx0XHR2YXIgc3JjID0gdGhpcy5wcm9wcy5waG90b3Nba10uc3JjO1xuICAgICAgICAgICAgICAgIHBob3RvUHJldmlld05vZGVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17a30gc3R5bGU9e3N0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPXtrfSBvbkNsaWNrPXt0aGlzLm9wZW5MaWdodGJveC5iaW5kKHRoaXMsIGspfT48aW1nIHNyYz17c3JjfSBzdHlsZT17e2Rpc3BsYXk6J2Jsb2NrJywgYm9yZGVyOjB9fSBoZWlnaHQ9e2NvbW1vbkhlaWdodH0gd2lkdGg9e2NvbW1vbkhlaWdodCAqIHRoaXMucHJvcHMucGhvdG9zW2tdLmFzcGVjdFJhdGlvfSBhbHQ9XCJcIiAvPjwvYT5cbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblx0cmV0dXJuKFxuICAgICAgICAgICAgPGRpdiBpZD1cIkdhbGxlcnlcIiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxuICAgICAgICAgICAgICAgIHtwaG90b1ByZXZpZXdOb2Rlc31cbiAgICAgICAgICAgICAgICA8TGlnaHRib3hcblx0XHQgICAgY3VycmVudEltYWdlPXt0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZX1cbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzPXtsaWdodGJveEltYWdlc31cbiAgICAgICAgICAgICAgICAgICAgaXNPcGVuPXt0aGlzLnN0YXRlLmxpZ2h0Ym94SXNPcGVufVxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlPXt0aGlzLmNsb3NlTGlnaHRib3h9XG5cdFx0ICAgIG9uQ2xpY2tQcmV2PXt0aGlzLmdvdG9QcmV2aW91c31cblx0XHQgICAgb25DbGlja05leHQ9e3RoaXMuZ290b05leHR9XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPXsxNjAwfVxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9ezE2MDB9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcz17dGhpcy5wcm9wcy5saWdodGJveFN0eWxlc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG4vLyBHYWxsZXJ5IGltYWdlIHN0eWxlXG5jb25zdCBzdHlsZSA9IHtcbiAgIGRpc3BsYXk6ICdibG9jaycsXG4gICBtYXJnaW46IDIsXG4gICBiYWNrZ3JvdW5kQ29sb3I6JyNlM2UzZTMnLFxuICAgZmxvYXQ6ICdsZWZ0J1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbGxlcnk7XG4iXX0=
