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
            contWidth = this.state.containerWidth - rowLimit * 4,
            /* 4px for margin around each image*/
        photoPreviewNodes = [];
        if (this.state.containerWidth >= 480) {
            rowLimit = 2;
            contWidth = this.state.containerWidth - rowLimit * 4; /* 4px for margin around each image*/
        }
        if (this.state.containerWidth >= 1024) {
            rowLimit = 3;
            contWidth = this.state.containerWidth - rowLimit * 4; /* 4px for margin around each image*/
        }
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2hlbGVuaWEvcmVhY3QtcGhvdG8tZ2FsbGVyeS9zcmMvR2FsbGVyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7cUJDQWtCLE9BQU87Ozs7d0JBQ0osV0FBVzs7OzsyQkFDWCxjQUFjOzs7O0FBRW5DLElBQUksT0FBTyxHQUFHLG1CQUFNLFdBQVcsQ0FBQztBQUM1QixlQUFXLEVBQUUsU0FBUztBQUN0QixhQUFTLEVBQUM7QUFDTixjQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE9BQU8sQ0FDM0IsbUJBQU0sU0FBUyxDQUFDLEtBQUssQ0FBQztBQUNsQix1QkFBVyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUM5QyxlQUFHLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQ3RDLGtCQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLEtBQUs7QUFDN0IsaUJBQUssRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDeEMsa0JBQU0sRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDekMsd0JBQVksRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7U0FDbEQsQ0FBQyxDQUNMLENBQUMsVUFBVTtLQUNmO0FBQ0QsbUJBQWUsRUFBRSwyQkFBVTtBQUN2QixlQUFPO0FBQ1Ysd0JBQVksRUFBRSxDQUFDO0FBQ2YsMEJBQWMsRUFBRSxDQUFDO1NBQ3BCLENBQUE7S0FDRztBQUNELHFCQUFpQixFQUFFLDZCQUFVOztBQUVoQyxZQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsY0FBYyxFQUFFLHNCQUFTLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEdB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LElBQUksQ0FBQyxZQUFZLEFBQUM7QUFDL0IsMkJBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxBQUFDO0FBQ2IscUJBQUssRUFBRSxJQUFJLEFBQUM7QUFDWixzQkFBTSxFQUFFLElBQUksQUFBQztBQUNiLHNCQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEFBQUM7Y0FDcEM7U0FDQSxDQUNSO0tBQ0w7Q0FDSixDQUFDLENBQUM7O0FBRUgsSUFBTSxLQUFLLEdBQUc7QUFDWCxXQUFPLEVBQUUsT0FBTztBQUNoQixVQUFNLEVBQUUsQ0FBQztBQUNULG1CQUFlLEVBQUMsU0FBUztBQUN6QixTQUFLLEVBQUUsTUFBTTtDQUNmLENBQUE7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IExpZ2h0Ym94IGZyb20gJ3JlYWN0LWltYWdlcyc7XG5cbnZhciBHYWxsZXJ5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnR2FsbGVyeScsXG4gICAgcHJvcFR5cGVzOntcbiAgICAgICAgcGhvdG9zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgICAgICAgICAgZ2FsbGVyeV9zcmM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBzcmM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgICAgICBzcmNzZXQ6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgICAgICAgICAgICAgICB3aWR0aDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIGhlaWdodDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgICAgIGFzcGVjdF9yYXRpbzogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG4gICAgICAgICAgICB9KVxuICAgICAgICApLmlzUmVxdWlyZWQsXG4gICAgfSxcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB7XG5cdCAgICBjdXJyZW50SW1hZ2U6IDAsXG5cdCAgICBjb250YWluZXJXaWR0aDogMFxuXHR9XG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcblx0Ly8gYWRkIDE1IHBpeGVscyBiYyBmb3IgdW5rbm93biByZWFzb24gdGhlIGNsaWVudFdpZHRoIGhlcmUgaXMgbGFyZ2VyIHRoYW4gd2hhdCBpdCByZWFsbHkgaXNcblx0dGhpcy5zZXRTdGF0ZSh7Y29udGFpbmVyV2lkdGg6IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLmNsaWVudFdpZHRoIC0gMTV9KVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIH0sXG4gICAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbihlKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29udGFpbmVyV2lkdGg6IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLmNsaWVudFdpZHRofSk7XG4gICAgfSxcbiAgICBvcGVuTGlnaHRib3ggKGluZGV4LCBldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcblx0ICAgIGN1cnJlbnRJbWFnZTogaW5kZXgsXG4gICAgICAgICAgICBsaWdodGJveElzT3BlbjogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNsb3NlTGlnaHRib3ggKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcblx0ICAgIGN1cnJlbnRJbWFnZTogMCxcbiAgICAgICAgICAgIGxpZ2h0Ym94SXNPcGVuOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnb3RvUHJldmlvdXMgKCkge1xuXHR0aGlzLnNldFN0YXRlKHtcblx0ICAgIGN1cnJlbnRJbWFnZTogdGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2UgLSAxLFxuXHR9KTtcbiAgICB9LFxuICAgIGdvdG9OZXh0ICgpIHtcblx0dGhpcy5zZXRTdGF0ZSh7XG5cdCAgICBjdXJyZW50SW1hZ2U6IHRoaXMuc3RhdGUuY3VycmVudEltYWdlICsgMSxcblx0fSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciByb3dMaW1pdCA9IDEsXG4gICAgICAgICAgICBjb250V2lkdGggPSB0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoIC0gKHJvd0xpbWl0ICogNCkgLyogNHB4IGZvciBtYXJnaW4gYXJvdW5kIGVhY2ggaW1hZ2UqLyxcbiAgICAgICAgICAgIHBob3RvUHJldmlld05vZGVzID0gW107XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoID49IDQ4MCl7XG4gICAgICAgICAgICByb3dMaW1pdCA9IDI7XG4gICAgICAgICAgICBjb250V2lkdGggPSB0aGlzLnN0YXRlLmNvbnRhaW5lcldpZHRoIC0gKHJvd0xpbWl0ICogNCk7IC8qIDRweCBmb3IgbWFyZ2luIGFyb3VuZCBlYWNoIGltYWdlKi9cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb250YWluZXJXaWR0aCA+PSAxMDI0KXtcbiAgICAgICAgICAgIHJvd0xpbWl0ID0gMztcbiAgICAgICAgICAgIGNvbnRXaWR0aCA9IHRoaXMuc3RhdGUuY29udGFpbmVyV2lkdGggLSAocm93TGltaXQgKiA0KTsgLyogNHB4IGZvciBtYXJnaW4gYXJvdW5kIGVhY2ggaW1hZ2UqL1xuICAgICAgICB9XG4gICAgICAgIGNvbnRXaWR0aCA9IE1hdGguY2VpbChjb250V2lkdGggLSAyKTsgLy8gc3VidHJhY3QgYSBjb3VwbGUgcGl4ZWxzIGZvciB1bmtub3duIGlzc3VlIHdoZXJlIGxpbmUgYnJlYWtzIGluIGNlcnRhaW4gYnJlYWtwb2ludHMuICB0aGlzIGdpdmVzIGNvbnRhaW5lciBzb21lIFwicGFkZGluZ1wiXG4gICAgICAgIGZvciAodmFyIGk9MDtpPHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aDtpKz1yb3dMaW1pdCl7XG4gICAgICAgICAgICB2YXIgcm93SXRlbXMgPSBbXTtcbiAgICAgICAgICAgIC8vIGxvb3AgdGhydSBlYWNoIHNldCBvZiByb3dMaW1pdCBudW1cbiAgICAgICAgICAgIC8vIGVnLiBpZiByb3dMaW1pdCBpcyAzIGl0IHdpbGwgIGxvb3AgdGhydSAwLDEsMiwgdGhlbiAzLDQsNSB0byBwZXJmb3JtIGNhbGN1bGF0aW9ucyBmb3IgdGhlIHBhcnRpY3VsYXIgc2V0XG4gICAgICAgICAgICB2YXIgYXNwZWN0X3JhdGlvPTAsXG4gICAgICAgICAgICAgICAgdG90YWxBcj0wLFxuICAgICAgICAgICAgICAgIGNvbW1vbkhlaWdodCA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBqPWk7IGo8aStyb3dMaW1pdDsgaisrKXtcbiAgICAgICAgICAgICAgICBpZiAoaiA9PSB0aGlzLnByb3BzLnBob3Rvcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cdFx0dG90YWxBciArPSB0aGlzLnByb3BzLnBob3Rvc1tqXS5hc3BlY3RfcmF0aW87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb21tb25IZWlnaHQgPSBjb250V2lkdGggLyB0b3RhbEFyO1xuICAgICAgICAgICAgLy8gcnVuIHRocnUgdGhlIHNhbWUgc2V0IG9mIGl0ZW1zIGFnYWluIHRvIGdpdmUgdGhlIGNvbW1vbiBoZWlnaHRcbiAgICAgICAgICAgIGZvciAodmFyIGs9aTsgazxpK3Jvd0xpbWl0OyBrKyspe1xuICAgICAgICAgICAgICAgIGlmIChrID09IHRoaXMucHJvcHMucGhvdG9zLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblx0XHR2YXIgc3JjID0gdGhpcy5wcm9wcy5waG90b3Nba10uZ2FsbGVyeV9zcmM7XG4gICAgICAgICAgICAgICAgcGhvdG9QcmV2aWV3Tm9kZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtrfSBzdHlsZT17c3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9e2t9IG9uQ2xpY2s9e3RoaXMub3BlbkxpZ2h0Ym94LmJpbmQodGhpcywgayl9PjxpbWcgc3JjPXtzcmN9IHN0eWxlPXt7ZGlzcGxheTonYmxvY2snLCBib3JkZXI6MH19IGhlaWdodD17Y29tbW9uSGVpZ2h0fSB3aWR0aD17Y29tbW9uSGVpZ2h0ICogdGhpcy5wcm9wcy5waG90b3Nba10uYXNwZWN0X3JhdGlvfSBhbHQ9XCJcIiAvPjwvYT5cbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblx0cmV0dXJuKFxuICAgICAgICAgICAgPGRpdiBpZD1cIkdhbGxlcnlcIiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxuICAgICAgICAgICAgICAgIHtwaG90b1ByZXZpZXdOb2Rlc31cbiAgICAgICAgICAgICAgICA8TGlnaHRib3hcblx0XHQgICAgY3VycmVudEltYWdlPXt0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZX1cbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VzPXt0aGlzLnByb3BzLnBob3Rvc31cbiAgICAgICAgICAgICAgICAgICAgaXNPcGVuPXt0aGlzLnN0YXRlLmxpZ2h0Ym94SXNPcGVufVxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlPXt0aGlzLmNsb3NlTGlnaHRib3h9XG5cdFx0ICAgIG9uQ2xpY2tQcmV2PXt0aGlzLmdvdG9QcmV2aW91c31cblx0XHQgICAgb25DbGlja05leHQ9e3RoaXMuZ290b05leHR9XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPXsxNjAwfVxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9ezE2MDB9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcz17dGhpcy5wcm9wcy5saWdodGJveFN0eWxlc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG4vLyBHYWxsZXJ5IGltYWdlIHN0eWxlXG5jb25zdCBzdHlsZSA9IHtcbiAgIGRpc3BsYXk6ICdibG9jaycsXG4gICBtYXJnaW46IDIsXG4gICBiYWNrZ3JvdW5kQ29sb3I6JyNlM2UzZTMnLFxuICAgZmxvYXQ6ICdsZWZ0J1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbGxlcnk7XG4iXX0=
